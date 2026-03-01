"use client";
import { useState, useEffect } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Simulate visitor count with localStorage
    try {
      const stored = localStorage.getItem("visitorCount");
      const base = stored ? parseInt(stored) : 1247 + Math.floor(Math.random() * 200);
      // Increment on new session
      const sessionKey = "hasVisited_" + new Date().toDateString();
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, "1");
        const newCount = base + 1;
        localStorage.setItem("visitorCount", String(newCount));
        setCount(newCount);
      } else {
        setCount(base);
      }
    } catch {
      setCount(1350);
    }
  }, []);

  if (count === null) return null;

  const digits = String(count).padStart(5, "0").split("");

  return (
    <div className="flex items-center gap-2">
      <span style={{ color: "#F39C12", fontSize: "0.7rem", fontWeight: 600 }}>👥 Lượt xem:</span>
      <div className="flex gap-0.5">
        {digits.map((d, i) => (
          <span key={i} className="counter-digit">{d}</span>
        ))}
      </div>
    </div>
  );
}
