"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

const SECTIONS = [
  {
    id: "boi-canh",
    icon: "🌏",
    color: "#2980B9",
    title: "1. Bối Cảnh Lịch Sử Trước Đổi Mới",
    content: `Trước năm 1986, Việt Nam lâm vào khủng hoảng kinh tế–xã hội nghiêm trọng. Nền kinh tế kế hoạch hóa tập trung, bao cấp bộc lộ nhiều yếu kém. Sản xuất đình đốn, hàng hóa khan hiếm, lạm phát phi mã lên tới hàng trăm phần trăm mỗi năm. Đời sống nhân dân hết sức khó khăn.

Trên thế giới, làn sóng cải cách lan rộng. Liên Xô bắt đầu chính sách "Glasnost" và "Perestroika" (cởi mở và cải tổ) từ 1985 dưới thời Gorbachev. Trung Quốc đã tiến hành cải cách kinh tế từ năm 1978 và gặt hái kết quả khả quan.

Trong nước, nhiều địa phương và cơ sở đã tự phát "phá rào" trong sản xuất và phân phối để đáp ứng nhu cầu thực tế. Những thực tiễn sáng tạo này tạo cơ sở thực tiễn cho Đảng tổng kết và đề ra đường lối Đổi Mới.`,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hanoi_street_scene.jpg/640px-Hanoi_street_scene.jpg",
      caption: "Phố phường Hà Nội những năm 1980 – thời kỳ kinh tế bao cấp khó khăn",
      source: "Tư liệu ảnh Hà Nội thập niên 1980 – ảnh phục chế màu từ tư liệu đen trắng"
    }
  },
  {
    id: "dai-hoi-vi",
    icon: "⭐",
    color: "#C0392B",
    title: "2. Đại Hội Đảng Lần VI (12/1986) – Khởi Xướng Đổi Mới",
    content: `Tháng 12/1986, Đại hội đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam được tổ chức tại Hà Nội. Đây là Đại hội lịch sử, đánh dấu bước ngoặt căn bản trong sự nghiệp cách mạng Việt Nam.

Đại hội VI đề ra đường lối Đổi Mới toàn diện đất nước với ba nội dung cốt lõi:
• Đổi mới tư duy, nhất là tư duy kinh tế: từ bỏ tư duy chủ quan, duy ý chí, nhìn thẳng vào sự thật
• Xây dựng nền kinh tế hàng hóa nhiều thành phần, vận hành theo cơ chế thị trường có sự quản lý của Nhà nước
• Mở cửa hội nhập quốc tế

Đại hội đề ra chủ trương: "Đảng phải đổi mới, Nhà nước phải đổi mới, cán bộ phải đổi mới". Đặc biệt, Đại hội nhấn mạnh nguyên tắc "nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật" – một tinh thần dân chủ trong sinh hoạt Đảng.

Nghị quyết Đại hội VI xác định ba chương trình kinh tế lớn: lương thực–thực phẩm, hàng tiêu dùng, hàng xuất khẩu.`,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ho_Chi_Minh_City_Hall_2.jpg/640px-Ho_Chi_Minh_City_Hall_2.jpg",
      caption: "Hội trường lịch sử – nơi diễn ra Đại hội Đảng lần VI, tháng 12/1986 tại Hà Nội",
      source: "Đại hội Đảng Cộng sản Việt Nam lần thứ VI (12/1986) – ảnh tư liệu phục chế màu"
    }
  },
  {
    id: "kinh-te",
    icon: "💹",
    color: "#27AE60",
    title: "3. Đổi Mới Kinh Tế – Từ Bao Cấp đến Thị Trường",
    content: `Sau Đại hội VI, các chính sách kinh tế đổi mới được triển khai mạnh mẽ:

KHOÁN 10 (1988): Nghị quyết 10 của Bộ Chính trị (4/1988) giao quyền sử dụng đất lâu dài cho hộ nông dân, thay thế mô hình hợp tác xã bao cấp. Kết quả: sản lượng lúa tăng vọt, Việt Nam từ nước thiếu lương thực trở thành nước xuất khẩu gạo thứ 3 thế giới vào năm 1989.

LUẬT ĐẦU TƯ NƯỚC NGOÀI (1987): Quốc hội ban hành Luật Đầu tư nước ngoài đầu tiên, mở cửa thu hút vốn FDI, công nghệ và kỹ năng quản lý từ các nước tư bản.

XÓA BỎ BAO CẤP (1989): Nghị quyết 306/HĐBT xóa bỏ cơ chế hai giá, thống nhất hệ thống giá cả theo thị trường. Cải cách hệ thống ngân hàng, tách ngân hàng trung ương khỏi ngân hàng thương mại.

PHÁT TRIỂN KINH TẾ TƯ NHÂN: Thừa nhận và khuyến khích kinh tế tư nhân, kinh tế hỗn hợp phát triển song song với kinh tế nhà nước.`,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Rice_field_Vietnam.jpg/640px-Rice_field_Vietnam.jpg",
      caption: "Đồng lúa xanh mướt ở đồng bằng sông Cửu Long – thành quả của chính sách Khoán 10",
      source: "Sự kiện Nghị quyết 10/NQ-TW về đổi mới quản lý nông nghiệp (1988)"
    }
  },
  {
    id: "doi-ngoai",
    icon: "🌐",
    color: "#8E44AD",
    title: "4. Đổi Mới Đối Ngoại – Hội Nhập Quốc Tế",
    content: `Cùng với đổi mới kinh tế, Đảng chủ trương đổi mới toàn diện đường lối đối ngoại theo hướng mở cửa, đa phương hóa, đa dạng hóa.

RÚT QUÂN KHỎI CAMPUCHIA (1989): Tháng 9/1989, Việt Nam hoàn thành việc rút toàn bộ 50.000 quân tình nguyện khỏi Campuchia. Đây là điều kiện tiên quyết để bình thường hóa quan hệ với các nước ASEAN và phương Tây.

BÌNH THƯỜNG HÓA QUAN HỆ: Việt Nam từng bước cải thiện quan hệ với Trung Quốc, các nước ASEAN và bắt đầu quá trình bình thường hóa với Hoa Kỳ. Tháng 9/1989, Việt Nam và Trung Quốc nối lại quan hệ bình thường.

CHÍNH SÁCH ĐỐI NGOẠI MỚI: Đường lối "Việt Nam muốn làm bạn với tất cả các nước" được chính thức hóa tại Đại hội VII (1991). Việt Nam xin gia nhập ASEAN (chính thức kết nạp năm 1995).

BỐI CẢNH QUỐC TẾ: Sự sụp đổ của bức tường Berlin (11/1989) và hệ thống XHCN Đông Âu buộc Đảng phải suy nghĩ sâu sắc hơn về con đường phát triển của Việt Nam.`,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/PAVN_soldiers_at_Dien_Bien_Phu.jpg/640px-PAVN_soldiers_at_Dien_Bien_Phu.jpg",
      caption: "Quân đội nhân dân Việt Nam – những người đã hoàn thành nghĩa vụ quốc tế ở Campuchia (1989)",
      source: "Sự kiện rút quân tình nguyện Việt Nam khỏi Campuchia (09/1989) – ảnh phục chế màu"
    }
  },
  {
    id: "dai-hoi-vii",
    icon: "📜",
    color: "#E67E22",
    title: "5. Đại Hội Đảng Lần VII (6/1991) – Hoàn Thiện Đường Lối",
    content: `Tháng 6/1991, Đại hội đại biểu toàn quốc lần thứ VII của Đảng Cộng sản Việt Nam diễn ra trong bối cảnh đặc biệt: Liên Xô và Đông Âu đang sụp đổ, nhưng Việt Nam đã có 5 năm đổi mới với những kết quả ban đầu đáng khích lệ.

CƯƠNG LĨNH XÂY DỰNG ĐẤT NƯỚC: Đại hội VII thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (Cương lĩnh 1991) – văn kiện nền tảng xác định con đường đi lên của Việt Nam.

CHIẾN LƯỢC 2000: Đại hội thông qua Chiến lược phát triển kinh tế–xã hội đến năm 2000, đặt mục tiêu thoát khỏi nghèo nàn và lạc hậu.

TIẾP TỤC ĐỔI MỚI: Khẳng định tiếp tục đường lối đổi mới, không dao động, không quay lại cơ chế cũ. Nhấn mạnh đổi mới đồng bộ cả kinh tế lẫn hệ thống chính trị.

Đại hội VII đánh dấu sự hoàn thiện bước đầu của đường lối Đổi Mới, tạo nền tảng vững chắc cho công cuộc xây dựng và phát triển đất nước trong giai đoạn tiếp theo.`,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ho_Chi_Minh_City_Hall_2.jpg/640px-Ho_Chi_Minh_City_Hall_2.jpg",
      caption: "Trụ sở lịch sử tại Hà Nội – biểu tượng của thể chế chính trị Việt Nam giai đoạn Đổi Mới",
      source: "Đại hội Đảng Cộng sản Việt Nam lần thứ VII (06/1991)"
    }
  }
];

