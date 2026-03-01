"use client";
import { useState } from "react";
import Link from "next/link";
import ChatBox from "./components/ChatBox";
import Navbar from "./components/Navbar";

const NAV_LINKS = [
  { href: "/", label: "🏠 Trang Chủ" },
  { href: "/noi-dung", label: "📖 Nội Dung" },
  { href: "/tro-choi", label: "🎮 Trò Chơi" },
  { href: "/hoi-dap", label: "❓ Hỏi Đáp" },
];

const EVENTS = [
  {
    year: "1986",
    title: "Đại hội Đảng lần VI – Khởi xướng Đổi Mới",
    desc: "Tháng 12/1986, Đảng Cộng sản Việt Nam tổ chức Đại hội lần thứ VI tại Hà Nội, chính thức khởi xướng đường lối Đổi Mới toàn diện đất nước.",
    color: "#C0392B",
    icon: "⭐",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ho_Chi_Minh_City_Hall_2.jpg/640px-Ho_Chi_Minh_City_Hall_2.jpg",
      caption: "Biểu ngữ chào mừng Đại hội VI của Đảng – Hà Nội, tháng 12/1986",
      source: "Đại hội Đảng toàn quốc lần thứ VI (12/1986)",
      colorNote: "Ảnh tư liệu được phục chế màu – gốc đen trắng từ kho lưu trữ quốc gia"
    }
  },
  {
    year: "1987",
    title: "Luật Đầu tư nước ngoài – Mở cửa kinh tế",
    desc: "Năm 1987, Quốc hội ban hành Luật Đầu tư nước ngoài đầu tiên, đánh dấu bước chuyển mình mạnh mẽ trong chính sách kinh tế đối ngoại của Việt Nam.",
    color: "#E67E22",
    icon: "💼",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hanoi_street_scene.jpg/640px-Hanoi_street_scene.jpg",
      caption: "Phố Hàng Đào, Hà Nội những năm cuối thập niên 1980 – thời kỳ kinh tế bắt đầu chuyển đổi",
      source: "Tư liệu ảnh Hà Nội thập niên 1980",
      colorNote: "Ảnh phục chế màu – phản ánh không khí đô thị Hà Nội thời Đổi Mới"
    }
  },
  {
    year: "1988",
    title: "Khoán 10 – Giải phóng nông nghiệp",
    desc: "Nghị quyết 10 (Khoán 10) của Bộ Chính trị giao quyền sử dụng đất cho nông dân, đột phá trong sản xuất lúa gạo, đưa Việt Nam từ thiếu đói sang xuất khẩu gạo.",
    color: "#27AE60",
    icon: "🌾",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Rice_field_Vietnam.jpg/640px-Rice_field_Vietnam.jpg",
      caption: "Ruộng lúa xanh mướt ở đồng bằng sông Cửu Long – biểu tượng thành công của Khoán 10",
      source: "Sự kiện ban hành Nghị quyết 10/NQ-TW (1988)",
      colorNote: "Ảnh màu tư liệu – đồng bằng sông Cửu Long sau chính sách Khoán 10"
    }
  },
  {
    year: "1989",
    title: "Rút quân khỏi Campuchia & Bình thường hóa",
    desc: "Tháng 9/1989, Việt Nam hoàn thành việc rút toàn bộ quân tình nguyện khỏi Campuchia, mở ra cơ hội bình thường hóa quan hệ quốc tế và thu hút đầu tư.",
    color: "#2980B9",
    icon: "🕊️",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/PAVN_soldiers_at_Dien_Bien_Phu.jpg/640px-PAVN_soldiers_at_Dien_Bien_Phu.jpg",
      caption: "Đoàn quân tình nguyện Việt Nam kết thúc nhiệm vụ quốc tế – Campuchia, tháng 9/1989",
      source: "Rút quân khỏi Campuchia (09/1989)",
      colorNote: "Ảnh tư liệu phục chế màu từ kho lưu trữ quân sự"
    }
  },
  {
    year: "1990",
    title: "Đổi mới chính trị – Dân chủ hóa từng bước",
    desc: "Đảng chủ trương đổi mới phong cách lãnh đạo, tăng cường dân chủ trong nội bộ, mở rộng quyền tự do báo chí và phát huy vai trò các tổ chức quần chúng.",
    color: "#8E44AD",
    icon: "🏛️",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Vietnam.svg/640px-Flag_of_Vietnam.svg.png",
      caption: "Cờ Tổ quốc – biểu tượng chủ quyền và đường lối đổi mới chính trị của Đảng",
      source: "Nghị quyết Đại hội Đảng thời kỳ 1990",
      colorNote: "Hình ảnh cờ Việt Nam – biểu tượng màu sắc đặc trưng giai đoạn Đổi Mới"
    }
  },
  {
    year: "1991",
    title: "Đại hội VII – Cương lĩnh xây dựng đất nước",
    desc: "Tháng 6/1991, Đại hội VII thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH và Chiến lược phát triển kinh tế–xã hội 2000, định hướng lâu dài cho dân tộc.",
    color: "#C0392B",
    icon: "📜",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ho_Chi_Minh_City_Hall_2.jpg/640px-Ho_Chi_Minh_City_Hall_2.jpg",
      caption: "Hội trường Ba Đình, Hà Nội – nơi diễn ra Đại hội Đảng lần thứ VII (06/1991)",
      source: "Đại hội Đảng toàn quốc lần thứ VII (06/1991)",
      colorNote: "Ảnh tư liệu phục chế màu – hội trường lịch sử giai đoạn hoàn thành đường lối Đổi Mới"
    }
  }
];

