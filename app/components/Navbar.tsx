"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import VisitorCounter from "./VisitorCounter";

interface BirdFlight {
  id: string;
  from: number;
  to: number;
  topPercent: number;
  sizePx: number;
  durationMs: number;
  flip: boolean;
  fly: boolean;
}

const LINKS = [
  { href: "/",         label: "Trang Chủ" },
  { href: "/noi-dung", label: "Nội Dung"  },
  { href: "/tro-choi", label: "Trò Chơi"  },
  { href: "/hoi-dap",  label: "Hỏi Đáp"   },
];

export default function Navbar() {
  const path = usePathname();
  const [birds, setBirds] = useState<BirdFlight[]>([]);

  useEffect(() => {
    let disposed = false;
    const timers: number[] = [];

    const spawnBird = () => {
      const leftToRight = Math.random() > 0.5;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const durationMs = 9000 + Math.random() * 7000; // ← tăng từ 4200–8000 lên 9000–16000

      const bird: BirdFlight = {
        id,
        from: leftToRight ? -12 : 112,
        to: leftToRight ? 112 : -12,
        topPercent: 12 + Math.random() * 70,
        sizePx: 22 + Math.random() * 14,
        durationMs,
        flip: !leftToRight,
        fly: false,
      };

      setBirds((prev) => [...prev, bird]);

      const launchTimer = window.setTimeout(() => {
        setBirds((prev) => prev.map((b) => (b.id === id ? { ...b, fly: true } : b)));
      }, 30);
      timers.push(launchTimer);

      const removeTimer = window.setTimeout(() => {
        setBirds((prev) => prev.filter((b) => b.id !== id));
      }, durationMs + 400);
      timers.push(removeTimer);
    };

    const scheduleNext = () => {
      if (disposed) return;

      const waitMs = 4000 + Math.random() * 8000; // ← tăng từ 1800–7000 lên 4000–12000
      const nextTimer = window.setTimeout(() => {
        spawnBird();
        scheduleNext();
      }, waitMs);
      timers.push(nextTimer);
    };

    scheduleNext();

    return () => {
      disposed = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile  { display: none; }
        .nav-logo-link { display: flex; align-items: center; gap: 10px; }
        .nav-logo-gif {
          width: 34px;
          height: 34px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .nav-bird {
          position: absolute;
          will-change: left, transform;
          pointer-events: none;
          user-select: none;
          opacity: 0.9;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25));
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .nav-mobile  { display: flex; }
          .nav-logo-link { gap: 8px; }
          .nav-logo-gif { width: 28px; height: 28px; }
        }
      `}</style>

      <nav style={{
        background: "linear-gradient(to right, #6B1410 0%, #9B2119 40%, #B5261E 100%)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
        position: "sticky", top: 0, zIndex: 100,
        overflow: "hidden",
        borderBottom: "1px solid rgba(212,152,42,0.25)",
      }}>
        {/* Desktop row */}
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 32px",
          height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" className="nav-logo-link" style={{ textDecoration: "none", flexShrink: 0 }}>
            <img
              src="/hammer_sickle_transparent_spin.gif"
              alt=""
              aria-hidden="true"
              className="nav-logo-gif"
            />
            <div>
              <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: "1.25rem", color: "#D4982A", letterSpacing: "0.04em", lineHeight: 1 }}>
                LỊCH SỬ ĐẢNG
              </div>
              <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 400, fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em" }}>
                1986 – 1991 · ĐỔI MỚI
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ gap: 40, alignItems: "center" }}>
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className={`nav-lnk${path === l.href ? " on" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Counter */}
          <VisitorCounter />
        </div>

        {/* Mobile row */}
        <div className="nav-mobile" style={{
          gap: 6, padding: "0 16px 10px", overflowX: "auto",
        }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{
              whiteSpace: "nowrap", padding: "5px 16px", borderRadius: 20,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "0.83rem", fontWeight: 600, textDecoration: "none",
              background: path === l.href ? "#D4982A" : "rgba(255,255,255,0.1)",
              color: path === l.href ? "#6B1410" : "rgba(255,255,255,0.85)",
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
          {birds.map((bird) => (
            <img
              key={bird.id}
              src="/bird_flap_transparent.gif"
              alt=""
              className="nav-bird"
              style={{
                width: bird.sizePx,
                top: `${bird.topPercent}%`,
                left: `${bird.fly ? bird.to : bird.from}%`,
                transition: `left ${bird.durationMs}ms linear`,
                transform: `translate(-50%, -50%)${bird.flip ? " scaleX(-1)" : ""}`,
              }}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
