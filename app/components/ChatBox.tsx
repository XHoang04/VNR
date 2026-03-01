"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBoxProps {
  open: boolean;
  onToggle: () => void;
}

export default function ChatBox({ open, onToggle }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào! 👋 Tôi là trợ lý AI về Lịch sử Đảng Việt Nam giai đoạn 1986–1991. Bạn có thể hỏi tôi về:\n• Đại hội Đảng lần VI (1986)\n• Chính sách Đổi Mới\n• Khoán 10\n• Luật Đầu tư nước ngoài\n• Đại hội Đảng lần VII (1991)"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg pulse-red"
        style={{ background: "linear-gradient(135deg, #C0392B, #922B21)", color: "white", border: "3px solid #F39C12" }}
        title="Hỏi đáp AI"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden"
          style={{ border: "2px solid #C0392B", maxHeight: "500px", display: "flex", flexDirection: "column" }}
        >
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #922B21, #C0392B)", padding: "0.75rem 1rem" }} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F39C12", fontSize: "1rem" }}>🤖</div>
            <div>
              <div style={{ color: "#FEF9E7", fontWeight: 700, fontSize: "0.9rem" }}>Trợ Lý Lịch Sử</div>
              <div style={{ color: "#fde8e8", fontSize: "0.7rem" }}>Đảng CSVN 1986–1991</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full" style={{ background: "#27AE60" }} title="Online" />
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", background: "#FEF9E7", minHeight: "300px", maxHeight: "340px" }} className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}
                  style={{ maxWidth: "80%", padding: "0.6rem 0.9rem", fontSize: "0.85rem", lineHeight: 1.5, whiteSpace: "pre-wrap" }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-bubble-bot" style={{ padding: "0.6rem 0.9rem" }}>
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "0.75rem", background: "white", borderTop: "1px solid #e8d5a3" }} className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Hỏi về lịch sử Đảng..."
              style={{ flex: 1, border: "2px solid #e8d5a3", borderRadius: "20px", padding: "0.5rem 0.85rem", fontSize: "0.85rem", outline: "none", background: "#FEF9E7" }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ background: "#C0392B", color: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", fontSize: "1rem", cursor: "pointer", flexShrink: 0 }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
