"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

function HeaderBackground() {
  const [videoFailed, setVideoFailed] = useState(false);

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
  return <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #6B1410, #B5261E)" }} />;
}

const QUIZ = [
  { q: "Đại hội Đảng lần thứ VI diễn ra vào tháng nào, năm nào?", opts: ["Tháng 12/1985","Tháng 12/1986","Tháng 6/1987","Tháng 3/1986"], ans: 1, exp: "Đại hội VI diễn ra từ ngày 15 đến 18 tháng 12 năm 1986 tại Hà Nội, chính thức khởi xướng đường lối Đổi Mới." },
  { q: "Nghị quyết 10 (Khoán 10) của Bộ Chính trị ban hành năm nào?", opts: ["1986","1987","1988","1989"], ans: 2, exp: "Nghị quyết 10/NQ-TW ban hành tháng 4/1988, giao quyền sử dụng đất lâu dài cho hộ nông dân." },
  { q: "Việt Nam hoàn thành rút quân khỏi Campuchia vào tháng mấy năm 1989?", opts: ["Tháng 1","Tháng 6","Tháng 9","Tháng 12"], ans: 2, exp: "Tháng 9/1989, Việt Nam hoàn thành rút toàn bộ quân tình nguyện khỏi Campuchia." },
  { q: "Luật Đầu tư nước ngoài đầu tiên của Việt Nam được ban hành năm nào?", opts: ["1986","1987","1988","1990"], ans: 1, exp: "Năm 1987, Quốc hội ban hành Luật Đầu tư nước ngoài đầu tiên, mở cửa thu hút vốn FDI." },
  { q: "Đại hội VII thông qua văn kiện quan trọng nào?", opts: ["Hiến pháp 1992","Cương lĩnh xây dựng đất nước 1991","Luật Doanh nghiệp","Nghị quyết Trung ương 6"], ans: 1, exp: "Đại hội VII (6/1991) thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội." },
  { q: "Tinh thần nổi bật của Đại hội VI về nhìn nhận thực tế là gì?", opts: ["Tiến nhanh, tiến mạnh lên chủ nghĩa xã hội","Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật","Công nghiệp hóa, hiện đại hóa đất nước","Dân giàu, nước mạnh, xã hội công bằng"], ans: 1, exp: "Đại hội VI đề ra tinh thần nhìn thẳng vào sự thật, đánh giá đúng thực trạng đất nước — biểu hiện của dân chủ và đổi mới tư duy." },
  { q: "Trước Đổi Mới, lạm phát của Việt Nam ở mức nào?", opts: ["Dưới 50%/năm","Khoảng 100%/năm","Hàng trăm phần trăm/năm","Dưới 20%/năm"], ans: 2, exp: "Trước 1986, lạm phát phi mã lên tới hàng trăm phần trăm mỗi năm, đời sống nhân dân hết sức khó khăn." },
  { q: "Ba chương trình kinh tế lớn của Đại hội VI là gì?", opts: ["Công nghiệp – Nông nghiệp – Dịch vụ","Lương thực-thực phẩm – Hàng tiêu dùng – Hàng xuất khẩu","Điện – Than – Thép","Giao thông – Thuỷ lợi – Giáo dục"], ans: 1, exp: "Nghị quyết Đại hội VI xác định 3 chương trình kinh tế lớn: lương thực – thực phẩm, hàng tiêu dùng và hàng xuất khẩu." },
  { q: "Việt Nam xuất khẩu gạo xếp thứ mấy thế giới vào năm 1989?", opts: ["Thứ nhất","Thứ hai","Thứ ba","Thứ tư"], ans: 2, exp: "Nhờ Khoán 10, năm 1989 Việt Nam từ nước thiếu lương thực trở thành nước xuất khẩu gạo đứng thứ ba thế giới." },
  { q: "Liên Xô bắt đầu chính sách cải cách Glasnost và Perestroika từ năm nào?", opts: ["1983","1984","1985","1986"], ans: 2, exp: "Liên Xô bắt đầu chính sách Glasnost và Perestroika từ năm 1985 dưới thời Tổng Bí thư Gorbachev." },
  { q: "Nghị quyết 306/HĐBT năm 1989 có ý nghĩa gì?", opts: ["Ban hành Luật Doanh nghiệp","Xóa bỏ cơ chế hai giá, thống nhất giá thị trường","Gia nhập ASEAN","Rút quân khỏi Campuchia"], ans: 1, exp: "Nghị quyết 306/HĐBT xóa bỏ cơ chế hai giá, thống nhất hệ thống giá cả theo thị trường — bước đột phá trong cải cách kinh tế." },
  { q: "Đại hội VII diễn ra vào tháng nào năm 1991?", opts: ["Tháng 3","Tháng 4","Tháng 6","Tháng 12"], ans: 2, exp: "Đại hội đại biểu toàn quốc lần thứ VII diễn ra tháng 6/1991 tại Hà Nội." },
  { q: "Việt Nam chính thức gia nhập ASEAN vào năm nào?", opts: ["1991","1993","1995","1997"], ans: 2, exp: "Việt Nam chính thức gia nhập ASEAN năm 1995, sau quá trình bình thường hóa quan hệ bắt đầu từ Đổi Mới 1986." },
  { q: "Trung Quốc bắt đầu cải cách kinh tế từ năm nào, ảnh hưởng đến Đổi Mới Việt Nam?", opts: ["1975","1978","1980","1982"], ans: 1, exp: "Trung Quốc tiến hành cải cách kinh tế từ năm 1978 và gặt hái kết quả đáng kể, là một trong các yếu tố tham chiếu cho Đổi Mới Việt Nam." },
  { q: "Chiến lược phát triển kinh tế–xã hội đến năm 2000 được thông qua tại Đại hội nào?", opts: ["Đại hội V","Đại hội VI","Đại hội VII","Đại hội VIII"], ans: 2, exp: "Đại hội VII (1991) thông qua Chiến lược phát triển kinh tế–xã hội đến năm 2000, đặt mục tiêu thoát khỏi nghèo nàn và lạc hậu." },
  { q: "Cơ chế kinh tế nào được thay thế bởi Khoán 10?", opts: ["Kinh tế tư nhân","Mô hình hợp tác xã bao cấp","Kinh tế hỗn hợp","Doanh nghiệp nhà nước"], ans: 1, exp: "Khoán 10 thay thế mô hình hợp tác xã bao cấp, giao quyền sử dụng đất lâu dài trực tiếp cho hộ nông dân." },
  { q: "Bức tường Berlin sụp đổ vào tháng mấy năm nào?", opts: ["Tháng 9/1989","Tháng 10/1989","Tháng 11/1989","Tháng 12/1989"], ans: 2, exp: "Bức tường Berlin sụp đổ tháng 11/1989, là biểu tượng sụp đổ của hệ thống xã hội chủ nghĩa Đông Âu, tác động lớn đến tư duy của Đảng Cộng sản Việt Nam." },
  { q: "Đường lối đối ngoại mới của Việt Nam sau Đổi Mới là gì?", opts: ["Chỉ hợp tác với các nước xã hội chủ nghĩa","Việt Nam muốn làm bạn với tất cả các nước","Ưu tiên quan hệ với Liên Xô","Không liên kết với phương Tây"], ans: 1, exp: "Đường lối 'Việt Nam muốn làm bạn với tất cả các nước' được chính thức hóa tại Đại hội VII (1991), đánh dấu chính sách đối ngoại đa phương hóa." },
  { q: "Việt Nam có bao nhiêu quân tình nguyện ở Campuchia trước khi rút về?", opts: ["Khoảng 20.000","Khoảng 30.000","Khoảng 50.000","Khoảng 80.000"], ans: 2, exp: "Việt Nam hoàn thành rút toàn bộ 50.000 quân tình nguyện khỏi Campuchia vào tháng 9/1989." },
  { q: "Nền kinh tế Việt Nam trước Đổi Mới vận hành theo mô hình nào?", opts: ["Kinh tế thị trường tự do","Kinh tế hỗn hợp","Kế hoạch hóa tập trung, bao cấp","Kinh tế tư nhân"], ans: 2, exp: "Trước 1986, Việt Nam vận hành theo mô hình kinh tế kế hoạch hóa tập trung, bao cấp — dẫn đến khủng hoảng kinh tế nghiêm trọng." },
];

