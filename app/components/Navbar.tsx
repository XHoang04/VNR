"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VisitorCounter from "./VisitorCounter";

const LINKS = [
  { href: "/",         label: "Trang Chủ" },
  { href: "/noi-dung", label: "Nội Dung"  },
  { href: "/tro-choi", label: "Trò Chơi"  },
  { href: "/hoi-dap",  label: "Hỏi Đáp"   },
];

export default function Navbar() {
  const path = usePathname();
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
      </nav>
    </>
  );
}