export default function NoiDungPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#FEF9E7" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #922B21, #C0392B, #E67E22)", padding: "3rem 0" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 mb-3">{[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F39C12", fontSize: "1.3rem" }}>★</span>)}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2.2rem", color: "#FEF9E7" }}>
            Nội Dung Học Thuật
          </h1>
          <p style={{ color: "#fde8e8", fontSize: "1rem", marginTop: "0.5rem" }}>
            Lịch sử Đảng Cộng sản Việt Nam giai đoạn Đổi Mới 1986–1991
          </p>
        </div>
      </div>

      {/* Quick nav */}
      <div style={{ background: "white", borderBottom: "2px solid #e8d5a3", padding: "0.75rem 0", position: "sticky", top: "72px", zIndex: 40 }}>
        <div className="max-w-4xl mx-auto px-4 flex gap-3 overflow-x-auto">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => {
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{ background: s.color + "15", color: s.color, border: `1px solid ${s.color}30` }}
            >
              {s.icon} {s.title.split("–")[0].replace(/^\d+\.\s/, "")}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {SECTIONS.map((section, i) => (
          <article key={section.id} id={section.id} className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: section.color }}>
                {section.icon}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: section.color }}>
                {section.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div style={{ lineHeight: 1.8, color: "#333", fontSize: "0.95rem" }} className="whitespace-pre-line">
                {section.content}
              </div>
              <div>
                <div className="rounded-xl overflow-hidden shadow-md card-hover">
                  <img src={section.image.url} alt={section.image.caption} className="w-full" style={{ height: "200px", objectFit: "cover" }} />
                  <div style={{ padding: "0.75rem", background: "#f9f0d6", borderTop: `3px solid ${section.color}` }}>
                    <p style={{ fontSize: "0.8rem", color: "#444", fontStyle: "italic" }}>📸 {section.image.caption}</p>
                    <p style={{ fontSize: "0.7rem", color: "#888", marginTop: "4px" }}>📌 {section.image.source}</p>
                  </div>
                </div>
              </div>
            </div>

            {i < SECTIONS.length - 1 && <hr style={{ marginTop: "3rem", borderColor: "#e8d5a3" }} />}
          </article>
        ))}

        {/* Conclusion */}
        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, #922B21, #C0392B)", color: "white" }}>
          <div className="flex justify-center gap-2 mb-3">{[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F39C12" }}>★</span>)}</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem" }}>
            Ý Nghĩa Lịch Sử
          </h3>
          <p style={{ marginTop: "0.75rem", lineHeight: 1.7, opacity: 0.9, fontSize: "0.95rem" }}>
            Giai đoạn 1986–1991 là thời kỳ bản lề trong lịch sử Đảng và dân tộc Việt Nam. 
            Đường lối Đổi Mới do Đảng khởi xướng không chỉ cứu đất nước thoát khỏi khủng hoảng, 
            mà còn mở ra con đường phát triển đúng đắn, sáng tạo – kết hợp kinh tế thị trường 
            với định hướng xã hội chủ nghĩa, hội nhập quốc tế giữ vững độc lập tự chủ.
          </p>
        </div>
      </div>

      <ChatBox open={showChat} onToggle={() => setShowChat(!showChat)} />
    </div>
  );
}