const FILL = [
  { s: "Đại hội Đảng lần ____ khởi xướng đường lối Đổi Mới vào năm 1986.", ans: "VI", hint: "Số La Mã của số 6" },
  { s: "Nghị quyết ____ của Bộ Chính trị năm 1988 giao đất cho nông dân.", ans: "10", hint: "Còn gọi là Khoán mười" },
  { s: "Việt Nam xuất khẩu ____ thành công vào năm 1989 nhờ Khoán 10.", ans: "gạo", hint: "Lương thực chủ yếu" },
  { s: "Đại hội ____ của Đảng năm 1991 thông qua Cương lĩnh xây dựng đất nước.", ans: "VII", hint: "Số La Mã của số 7" },
  { s: "Việt Nam rút ____ quân tình nguyện khỏi Campuchia năm 1989.", ans: "50.000", hint: "Năm mươi nghìn" },
  { s: "Bức tường ____ sụp đổ tháng 11/1989 ảnh hưởng đến tư duy Đổi Mới.", ans: "Berlin", hint: "Thủ đô nước Đức" },
  { s: "Luật Đầu tư ____ đầu tiên được ban hành năm 1987.", ans: "nước ngoài", hint: "FDI" },
  { s: "Tinh thần Đại hội VI: Nhìn thẳng vào ____, đánh giá đúng sự thật.", ans: "sự thật", hint: "Không né tránh thực tế" },
];

