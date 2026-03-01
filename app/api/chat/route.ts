import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

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
- Nếu câu hỏi ngoài phạm vi, giải thích lịch hệ thì nhẹ nhàng hướng về chủ đề chính
- Câu trả lời vừa phải, khoảng 150-300 từ, trừ khi cần thiết hơn`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau." }, { status: 500 });
  }
}
