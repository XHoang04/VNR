"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VisitorCounter from "./VisitorCounter";

const NAV_LINKS = [
  { href: "/", label: "🏠 Trang Chủ" },
  { href: "/noi-dung", label: "📖 Nội Dung" },
  { href: "/tro-choi", label: "🎮 Trò Chơi" },
  { href: "/hoi-dap", label: "❓ Hỏi Đáp" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav style={{ background: "linear-gradient(135deg, #922B21 0%, #C0392B 50%, #E74C3C 100%)", boxShadow: "0 4px 20px rgba(192,57,43,0.4)" }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "#F39C12" }}>⭐</div>
          <div>
            <div style={{ color: "#F39C12", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1rem", lineHeight: 1.1 }}>LỊCH SỬ ĐẢNG</div>
            <div style={{ color: "#fde8e8", fontSize: "0.7rem", letterSpacing: "0.05em" }}>1986 – 1991 • ĐỔI MỚI</div>
          </div>
        </Link>
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="nav-link text-sm font-semibold" style={{ color: pathname === l.href ? "#F39C12" : "#FEF9E7" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <VisitorCounter />
      </div>
      <div className="md:hidden flex gap-2 px-4 pb-2 overflow-x-auto">
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href} className="text-xs whitespace-nowrap px-3 py-1 rounded-full" style={{ background: pathname === l.href ? "#F39C12" : "rgba(255,255,255,0.15)", color: pathname === l.href ? "#922B21" : "#FEF9E7", fontWeight: pathname === l.href ? 700 : 400 }}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
