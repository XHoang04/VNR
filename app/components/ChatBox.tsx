"use client";
import { useState, useRef, useEffect } from "react";

interface Msg { role: "user" | "assistant"; content: string; }

// Icon chatbot SVG
function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.836 1.37 5.366 3.52 7.04L4.5 22l4.388-2.04A10.6 10.6 0 0 0 12 20.486c5.523 0 10-4.145 10-9.243S17.523 2 12 2Z" fill="white" opacity="0.95"/>
      <circle cx="8.5" cy="11.5" r="1.2" fill="#B5261E"/>
      <circle cx="12" cy="11.5" r="1.2" fill="#B5261E"/>
      <circle cx="15.5" cy="11.5" r="1.2" fill="#B5261E"/>
    </svg>
  );
}

export default function ChatBox({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: "assistant",
    content: "Xin chào! Tôi là trợ lý AI về Lịch sử Đảng.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setMsgs(p => [...p, { role: "user", content: text }]);
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, { role: "user", content: text }] }),
      });
      const d = await r.json();
      setMsgs(p => [...p, { role: "assistant", content: d.content }]);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Có lỗi xảy ra. Vui lòng thử lại." }]);
    }
    setLoading(false);
  };

  const F = { fontFamily: "'Be Vietnam Pro', sans-serif" };

  return (
    <>
      {/* Nút mở — icon chatbot, có hiệu ứng pulse khi đóng */}
      <button onClick={onToggle} style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 50,
        width: 56, height: 56, borderRadius: "50%",
        background: open ? "#3A2A18" : "#B5261E",
        border: "none", cursor: "pointer",
        boxShadow: open ? "0 4px 16px rgba(0,0,0,0.3)" : "0 6px 24px rgba(181,38,30,0.5)",
        transition: "background 0.25s, transform 0.2s, box-shadow 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: open ? "none" : "chatPulse 2.5s ease-in-out infinite",
      }}>
        {open
          ? <svg width="18" height="18" viewBox="0 0 14 14" fill="white"><path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          : <ChatIcon />
        }
      </button>

      <style>{`
        @keyframes chatPulse {
          0%,100% { box-shadow: 0 6px 24px rgba(181,38,30,0.5); transform: scale(1); }
          50%      { box-shadow: 0 6px 32px rgba(181,38,30,0.75); transform: scale(1.05); }
        }
      `}</style>

      {open && (
        <div style={{
          position: "fixed", bottom: 92, right: 24, zIndex: 50,
          width: 340, maxWidth: "calc(100vw - 48px)",
          borderRadius: 14, overflow: "hidden",
          boxShadow: "0 16px 56px rgba(0,0,0,0.28)",
          display: "flex", flexDirection: "column",
          border: "1px solid #ddd5be",
          animation: "slideUp 0.25s cubic-bezier(.34,1.56,.64,1)",
        }}>
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{ background: "linear-gradient(to right, #6B1410, #B5261E)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ChatIcon />
            </div>
            <div>
              <div style={{ ...F, fontWeight: 700, fontSize: "0.92rem", color: "white" }}>Trợ Lý Lịch Sử</div>

            </div>
            {/* Chấm online */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", animation: "pulse-dot 1.5s infinite" }} />
              <span style={{ ...F, fontSize: "0.68rem", color: "rgba(255,255,255,0.55)" }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: 14,
            background: "#F8F1E0", maxHeight: 320, minHeight: 240,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div className={m.role === "user" ? "bbl-u" : "bbl-b"} style={F}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex" }}>
                <div className="bbl-b typing-dot"><span /><span /><span /></div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px", background: "white", borderTop: "1px solid #ddd5be", display: "flex", gap: 8 }}>
            <input value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Nhập câu hỏi..."
              disabled={loading}
              style={{ ...F, flex: 1, border: "1.5px solid #ddd5be", borderRadius: 6, padding: "8px 12px", fontSize: "0.88rem", outline: "none", background: "#F8F1E0", color: "#1C1008" }}
            />
            <button onClick={send} disabled={loading || !input.trim()} style={{
              width: 36, height: 36, borderRadius: 6, border: "none",
              background: !input.trim() || loading ? "#e0d8cc" : "#B5261E",
              color: "white", cursor: !input.trim() || loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              transition: "background 0.2s",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