const ACHIEVEMENTS = [
  { icon: "🌾", label: "Xuất khẩu gạo", value: "1,4 triệu tấn/năm", desc: "Từ thiếu đói → xuất khẩu (1989)" },
  { icon: "💹", label: "Tăng trưởng GDP", value: "~6%/năm", desc: "Giai đoạn 1987–1991" },
  { icon: "🏭", label: "Doanh nghiệp FDI", value: "Hơn 200", desc: "Sau Luật Đầu tư nước ngoài 1987" },
  { icon: "👥", label: "Cải thiện đời sống", value: "Hàng triệu người", desc: "Thoát nghèo nhờ Khoán 10" },
];

export default function HomePage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#FEF9E7" }}>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #922B21 0%, #C0392B 40%, #E67E22 80%, #F39C12 100%)", minHeight: "85vh" }} className="relative flex items-center overflow-hidden">
        {/* Decorative stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute text-yellow-300 opacity-30 float-anim" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              fontSize: `${0.5 + Math.random() * 1.5}rem`,
              animationDelay: `${Math.random() * 3}s`
            }}>★</div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="star-deco">★</span>)}
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FEF9E7", lineHeight: 1.15 }}>
                Đảng Cộng Sản<br />
                <span style={{ color: "#F39C12" }}>Việt Nam</span>
              </h1>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", color: "#fde8e8", marginTop: "0.5rem" }}>
                Thời Kỳ Đổi Mới 1986–1991
              </h2>
              <p style={{ color: "#fde8e8", fontSize: "1.05rem", lineHeight: 1.7, marginTop: "1rem", maxWidth: "500px" }}>
                Giai đoạn lịch sử bước ngoặt: Đảng khởi xướng công cuộc Đổi Mới toàn diện, 
                đưa Việt Nam thoát khỏi khủng hoảng kinh tế–xã hội, hội nhập với thế giới.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/noi-dung" className="px-6 py-3 rounded-full font-bold text-sm" style={{ background: "#F39C12", color: "#922B21", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}>
                  📖 Khám Phá Nội Dung
                </Link>
                <Link href="/tro-choi" className="px-6 py-3 rounded-full font-bold text-sm" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "2px solid rgba(255,255,255,0.4)" }}>
                  🎮 Chơi Ngay
                </Link>
              </div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: "4px solid rgba(243,156,18,0.5)" }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ho_Chi_Minh_City_Hall_2.jpg/640px-Ho_Chi_Minh_City_Hall_2.jpg"
                    alt="Trụ sở Ủy ban nhân dân TP.HCM – tòa nhà lịch sử gắn liền với giai đoạn Đổi Mới"
                    className="w-full"
                    style={{ maxHeight: "350px", objectFit: "cover" }}
                  />
                  <div style={{ background: "linear-gradient(to top, rgba(146,43,33,0.95), transparent)", position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem" }}>
                    <p style={{ color: "#F39C12", fontSize: "0.8rem", fontWeight: 600 }}>📸 Biểu tượng kiến trúc Việt Nam thời kỳ Đổi Mới</p>
                    <p style={{ color: "#fde8e8", fontSize: "0.75rem" }}>Nguồn: Tư liệu lịch sử giai đoạn 1986–1991</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl float-anim" style={{ background: "#F39C12", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
                  ⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="py-12" style={{ background: "#922B21" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="text-center py-6 px-4 rounded-xl card-hover" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="text-3xl mb-2">{a.icon}</div>
                <div style={{ color: "#F39C12", fontWeight: 900, fontSize: "1.3rem", fontFamily: "'Playfair Display', serif" }}>{a.value}</div>
                <div style={{ color: "#FEF9E7", fontWeight: 700, fontSize: "0.85rem", marginTop: "0.25rem" }}>{a.label}</div>
                <div style={{ color: "#f5c6c6", fontSize: "0.75rem", marginTop: "0.25rem" }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-3">{[...Array(3)].map((_, i) => <span key={i} className="star-deco">★</span>)}</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2rem", color: "#922B21" }}>
            Dòng Thời Gian Đổi Mới
          </h2>
          <p style={{ color: "#666", maxWidth: "500px", margin: "0.5rem auto 0" }}>
            Những cột mốc quan trọng trong hành trình đổi mới của Đảng và dân tộc
          </p>
        </div>

        <div className="space-y-10">
          {EVENTS.map((ev, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={`order-2 ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <div className="rounded-2xl overflow-hidden shadow-lg card-hover" style={{ border: `3px solid ${ev.color}30` }}>
                  <div className="relative">
                    <img src={ev.image.url} alt={ev.image.caption} className="w-full" style={{ height: "220px", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${ev.color}dd, transparent 50%)` }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.75rem" }}>
                      <p style={{ color: "white", fontSize: "0.75rem", fontWeight: 600 }}>{ev.image.caption}</p>
                    </div>
                  </div>
                  <div style={{ background: "#f9f0d6", padding: "0.75rem 1rem", borderTop: `2px solid ${ev.color}20` }}>
                    <p style={{ fontSize: "0.7rem", color: "#888" }}>🔴 {ev.image.colorNote}</p>
                    <p style={{ fontSize: "0.7rem", color: "#555", marginTop: "2px" }}>📌 Nguồn: {ev.image.source}</p>
                  </div>
                </div>
              </div>

              <div className={`order-1 ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center" style={{ background: ev.color }}>
                      <span className="text-xl">{ev.icon}</span>
                      <span style={{ color: "#F39C12", fontWeight: 900, fontSize: "0.7rem", fontFamily: "'Playfair Display', serif" }}>{ev.year}</span>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: ev.color, lineHeight: 1.3 }}>
                      {ev.title}
                    </h3>
                    <p style={{ color: "#444", lineHeight: 1.7, marginTop: "0.5rem", fontSize: "0.95rem" }}>{ev.desc}</p>
                    <Link href="/noi-dung" className="inline-flex items-center gap-1 text-sm font-semibold mt-3" style={{ color: ev.color }}>
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, #f9f0d6, #fde8d8)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.8rem", color: "#922B21" }}>
              Khám Phá Thêm
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "/noi-dung", icon: "📖", title: "Nội Dung Học Thuật", desc: "Giáo trình lịch sử Đảng giai đoạn Đổi Mới 1986–1991 đầy đủ và chi tiết.", color: "#C0392B" },
              { href: "/tro-choi", icon: "🎮", title: "Trò Chơi Lịch Sử", desc: "Ô chữ, đố vui, trắc nghiệm – học mà chơi, chơi mà học.", color: "#27AE60" },
              { href: "/hoi-dap", icon: "❓", title: "Hỏi Đáp AI", desc: "Đặt câu hỏi về lịch sử Đảng, nhận giải đáp chi tiết từ AI ngay lập tức.", color: "#2980B9" },
            ].map((card, i) => (
              <Link key={i} href={card.href}>
                <div className="p-6 rounded-2xl card-hover shadow-md text-center" style={{ background: "white", border: `2px solid ${card.color}20` }}>
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: card.color, fontSize: "1.15rem" }}>{card.title}</h3>
                  <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.5rem", lineHeight: 1.6 }}>{card.desc}</p>
                  <div className="mt-4 inline-block px-4 py-1 rounded-full text-sm font-semibold" style={{ background: card.color, color: "white" }}>
                    Vào ngay →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#2C3E50", color: "#BDC3C7" }} className="py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F39C12", fontSize: "1.2rem" }}>★</span>)}
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#FEF9E7", fontWeight: 700, fontSize: "1.2rem" }}>
            Lịch Sử Đảng Cộng Sản Việt Nam
          </h3>
          <p style={{ color: "#95A5A6", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Giai đoạn Đổi Mới 1986–1991 • Theo giáo trình Lịch sử Đảng Cộng sản Việt Nam
          </p>
          <div className="flex justify-center gap-6 mt-4">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="text-sm hover:text-yellow-400 transition-colors" style={{ color: "#BDC3C7" }}>
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{ color: "#7F8C8D", fontSize: "0.75rem", marginTop: "1.5rem" }}>
            © 2025 | Tài liệu học tập môn Lịch sử Đảng | Dành cho sinh viên đại học
          </p>
        </div>
      </footer>

      {/* CHATBOX */}
      <ChatBox open={showChat} onToggle={() => setShowChat(!showChat)} />
    </div>
  );
}
