"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const SUGGESTED_QUESTIONS = [
  "Đổi Mới năm 1986 là gì và tại sao quan trọng?",
  "Khoán 10 đã thay đổi nông nghiệp Việt Nam như thế nào?",
  "Đại hội VI có những quyết sách gì về kinh tế?",
  "Việt Nam mở cửa thị trường như thế nào từ 1986?",
  "Đại hội VII thông qua Cương lĩnh gì năm 1991?",
  "Tại sao Việt Nam rút quân khỏi Campuchia năm 1989?",
  "Lạm phát và khủng hoảng kinh tế trước Đổi Mới ra sao?",
  "Đổi Mới chính trị dưới thời kỳ 1986-1991 có gì?",
];

export default function HoiDapPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào! 👋 Tôi là trợ lý AI chuyên về Lịch sử Đảng Cộng sản Việt Nam giai đoạn Đổi Mới 1986–1991.\n\nBạn có thể hỏi tôi bất kỳ câu hỏi nào về:\n• Đường lối và chính sách Đổi Mới\n• Các Đại hội Đảng (VI & VII)\n• Chính sách kinh tế: Khoán 10, FDI, xóa bao cấp\n• Đối ngoại: rút quân Campuchia, bình thường hóa quan hệ\n• Kết quả, thành tựu và ý nghĩa lịch sử\n\nHãy đặt câu hỏi để bắt đầu! 📚",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg, timestamp: new Date() }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content, timestamp: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Xin lỗi, có lỗi kết nối. Vui lòng thử lại!", timestamp: new Date() }]);
    }
    setLoading(false);
  };

  const formatTime = (d?: Date) => d ? d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FEF9E7" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a3c6b, #2980B9, #3498DB)", padding: "2rem 0" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 mb-2">{[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F39C12", fontSize: "1.1rem" }}>★</span>)}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2rem", color: "#FEF9E7" }}>
            Hỏi Đáp AI Lịch Sử
          </h1>
          <p style={{ color: "#b8d9f5", fontSize: "0.95rem", marginTop: "0.4rem" }}>
            Đặt câu hỏi về Lịch sử Đảng 1986–1991 – nhận giải đáp chi tiết ngay
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar suggestions */}
        <div className="md:w-64 flex-shrink-0">
          <div className="rounded-2xl shadow-md p-4" style={{ background: "white", border: "1px solid #e8d5a3", position: "sticky", top: "120px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2980B9", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
              💡 Gợi ý câu hỏi
            </h3>
            <div className="space-y-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  className="text-left w-full text-xs p-2 rounded-lg transition-all"
                  style={{ background: "#f0f7ff", color: "#2980B9", border: "1px solid #d6e9fa", lineHeight: 1.4 }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="rounded-2xl shadow-md flex-1 flex flex-col overflow-hidden" style={{ background: "white", border: "1px solid #e8d5a3" }}>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", minHeight: "400px", maxHeight: "520px" }} className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: "#2980B9", color: "white" }}>🤖</div>
                  )}
                  <div>
                    <div
                      className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}
                      style={{ padding: "0.75rem 1rem", fontSize: "0.9rem", lineHeight: 1.65, whiteSpace: "pre-wrap", maxWidth: "440px" }}
                    >
                      {m.content}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "3px", textAlign: m.role === "user" ? "right" : "left" }}>
                      {formatTime(m.timestamp)}
                    </div>
                  </div>
                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: "#C0392B", color: "white" }}>👤</div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "#2980B9", color: "white" }}>🤖</div>
                  <div className="chat-bubble-bot" style={{ padding: "0.75rem 1rem" }}>
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "1rem", borderTop: "1px solid #e8d5a3", background: "#fafafa" }}>
              <div className="flex gap-3 items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Đặt câu hỏi về lịch sử Đảng 1986–1991... (Enter để gửi)"
                  rows={2}
                  disabled={loading}
                  style={{ flex: 1, border: "2px solid #e8d5a3", borderRadius: "12px", padding: "0.65rem 1rem", fontSize: "0.9rem", outline: "none", resize: "none", background: "#FEF9E7", lineHeight: 1.5 }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  style={{ background: loading ? "#ccc" : "#2980B9", color: "white", border: "none", borderRadius: "12px", padding: "0.65rem 1.25rem", fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", height: "64px", flexShrink: 0, fontWeight: 700 }}
                >
                  ➤
                </button>
              </div>
              <p style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "6px" }}>
                💬 Powered by Claude AI • Nội dung dựa trên giáo trình Lịch sử Đảng CSVN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
