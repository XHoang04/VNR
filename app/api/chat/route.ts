import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên về Lịch sử Đảng Cộng sản Việt Nam giai đoạn 1986–1991 (thời kỳ Đổi Mới).

Nhiệm vụ của bạn là giải đáp các câu hỏi về:
- Đại hội Đảng lần VI (12/1986) - khởi xướng Đổi Mới
- Đường lối Đổi Mới toàn diện của Đảng
- Chính sách kinh tế: Khoán 10, Luật Đầu tư nước ngoài 1987, xóa bỏ bao cấp
- Chính sách đối ngoại: rút quân khỏi Campuchia, bình thường hóa quan hệ
- Đổi mới chính trị, dân chủ hóa, đổi mới phong cách lãnh đạo
- Đại hội Đảng lần VII (6/1991) - Cương lĩnh xây dựng đất nước
- Kết quả, thành tựu và hạn chế của giai đoạn Đổi Mới đầu tiên
- Bối cảnh quốc tế: sự sụp đổ của Liên Xô và Đông Âu

Quy tắc trả lời:
- Trả lời bằng tiếng Việt, rõ ràng, học thuật nhưng dễ hiểu
- Dựa trên giáo trình Lịch sử Đảng Cộng sản Việt Nam chính thống
- Giải thích ý nghĩa lịch sử, không chỉ liệt kê sự kiện
- Câu trả lời vừa phải, khoảng 150-300 từ`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { content: "Lỗi: Chưa cấu hình GEMINI_API_KEY trên Vercel." },
        { status: 500 }
      );
    }

    // Chuyển đổi messages sang định dạng Gemini
    // Ghép system prompt vào tin nhắn đầu tiên của user
    const geminiContents = messages.map(
      (m: { role: string; content: string }, idx: number) => {
        let text = m.content;
        // Đính kèm system prompt vào tin nhắn user đầu tiên
        if (idx === 0 && m.role === "user") {
          text = `${SYSTEM_PROMPT}\n\n---\n\n${m.content}`;
        }
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text }],
        };
      }
    );

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      const errMsg = errData?.error?.message || res.statusText;
      console.error("Gemini API error:", errMsg);
      return NextResponse.json(
        { content: `Lỗi Gemini API: ${errMsg}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const content =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Xin lỗi, không nhận được phản hồi từ AI.";

    return NextResponse.json({ content });

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Chat route error:", errMsg);
    return NextResponse.json(
      { content: `Lỗi server: ${errMsg}` },
      { status: 500 }
    );
  }
}
