"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

const SECTIONS = [
  {
    id: "boi-canh", color: "#1A4A7A",
    title: "Bối Cảnh Lịch Sử Trước Đổi Mới",
    content: `Trước năm 1986, Việt Nam lâm vào khủng hoảng kinh tế – xã hội nghiêm trọng. Nền kinh tế kế hoạch hóa tập trung, bao cấp bộc lộ nhiều yếu kém căn bản: sản xuất đình đốn, hàng hóa khan hiếm, lạm phát phi mã lên tới hàng trăm phần trăm mỗi năm. Đời sống nhân dân hết sức khó khăn, thiếu thốn.

Trên thế giới, làn sóng cải cách đang lan rộng. Liên Xô bắt đầu chính sách Glasnost và Perestroika từ 1985. Trung Quốc đã tiến hành cải cách kinh tế từ năm 1978 và gặt hái kết quả đáng kể.

Trong nước, nhiều địa phương và cơ sở đã tự phát "phá rào" trong sản xuất và phân phối để đáp ứng nhu cầu thực tế. Những thực tiễn sáng tạo này tạo cơ sở thực tiễn cho Đảng tổng kết và đề ra đường lối Đổi Mới.`,
    image: "/pictures/pic1.png",
    caption: "Phố phường Hà Nội những năm 1980 — thời kỳ kinh tế bao cấp khó khăn",
    source: "Tư liệu ảnh Hà Nội thập niên 1980 — ảnh phục chế màu từ tư liệu đen trắng"
  },
  {
    id: "dai-hoi-vi", color: "#A93226",
    title: "Đại Hội Đảng Lần VI (12/1986) — Khởi Xướng Đổi Mới",
    content: `Tháng 12/1986, Đại hội đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam được tổ chức tại Hà Nội. Đây là đại hội lịch sử, đánh dấu bước ngoặt căn bản trong sự nghiệp cách mạng Việt Nam.

Đại hội VI đề ra đường lối Đổi Mới với ba nội dung cốt lõi:
— Đổi mới tư duy, nhất là tư duy kinh tế: từ bỏ tư duy chủ quan, duy ý chí, nhìn thẳng vào sự thật
— Xây dựng nền kinh tế hàng hóa nhiều thành phần, vận hành theo cơ chế thị trường có quản lý của Nhà nước
— Mở cửa hội nhập quốc tế

Đại hội nhấn mạnh nguyên tắc "nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật" — một tinh thần dân chủ trong sinh hoạt Đảng. Nghị quyết Đại hội VI xác định ba chương trình kinh tế lớn: lương thực – thực phẩm, hàng tiêu dùng, hàng xuất khẩu.`,
    image: "/pictures/pic2.png",
    caption: "Hội trường lịch sử — nơi diễn ra Đại hội Đảng lần VI, tháng 12/1986 tại Hà Nội",
    source: "Đại hội Đảng lần thứ VI (12/1986) — ảnh tư liệu phục chế màu"
  },
  {
    id: "kinh-te", color: "#1E6B38",
    title: "Đổi Mới Kinh Tế — Từ Bao Cấp Đến Thị Trường",
    content: `Sau Đại hội VI, các chính sách kinh tế đổi mới được triển khai mạnh mẽ trên nhiều lĩnh vực.

Khoán 10 (1988): Nghị quyết 10 của Bộ Chính trị (tháng 4/1988) giao quyền sử dụng đất lâu dài cho hộ nông dân, thay thế mô hình hợp tác xã bao cấp. Kết quả: sản lượng lúa tăng vọt, Việt Nam từ nước thiếu lương thực trở thành nước xuất khẩu gạo đứng thứ ba thế giới vào năm 1989.

Luật Đầu tư nước ngoài (1987): Quốc hội ban hành Luật Đầu tư nước ngoài đầu tiên, mở cửa thu hút vốn FDI, công nghệ và kỹ năng quản lý.

Xóa bỏ bao cấp (1989): Nghị quyết 306/HĐBT xóa bỏ cơ chế hai giá, thống nhất hệ thống giá cả theo thị trường. Cải cách hệ thống ngân hàng, tách ngân hàng trung ương khỏi ngân hàng thương mại.

Phát triển kinh tế tư nhân: Thừa nhận và khuyến khích kinh tế tư nhân, kinh tế hỗn hợp phát triển song song với kinh tế nhà nước.`,
    image: "/pictures/pic3.png",
    caption: "Đồng lúa đồng bằng sông Cửu Long — thành quả của chính sách Khoán 10",
    source: "Nghị quyết 10/NQ-TW về đổi mới quản lý nông nghiệp (1988)"
  },
  {
    id: "doi-ngoai", color: "#5B2C6F",
    title: "Đổi Mới Đối Ngoại — Hội Nhập Quốc Tế",
    content: `Cùng với đổi mới kinh tế, Đảng chủ trương đổi mới toàn diện đường lối đối ngoại theo hướng mở cửa, đa phương hóa, đa dạng hóa.

Rút quân khỏi Campuchia (1989): Tháng 9/1989, Việt Nam hoàn thành việc rút toàn bộ 50.000 quân tình nguyện khỏi Campuchia. Đây là điều kiện tiên quyết để bình thường hóa quan hệ với các nước ASEAN và phương Tây.

Bình thường hóa quan hệ: Việt Nam từng bước cải thiện quan hệ với Trung Quốc, các nước ASEAN và bắt đầu quá trình bình thường hóa với Hoa Kỳ.

Chính sách đối ngoại mới: Đường lối "Việt Nam muốn làm bạn với tất cả các nước" được chính thức hóa tại Đại hội VII (1991). Việt Nam xin gia nhập ASEAN (chính thức kết nạp năm 1995).

Bối cảnh quốc tế: Sự sụp đổ của bức tường Berlin (11/1989) và hệ thống xã hội chủ nghĩa Đông Âu buộc Đảng phải suy nghĩ sâu sắc hơn về con đường phát triển.`,
    image: "/pictures/pic4.jpg",
    caption: "Quân đội nhân dân Việt Nam — hoàn thành nghĩa vụ quốc tế ở Campuchia (1989)",
    source: "Rút quân tình nguyện Việt Nam khỏi Campuchia (09/1989) — ảnh phục chế màu"
  },
  {
    id: "dai-hoi-vii", color: "#A93226",
    title: "Đại Hội VII (6/1991) — Hoàn Thiện Đường Lối",
    content: `Tháng 6/1991, Đại hội đại biểu toàn quốc lần thứ VII diễn ra trong bối cảnh đặc biệt: Liên Xô và Đông Âu đang sụp đổ, nhưng Việt Nam đã có 5 năm đổi mới với những kết quả ban đầu đáng khích lệ.

Cương lĩnh xây dựng đất nước: Đại hội VII thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (Cương lĩnh 1991) — văn kiện nền tảng xác định con đường đi lên của Việt Nam.

Chiến lược đến năm 2000: Đại hội thông qua Chiến lược phát triển kinh tế – xã hội đến năm 2000, đặt mục tiêu thoát khỏi nghèo nàn và lạc hậu.

Tiếp tục đổi mới: Khẳng định tiếp tục đường lối đổi mới, không dao động, không quay lại cơ chế cũ. Nhấn mạnh đổi mới đồng bộ cả kinh tế lẫn hệ thống chính trị.

Đại hội VII đánh dấu sự hoàn thiện bước đầu của đường lối Đổi Mới, tạo nền tảng vững chắc cho công cuộc xây dựng và phát triển đất nước trong giai đoạn tiếp theo.`,
    image: "/pictures/pic5.png",
    caption: "Hà Nội — biểu tượng của thể chế chính trị Việt Nam giai đoạn Đổi Mới",
    source: "Đại hội Đảng lần thứ VII (06/1991) - ảnh phục chế màu"
  }
];

