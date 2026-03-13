"use client";
import { useState } from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

function HeaderBackground() {
  const [videoFailed, setVideoFailed] = useState(false);
  useEffect(() => {
    // Optionally load Three.js here for a 3D fallback like the home page.
  }, []);

  if (!videoFailed) {
    return (
      <video autoPlay muted loop playsInline
        onError={() => setVideoFailed(true)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      >
        <source src="/hero.mp4" type="video/mp4" onError={() => setVideoFailed(true)} />
      </video>
    );
  }

  // Fallback: gradient background
  return <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #7B1A12, #A93226, #C0392B)" }} />;
}

const SECTIONS = [
{
id: "boi-canh", color: "#1A4A7A",
@@ -12,9 +33,9 @@ const SECTIONS = [
Trên thế giới, làn sóng cải cách đang lan rộng. Liên Xô bắt đầu chính sách Glasnost và Perestroika từ 1985. Trung Quốc đã tiến hành cải cách kinh tế từ năm 1978 và gặt hái kết quả đáng kể.

Trong nước, nhiều địa phương và cơ sở đã tự phát "phá rào" trong sản xuất và phân phối để đáp ứng nhu cầu thực tế. Những thực tiễn sáng tạo này tạo cơ sở thực tiễn cho Đảng tổng kết và đề ra đường lối Đổi Mới.`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hanoi_street_scene.jpg/640px-Hanoi_street_scene.jpg",
    image: "/pictures/pic6.png",
caption: "Phố phường Hà Nội những năm 1980 — thời kỳ kinh tế bao cấp khó khăn",
    source: "Tư liệu ảnh Hà Nội thập niên 1980 — ảnh phục chế màu từ tư liệu đen trắng"
    source: "https://giaoduc.net.vn/hinh-anh-dac-sac-ve-cuoc-song-nguoi-ha-noi-thoi-ky-bao-cap-p1-post38454.gd"
},
{
id: "dai-hoi-vi", color: "#A93226",
@@ -27,9 +48,9 @@ Trong nước, nhiều địa phương và cơ sở đã tự phát "phá rào"
— Mở cửa hội nhập quốc tế

Đại hội nhấn mạnh nguyên tắc "nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật" — một tinh thần dân chủ trong sinh hoạt Đảng. Nghị quyết Đại hội VI xác định ba chương trình kinh tế lớn: lương thực – thực phẩm, hàng tiêu dùng, hàng xuất khẩu.`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ho_Chi_Minh_City_Hall_2.jpg/640px-Ho_Chi_Minh_City_Hall_2.jpg",
    image: "/pictures/pic1.png",
caption: "Hội trường lịch sử — nơi diễn ra Đại hội Đảng lần VI, tháng 12/1986 tại Hà Nội",
    source: "Đại hội Đảng lần thứ VI (12/1986) — ảnh tư liệu phục chế màu"
    source: "https://www.qdnd.vn/chinh-tri/tin-tuc/cac-ky-dai-hoi-cua-dang-va-nhung-dau-an-lich-su-dai-hoi-lan-thu-vi-khoi-xuong-va-lanh-dao-su-nghiep-doi-moi-dat-nuoc-813798"
},
{
id: "kinh-te", color: "#1E6B38",
@@ -43,9 +64,9 @@ Luật Đầu tư nước ngoài (1987): Quốc hội ban hành Luật Đầu t
Xóa bỏ bao cấp (1989): Nghị quyết 306/HĐBT xóa bỏ cơ chế hai giá, thống nhất hệ thống giá cả theo thị trường. Cải cách hệ thống ngân hàng, tách ngân hàng trung ương khỏi ngân hàng thương mại.

Phát triển kinh tế tư nhân: Thừa nhận và khuyến khích kinh tế tư nhân, kinh tế hỗn hợp phát triển song song với kinh tế nhà nước.`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Rice_field_Vietnam.jpg/640px-Rice_field_Vietnam.jpg",
    caption: "Đồng lúa đồng bằng sông Cửu Long — thành quả của chính sách Khoán 10",
    source: "Nghị quyết 10/NQ-TW về đổi mới quản lý nông nghiệp (1988)"
    image: "/pictures/pic7.png",
    caption: "Thực hiện khoán gọn theo đơn giá vụ mùa năm 1988, HTX Nhân Khang, huyện Lý Nhân, tỉnh Hà Nam — thành quả của chính sách Khoán 10",
    source: "https://www.vietnamplus.vn/tu-bai-hoc-khoan-10-den-cuong-quoc-xuat-khau-gao-post619310.vnp"
},
{
id: "doi-ngoai", color: "#5B2C6F",
@@ -59,9 +80,9 @@ Bình thường hóa quan hệ: Việt Nam từng bước cải thiện quan h
Chính sách đối ngoại mới: Đường lối "Việt Nam muốn làm bạn với tất cả các nước" được chính thức hóa tại Đại hội VII (1991). Việt Nam xin gia nhập ASEAN (chính thức kết nạp năm 1995).

Bối cảnh quốc tế: Sự sụp đổ của bức tường Berlin (11/1989) và hệ thống xã hội chủ nghĩa Đông Âu buộc Đảng phải suy nghĩ sâu sắc hơn về con đường phát triển.`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/PAVN_soldiers_at_Dien_Bien_Phu.jpg/640px-PAVN_soldiers_at_Dien_Bien_Phu.jpg",
    image: "/pictures/pic8.jpg",
caption: "Quân đội nhân dân Việt Nam — hoàn thành nghĩa vụ quốc tế ở Campuchia (1989)",
    source: "Rút quân tình nguyện Việt Nam khỏi Campuchia (09/1989) — ảnh phục chế màu"
    source: "https://tienphong.vn/bo-doi-nha-phat-va-tinh-than-quoc-te-cao-ca-post1139380.tpo"
},
{
id: "dai-hoi-vii", color: "#A93226",
@@ -75,9 +96,9 @@ Chiến lược đến năm 2000: Đại hội thông qua Chiến lược phát
Tiếp tục đổi mới: Khẳng định tiếp tục đường lối đổi mới, không dao động, không quay lại cơ chế cũ. Nhấn mạnh đổi mới đồng bộ cả kinh tế lẫn hệ thống chính trị.

Đại hội VII đánh dấu sự hoàn thiện bước đầu của đường lối Đổi Mới, tạo nền tảng vững chắc cho công cuộc xây dựng và phát triển đất nước trong giai đoạn tiếp theo.`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ho_Chi_Minh_City_Hall_2.jpg/640px-Ho_Chi_Minh_City_Hall_2.jpg",
    image: "/pictures/pic5.png",
caption: "Hà Nội — biểu tượng của thể chế chính trị Việt Nam giai đoạn Đổi Mới",
    source: "Đại hội Đảng lần thứ VII (06/1991)"
    source: "https://baoninhbinh.org.vn/dai-hoi-dang-lan-thu-vii-tiep-tuc-cong-cuoc-doi-moi-dua-dat-nuoc-co-ban-thoat-k-251110095239061.html"
}
];

@@ -89,11 +110,13 @@ export default function NoiDungPage() {
<Navbar />

{/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #7B1A12, #A93226, #C0392B)",
        padding: "56px 0 48px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ position: "relative", padding: "56px 0 48px", overflow: "hidden" }}>
        <HeaderBackground />

        {/* Gradient overlay on top of video to keep text readable */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(123,26,18,0.85), rgba(169,50,38,0.75), rgba(192,57,43,0.78))" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
<div style={{
display: "inline-block",
fontFamily: "'Be Vietnam Pro', sans-serif",