export default function TroChoiPage() {
  const [chat, setChat] = useState(false);
  const [game, setGame] = useState<"quiz"|"fill"|null>(null);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [fills, setFills] = useState(FILL.map(() => ""));
  const [checked, setChecked] = useState(false);

  const pick = (i: number) => {
    if (sel !== null) return;
    setSel(i);
    if (i === QUIZ[qi].ans) setScore(s => s + 1);
  };
  const next = () => {
    if (qi + 1 >= QUIZ.length) { setDone(true); } else { setQi(q => q + 1); setSel(null); }
  };
  const reset = () => { setQi(0); setSel(null); setScore(0); setDone(false); };

  const fillOk = FILL.filter((f, i) => fills[i].trim().toLowerCase() === f.ans.toLowerCase()).length;

  const S = { fontFamily: "'Be Vietnam Pro', sans-serif" };

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6E3" }}>
      <Navbar />

      <div style={{ position: "relative", padding: "56px 0 48px", overflow: "hidden" }}>
        <HeaderBackground />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(107,20,16,0.88), rgba(181,38,30,0.82))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h1 style={{ ...S, fontWeight: 900, fontSize: "clamp(1.8rem,5vw,2.8rem)", color: "white", lineHeight: 1.2 }}>
            Trò Chơi Lịch Sử
          </h1>
          <p style={{ ...S, color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginTop: 10 }}>
            Học mà chơi, chơi mà học — kiểm tra kiến thức về Đổi Mới 1986–1991
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 28px" }}>
        {!game && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {[
              { id: "quiz", title: "Trắc Nghiệm", desc: `${QUIZ.length} câu hỏi về giai đoạn Đổi Mới`, color: "#A93226" },
              { id: "fill", title: "Điền Vào Chỗ Trống", desc: `${FILL.length} câu hoàn thành kiến thức`, color: "#A93226" },
            ].map(g => (
              <button key={g.id} onClick={() => setGame(g.id as any)} style={{
                background: "white", border: `2px solid ${g.color}20`,
                borderRadius: 16, padding: "44px 28px", minHeight: 260, cursor: "pointer",
                textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s",
              }}>
                <div style={{ width: 40, height: 4, background: g.color, borderRadius: 2, margin: "0 auto 16px" }} />
                <h3 style={{ ...S, fontWeight: 800, fontSize: "1.4rem", color: g.color, marginBottom: 10 }}>{g.title}</h3>
                <p style={{ ...S, color: "#666", fontSize: "1.02rem", lineHeight: 1.6 }}>{g.desc}</p>
                <div style={{ ...S, marginTop: 18, fontWeight: 700, fontSize: "1rem", color: g.color }}>Bắt đầu</div>
              </button>
            ))}
          </div>
        )}

        {/* QUIZ */}
        {game === "quiz" && !done && (
          <div style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 38px rgba(0,0,0,0.12)" }}>
            <div style={{ background: "linear-gradient(135deg, #7B1A12, #A93226)", padding: "28px 34px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...S, color: "#F5C842", fontWeight: 700, fontSize: "1.1rem" }}>Câu {qi+1}/{QUIZ.length}</span>
                <span style={{ ...S, color: "rgba(255,255,255,0.82)", fontSize: "1rem" }}>Điểm: {score}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginTop: 14 }}>
                <div style={{ height: "100%", background: "#F5C842", borderRadius: 2, width: `${((qi+1)/QUIZ.length)*100}%`, transition: "width 0.5s" }} />
              </div>
            </div>
            <div style={{ padding: "38px 34px 34px" }}>
              <h3 style={{ ...S, fontWeight: 700, fontSize: "1.45rem", color: "#1A1A1A", lineHeight: 1.55, marginBottom: 24 }}>
                {QUIZ[qi].q}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {QUIZ[qi].opts.map((o, i) => (
                  <button key={i} onClick={() => pick(i)} className={`quiz-opt${sel !== null ? (i === QUIZ[qi].ans ? " correct" : sel === i ? " wrong" : "") : ""}`}>
                    {o}
                  </button>
                ))}
              </div>
              {sel !== null && (
                <div style={{
                  marginTop: 20, padding: "18px 20px", borderRadius: 12,
                  background: sel === QUIZ[qi].ans ? "#eafaf1" : "#fdf2f2",
                  border: `1px solid ${sel === QUIZ[qi].ans ? "#A93226" : "#A93226"}30`,
                }}>
                  <p style={{ ...S, fontSize: "1rem", color: "#333", lineHeight: 1.65 }}>
                    {sel === QUIZ[qi].ans ? "Chính xác! " : "Chưa đúng. "}{QUIZ[qi].exp}
                  </p>
                  <button onClick={next} style={{
                    ...S, marginTop: 14, padding: "11px 24px", borderRadius: 24,
                    background: "#A93226", color: "white", border: "none",
                    fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                  }}>
                    {qi+1 >= QUIZ.length ? "Xem kết quả" : "Câu tiếp"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {game === "quiz" && done && (
          <div style={{ background: "white", borderRadius: 18, padding: "64px 42px", textAlign: "center", boxShadow: "0 10px 38px rgba(0,0,0,0.12)" }}>
            <div style={{ ...S, fontWeight: 900, fontSize: "3.5rem", color: "#A93226", marginBottom: 8 }}>
              {score}/{QUIZ.length}
            </div>
            <p style={{ ...S, color: "#555", fontSize: "1.12rem", marginBottom: 28 }}>
              {score >= 16 ? "Xuất sắc! Bạn nắm vững lịch sử Đổi Mới." : score >= 10 ? "Tốt! Hãy ôn thêm để nhớ lâu hơn." : "Hãy đọc thêm nội dung và thử lại."}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={reset} style={{ ...S, padding: "12px 26px", borderRadius: 22, background: "#A93226", color: "white", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.98rem" }}>
                Chơi lại
              </button>
              <button onClick={() => setGame(null)} style={{ ...S, padding: "12px 26px", borderRadius: 22, background: "#B5261E", color: "white", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.98rem" }}>
                Trò chơi khác
              </button>
            </div>
          </div>
        )}

        {/* FILL */}
        {game === "fill" && (
          <div style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 38px rgba(0,0,0,0.12)" }}>
            <div style={{ background: "linear-gradient(135deg, #6B1410, #B5261E)", padding: "28px 34px" }}>
              <h3 style={{ ...S, fontWeight: 700, fontSize: "1.4rem", color: "white" }}>Điền Vào Chỗ Trống</h3>
              <p style={{ ...S, color: "rgba(255,255,255,0.72)", fontSize: "0.98rem", marginTop: 6 }}>Điền từ hoặc cụm từ thích hợp vào chỗ trống</p>
            </div>
            <div style={{ padding: "34px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {FILL.map((f, i) => {
                  const ok = checked && fills[i].trim().toLowerCase() === f.ans.toLowerCase();
                  return (
                    <div key={i} style={{
                      padding: "24px", borderRadius: 14,
                      background: checked
                        ? (ok ? "linear-gradient(135deg, #fff8ee, #fdf0e0)" : "linear-gradient(135deg, #fff1f0, #ffe2dd)")
                        : "linear-gradient(135deg, #fff8e5, #f7e8be)",
                      border: `2px solid ${checked ? (ok ? "#B5261E" : "#A93226") : "#e2b85f"}`,
                      boxShadow: checked
                        ? (ok ? "0 8px 20px rgba(181,38,30,0.12)" : "0 8px 20px rgba(169,50,38,0.14)")
                        : "0 8px 20px rgba(226,184,95,0.2)",
                    }}>
                      <p style={{ ...S, color: "#333", lineHeight: 1.75, fontSize: "1.08rem" }}>
                        <strong>{i+1}.</strong> {f.s}
                      </p>
                      <p style={{ ...S, color: "#7b6a46", fontSize: "0.96rem", marginTop: 8, fontWeight: 600 }}>Gợi ý: {f.hint}</p>
                      <input value={fills[i]}
                        onChange={e => { setChecked(false); const a=[...fills]; a[i]=e.target.value; setFills(a); }}
                        placeholder="Nhập câu trả lời..."
                        style={{
                          ...S, marginTop: 12, width: "100%",
                          border: `2px solid ${checked ? (ok ? "#B5261E" : "#A93226") : "#e8d5a3"}`,
                          borderRadius: 12, padding: "14px 16px",
                          fontSize: "1.1rem", fontWeight: 600,
                          background: "white", outline: "none", color: "#4b180f",
                        }}
                      />
                      {checked && <p style={{ ...S, fontSize: "1rem", marginTop: 10, color: ok ? "#B5261E" : "#A93226", fontWeight: 700 }}>
                        {ok ? "Chính xác!" : `Đáp án đúng: ${f.ans}`}
                      </p>}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 28, alignItems: "center" }}>
                <button onClick={() => setChecked(true)} style={{ ...S, padding: "12px 26px", borderRadius: 22, background: "#B5261E", color: "white", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.98rem" }}>
                  Kiểm tra
                </button>
                {checked && <span style={{ ...S, color: "#444", fontSize: "1rem" }}>Kết quả: {fillOk}/{FILL.length}</span>}
                <button onClick={() => setGame(null)} style={{ ...S, marginLeft: "auto", padding: "12px 22px", borderRadius: 22, background: "#e8d5a3", color: "#555", border: "none", fontWeight: 600, cursor: "pointer", fontSize: "0.96rem" }}>
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        )}

        {game && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button onClick={() => setGame(null)} style={{ ...S, color: "#A93226", background: "none", border: "none", cursor: "pointer", fontSize: "0.88rem" }}>
              Xem tất cả trò chơi
            </button>
          </div>
        )}
      </div>

      <ChatBox open={chat} onToggle={() => setChat(!chat)} />
    </div>
  );
}