export default function NoiDungPage() {
  const [chat, setChat] = useState(false);
  const [lightbox, setLightbox] = useState<{src:string; caption:string} | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6E3" }}>
      <Navbar />

      {/* Header */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(123,26,18,0.88), rgba(192,57,43,0.82))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 800, width: "100%", padding: "56px 24px 48px", textAlign: "center" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 600, fontSize: "0.72rem",
            color: "#F5C842", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: 14,
            borderBottom: "1px solid rgba(245,200,66,0.4)", paddingBottom: 6,
          }}>
            Giáo Trình Chính Thức
          </div>
          <h1 style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            color: "white", lineHeight: 1.2,
          }}>Nội Dung Học Thuật</h1>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginTop: 10,
          }}>
            Lịch sử Đảng Cộng sản Việt Nam giai đoạn Đổi Mới 1986–1991
          </p>
        </div>
      </div>

      {/* Quick nav */}
      <div style={{
        background: "white", borderBottom: "2px solid #e8d5a3",
        padding: "12px 0", position: "sticky", top: 64, zIndex: 40,
      }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto", padding: "0 24px",
          display: "flex", gap: 10, overflowX: "auto",
        }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => {
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }} style={{
              whiteSpace: "nowrap", padding: "6px 14px",
              borderRadius: 20, border: `1.5px solid ${s.color}30`,
              background: s.color + "12", color: s.color,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 600, fontSize: "0.8rem", cursor: "pointer",
            }}>
              {s.title.split("—")[0].replace(/^\d+\.\s/, "").trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px" }}>
        {SECTIONS.map((s, i) => (
          <article key={s.id} id={s.id} style={{ marginBottom: 72 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ width: 5, height: 48, background: s.color, borderRadius: 3, flexShrink: 0 }} />
              <h2 style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 800, fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                color: s.color, lineHeight: 1.25,
              }}>{s.title}</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}
              className="content-grid">
              <div style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                lineHeight: 1.85, color: "#333", fontSize: "0.97rem",
                whiteSpace: "pre-line",
              }}>{s.content}</div>

              <div>
                <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                  <img src={s.image} alt={s.caption}
                    onClick={() => setLightbox({ src: s.image, caption: s.caption })}
                    style={{ width: "100%", height: 200, objectFit: "cover", display: "block", cursor: "zoom-in" }}
                  />
                  <div style={{
                    padding: "10px 14px", background: "#f9f0d6",
                    borderTop: `3px solid ${s.color}`,
                  }}>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: "0.78rem", color: "#444", fontStyle: "italic" }}>
                      {s.caption}
                    </p>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: "0.7rem", color: "#888", marginTop: 4 }}>
                      Nguồn: {s.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {i < SECTIONS.length - 1 && (
              <hr style={{ marginTop: 56, borderColor: "#e8d5a3", borderWidth: "1px 0 0" }} />
            )}
          </article>
        ))}

        {/* Kết luận */}
        <div style={{
          background: "linear-gradient(135deg, #7B1A12, #A93226)",
          borderRadius: 16, padding: "40px 36px", textAlign: "center",
        }}>
          <h3 style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 800, fontSize: "1.5rem", color: "white", marginBottom: 14,
          }}>Ý Nghĩa Lịch Sử</h3>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            color: "rgba(255,255,255,0.88)", lineHeight: 1.8, fontSize: "0.97rem",
            maxWidth: 600, margin: "0 auto",
          }}>
            Giai đoạn 1986–1991 là thời kỳ bản lề trong lịch sử Đảng và dân tộc. Đường lối Đổi Mới
            không chỉ cứu đất nước thoát khỏi khủng hoảng, mà còn mở ra con đường phát triển đúng đắn —
            kết hợp kinh tế thị trường với định hướng xã hội chủ nghĩa, hội nhập quốc tế giữ vững độc lập tự chủ.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.88)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          cursor: "zoom-out", padding: 24,
          animation: "fadeIn 0.2s ease",
        }}>
          <img src={lightbox.src} alt={lightbox.caption} style={{
            maxWidth: "90vw", maxHeight: "80vh",
            objectFit: "contain", borderRadius: 8,
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          }} />
          <p style={{
            marginTop: 16, color: "rgba(255,255,255,0.75)",
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: "0.9rem", textAlign: "center", fontStyle: "italic",
            maxWidth: 600,
          }}>{lightbox.caption}</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: 8 }}>
            Nhấn bất kỳ để đóng
          </p>
        </div>
      )}

      <ChatBox open={chat} onToggle={() => setChat(!chat)} />
    </div>
  );
}
