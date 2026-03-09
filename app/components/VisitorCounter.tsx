"use client";
import { useState, useEffect, useRef } from "react";

function getSessionId() {
  let id = sessionStorage.getItem("_sid");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("_sid", id);
  }
  return id;
}

export default function VisitorCounter() {
  const [online, setOnline] = useState<number | null>(null);
  const ref = useRef<NodeJS.Timeout | null>(null);

  const beat = async () => {
    try {
      const r = await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: getSessionId() }),
      });
      const d = await r.json();
      setOnline(d.online);
    } catch { /* silent */ }
  };

  useEffect(() => {
    beat();
    ref.current = setInterval(beat, 30000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
      <span style={{ position: "relative", display: "inline-flex", width: 9, height: 9 }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "#4ADE80", opacity: 0.5,
          animation: "pulse-dot 1.5s ease-in-out infinite",
        }} />
        <span style={{
          position: "relative", width: 9, height: 9,
          borderRadius: "50%", background: "#4ADE80", display: "block",
        }} />
      </span>
      <span style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontWeight: 500, fontSize: "0.82rem",
        color: "rgba(255,255,255,0.8)",
        whiteSpace: "nowrap",
      }}>
        {online === null
          ? "..."
          : <><b style={{ color: "#4ADE80", fontWeight: 800 }}>{online}</b> đang xem</>
        }
      </span>
    </div>
  );
}
