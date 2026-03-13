year: "1986",
title: "Đại hội Đảng lần VI",
sub: "Khởi xướng Đổi Mới",
    image: "/pictures/pic1.png",
desc: "Tháng 12/1986, Đại hội VI chính thức mở ra công cuộc đổi mới toàn diện với tinh thần nhìn thẳng vào sự thật, đánh giá đúng thực trạng đất nước.",
accent: "#B5261E",
},
{
year: "1987",
title: "Luật Đầu tư nước ngoài",
sub: "Mở cửa kinh tế",
    image: "/pictures/pic2.png",
desc: "Luật Đầu tư nước ngoài đầu tiên được ban hành, tạo nền tảng pháp lý thu hút vốn FDI, công nghệ và kỹ năng quản lý hiện đại.",
accent: "#D4982A",
},
{
year: "1988",
title: "Khoán 10",
sub: "Giải phóng nông nghiệp",
    image: "/pictures/pic3.png",
desc: "Nghị quyết 10 giao quyền sử dụng đất lâu dài cho hộ nông dân. Việt Nam chuyển từ thiếu lương thực sang xuất khẩu gạo trong vòng một năm.",
accent: "#1B5E35",
},
{
year: "1989",
title: "Rút quân khỏi Campuchia",
sub: "Bình thường hóa quan hệ",
    image: "/pictures/pic4.jpg",
desc: "Hoàn thành rút toàn bộ quân tình nguyện, mở đường bình thường hóa quan hệ với ASEAN, phương Tây và Trung Quốc.",
accent: "#132D52",
},
{
year: "1991",
title: "Đại hội Đảng lần VII",
sub: "Hoàn thiện đường lối",
    image: "/pictures/pic5.png",
desc: "Đại hội VII thông qua Cương lĩnh xây dựng đất nước — văn kiện nền tảng định hướng con đường phát triển lâu dài của dân tộc.",
accent: "#B5261E",
},
@@ -420,6 +425,20 @@ export default function Home() {
boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
width: "100%",
}}>
                      {m.image && (
                        <img
                          src={m.image}
                          alt={`${m.title} ${m.year}`}
                          style={{
                            width: "100%",
                            height: "clamp(140px, 30vh, 320px)",
                            objectFit: "cover",
                            borderRadius: 8,
                            marginBottom: 14,
                            display: "block",
                          }}
                        />
                      )}
<div style={{
fontWeight: 900, fontSize: "3rem",
color: m.accent, opacity: 0.12,
