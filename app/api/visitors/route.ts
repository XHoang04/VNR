import { NextResponse } from "next/server";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command: unknown[]) {
  const res = await fetch(`${UPSTASH_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = await res.json();
  return data.result;
}

// POST: cập nhật heartbeat cho 1 user (sessionId)
// Mỗi user lưu 1 key riêng, TTL = 60 giây
// Sau 60 giây không heartbeat → key tự xóa → không tính là online nữa
export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ online: 0 });

    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
      return NextResponse.json({ online: 1 });
    }

    const key = `online:${sessionId}`;

    // SET key = 1, tự hết hạn sau 60 giây
    await redis(["SET", key, "1", "EX", "60"]);

    // Đếm tất cả key đang tồn tại có prefix "online:"
    const keys: string[] = await redis(["KEYS", "online:*"]);
    const online = keys ? keys.length : 1;

    return NextResponse.json({ online });
  } catch {
    return NextResponse.json({ online: 1 });
  }
}

// GET: chỉ lấy số người online hiện tại
export async function GET() {
  try {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
      return NextResponse.json({ online: 1 });
    }
    const keys: string[] = await redis(["KEYS", "online:*"]);
    const online = keys ? keys.length : 0;
    return NextResponse.json({ online });
  } catch {
    return NextResponse.json({ online: 0 });
  }
}
