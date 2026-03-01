"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

const QUIZ_QUESTIONS = [
  {
    q: "Đại hội Đảng lần thứ VI diễn ra vào tháng nào, năm nào?",
    options: ["Tháng 12/1985", "Tháng 12/1986", "Tháng 6/1987", "Tháng 3/1986"],
    correct: 1,
    explain: "Đại hội Đảng lần VI diễn ra từ ngày 15 đến 18 tháng 12 năm 1986 tại Hà Nội, chính thức khởi xướng đường lối Đổi Mới."
  },
  {
    q: "Nghị quyết 10 (Khoán 10) của Bộ Chính trị ban hành năm nào?",
    options: ["1986", "1987", "1988", "1989"],
    correct: 2,
    explain: "Nghị quyết 10/NQ-TW của Bộ Chính trị ban hành tháng 4/1988, giao quyền sử dụng đất lâu dài cho hộ nông dân."
  },
  {
    q: "Việt Nam hoàn thành rút quân khỏi Campuchia vào tháng nào năm 1989?",
    options: ["Tháng 1", "Tháng 6", "Tháng 9", "Tháng 12"],
    correct: 2,
    explain: "Tháng 9/1989, Việt Nam hoàn thành việc rút toàn bộ quân tình nguyện khỏi Campuchia, mở đường bình thường hóa quan hệ quốc tế."
  },
  {
    q: "Luật Đầu tư nước ngoài đầu tiên của Việt Nam được ban hành năm nào?",
    options: ["1986", "1987", "1988", "1990"],
    correct: 1,
    explain: "Năm 1987, Quốc hội Việt Nam ban hành Luật Đầu tư nước ngoài đầu tiên, mở cửa thu hút vốn FDI từ các nước."
  },
  {
    q: "Đại hội Đảng lần VII thông qua văn kiện quan trọng nào?",
    options: ["Hiến pháp 1992", "Cương lĩnh xây dựng đất nước 1991", "Luật Doanh nghiệp", "Nghị quyết Trung ương 6"],
    correct: 1,
    explain: "Đại hội VII (6/1991) thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội – văn kiện nền tảng định hướng con đường phát triển Việt Nam."
  },
  {
    q: "Slogan nổi tiếng của Đại hội VI về tinh thần nhìn nhận thực tế là gì?",
    options: [
      "Tiến nhanh, tiến mạnh lên CNXH",
      "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật",
      "Công nghiệp hóa, hiện đại hóa đất nước",
      "Dân giàu, nước mạnh, xã hội công bằng"
    ],
    correct: 1,
    explain: "Đại hội VI (1986) đề ra tinh thần 'Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật' – biểu hiện của dân chủ và tư duy đổi mới."
  }
];

const FILL_BLANKS = [
  { sentence: "Đại hội Đảng lần ____ khởi xướng đường lối Đổi Mới vào năm 1986.", answer: "VI", hint: "Số La Mã của số 6" },
  { sentence: "Nghị quyết ____ của Bộ Chính trị năm 1988 giao đất cho nông dân.", answer: "10", hint: "Còn gọi là 'Khoán mười'" },
  { sentence: "Việt Nam xuất khẩu ____ thành công vào năm 1989 nhờ Khoán 10.", answer: "gạo", hint: "Lương thực chủ yếu" },
  { sentence: "Đại hội ____ của Đảng năm 1991 thông qua Cương lĩnh xây dựng đất nước.", answer: "VII", hint: "Số La Mã của số 7" },
];

export default function TroChoiPage() {
  const [showChat, setShowChat] = useState(false);
  const [activeGame, setActiveGame] = useState<"quiz" | "fill" | null>(null);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  // Fill state
  const [fillAnswers, setFillAnswers] = useState<string[]>(FILL_BLANKS.map(() => ""));
  const [fillChecked, setFillChecked] = useState(false);

  const handleQuizAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
      setQuizDone(true);
    } else {
      setQuizIdx(i => i + 1);
      setSelected(null);
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0); setSelected(null); setScore(0); setQuizDone(false);
  };

  const fillCorrect = FILL_BLANKS.filter((f, i) => fillAnswers[i].trim().toLowerCase() === f.answer.toLowerCase()).length;

  const GAMES = [
    { id: "quiz", icon: "🎯", title: "Trắc Nghiệm Lịch Sử", desc: `${QUIZ_QUESTIONS.length} câu hỏi về giai đoạn Đổi Mới 1986–1991`, color: "#C0392B" },
    { id: "fill", icon: "✏️", title: "Điền Vào Chỗ Trống", desc: `${FILL_BLANKS.length} câu hoàn thành kiến thức lịch sử`, color: "#27AE60" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FEF9E7" }}>
      <Navbar />

      <div style={{ background: "linear-gradient(135deg, #1a5c2a, #27AE60, #2ECC71)", padding: "3rem 0" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 mb-3">{[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F39C12", fontSize: "1.3rem" }}>★</span>)}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2.2rem", color: "#FEF9E7" }}>
            Trò Chơi Lịch Sử
          </h1>
          <p style={{ color: "#d4f5d4", fontSize: "1rem", marginTop: "0.5rem" }}>
            Học mà chơi, chơi mà học – kiểm tra kiến thức về Đổi Mới 1986–1991
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {!activeGame && (
          <div className="grid md:grid-cols-2 gap-6">
            {GAMES.map(game => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id as any)}
                className="p-8 rounded-2xl text-center card-hover shadow-md"
                style={{ background: "white", border: `2px solid ${game.color}30` }}
              >
                <div className="text-5xl mb-4">{game.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem", color: game.color }}>{game.title}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.5rem" }}>{game.desc}</p>
                <div className="mt-4 inline-block px-5 py-2 rounded-full text-sm font-bold" style={{ background: game.color, color: "white" }}>
                  Chơi ngay ▶
                </div>
              </button>
            ))}
          </div>
        )}

        {/* QUIZ GAME */}
        {activeGame === "quiz" && !quizDone && (
          <div className="rounded-2xl shadow-lg overflow-hidden" style={{ background: "white" }}>
            <div style={{ background: "linear-gradient(135deg, #922B21, #C0392B)", padding: "1.5rem" }}>
              <div className="flex justify-between items-center">
                <span style={{ color: "#F39C12", fontWeight: 700 }}>🎯 Câu {quizIdx + 1}/{QUIZ_QUESTIONS.length}</span>
                <span style={{ color: "#fde8e8" }}>Điểm: {score}</span>
              </div>
              <div className="w-full rounded-full mt-2" style={{ background: "rgba(255,255,255,0.2)", height: "6px" }}>
                <div className="rounded-full h-full" style={{ background: "#F39C12", width: `${((quizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`, transition: "width 0.5s" }} />
              </div>
            </div>
            <div style={{ padding: "2rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#2C3E50", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                {QUIZ_QUESTIONS[quizIdx].q}
              </h3>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    className={`quiz-option w-full ${selected !== null ? (i === QUIZ_QUESTIONS[quizIdx].correct ? "correct" : selected === i ? "wrong" : "") : ""}`}
                  >
                    <span style={{ fontWeight: 600, color: "#C0392B", marginRight: "0.5rem" }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              {selected !== null && (
                <div className="mt-4 p-4 rounded-xl fade-in-up" style={{ background: selected === QUIZ_QUESTIONS[quizIdx].correct ? "#eafaf1" : "#fdf2f2", border: `1px solid ${selected === QUIZ_QUESTIONS[quizIdx].correct ? "#27AE60" : "#C0392B"}30` }}>
                  <p style={{ fontSize: "0.88rem", color: "#444", lineHeight: 1.6 }}>
                    {selected === QUIZ_QUESTIONS[quizIdx].correct ? "✅ Chính xác! " : "❌ Chưa đúng. "}
                    {QUIZ_QUESTIONS[quizIdx].explain}
                  </p>
                  <button onClick={nextQuestion} className="mt-3 px-5 py-2 rounded-full text-sm font-bold" style={{ background: "#C0392B", color: "white" }}>
                    {quizIdx + 1 >= QUIZ_QUESTIONS.length ? "Xem kết quả →" : "Câu tiếp →"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeGame === "quiz" && quizDone && (
          <div className="rounded-2xl shadow-lg text-center" style={{ background: "white", padding: "3rem" }}>
            <div className="text-6xl mb-4">{score >= 5 ? "🏆" : score >= 3 ? "🎉" : "📚"}</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2rem", color: "#922B21" }}>
              {score}/{QUIZ_QUESTIONS.length}
            </h2>
            <p style={{ color: "#666", fontSize: "1rem", marginTop: "0.5rem" }}>
              {score >= 5 ? "Xuất sắc! Bạn nắm vững lịch sử Đổi Mới!" : score >= 3 ? "Tốt! Hãy ôn thêm để nhớ lâu hơn." : "Cần học thêm về giai đoạn Đổi Mới 1986–1991."}
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={resetQuiz} className="px-5 py-2 rounded-full font-bold" style={{ background: "#C0392B", color: "white" }}>Chơi lại 🔄</button>
              <button onClick={() => setActiveGame(null)} className="px-5 py-2 rounded-full font-bold" style={{ background: "#27AE60", color: "white" }}>Trò chơi khác</button>
            </div>
          </div>
        )}

        {/* FILL BLANK */}
        {activeGame === "fill" && (
          <div className="rounded-2xl shadow-lg overflow-hidden" style={{ background: "white" }}>
            <div style={{ background: "linear-gradient(135deg, #1a5c2a, #27AE60)", padding: "1.5rem" }}>
              <h3 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem" }}>✏️ Điền Vào Chỗ Trống</h3>
              <p style={{ color: "#d4f5d4", fontSize: "0.85rem", marginTop: "0.25rem" }}>Điền từ/cụm từ thích hợp vào chỗ trống</p>
            </div>
            <div style={{ padding: "2rem" }} className="space-y-6">
              {FILL_BLANKS.map((item, i) => {
                const isCorrect = fillChecked && fillAnswers[i].trim().toLowerCase() === item.answer.toLowerCase();
                const isWrong = fillChecked && fillAnswers[i].trim().toLowerCase() !== item.answer.toLowerCase();
                return (
                  <div key={i} className="p-4 rounded-xl" style={{ background: fillChecked ? (isCorrect ? "#eafaf1" : "#fdf2f2") : "#f9f0d6", border: `1px solid ${fillChecked ? (isCorrect ? "#27AE60" : "#C0392B") : "#e8d5a3"}30` }}>
                    <p style={{ color: "#333", lineHeight: 1.7, fontSize: "0.95rem" }}>
                      <strong>{i + 1}.</strong> {item.sentence.replace("____", "______")}
                    </p>
                    <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "4px" }}>💡 Gợi ý: {item.hint}</p>
                    <input
                      value={fillAnswers[i]}
                      onChange={e => {
                        setFillChecked(false);
                        const arr = [...fillAnswers]; arr[i] = e.target.value; setFillAnswers(arr);
                      }}
                      placeholder="Nhập câu trả lời..."
                      className="mt-2 w-full"
                      style={{ border: `2px solid ${fillChecked ? (isCorrect ? "#27AE60" : "#C0392B") : "#e8d5a3"}`, borderRadius: "8px", padding: "0.5rem 0.75rem", fontSize: "0.9rem", background: "white", outline: "none" }}
                    />
                    {fillChecked && (
                      <p style={{ fontSize: "0.8rem", marginTop: "6px", color: isCorrect ? "#27AE60" : "#C0392B" }}>
                        {isCorrect ? "✅ Chính xác!" : `❌ Đáp án: ${item.answer}`}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setFillChecked(true)} className="px-6 py-2 rounded-full font-bold" style={{ background: "#27AE60", color: "white" }}>
                  Kiểm tra ✓
                </button>
                {fillChecked && (
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "0.9rem", color: "#444" }}>Kết quả: {fillCorrect}/{FILL_BLANKS.length}</span>
                    <span>{fillCorrect === FILL_BLANKS.length ? "🏆" : "📚"}</span>
                  </div>
                )}
                <button onClick={() => setActiveGame(null)} className="px-5 py-2 rounded-full font-bold ml-auto" style={{ background: "#e8d5a3", color: "#666" }}>
                  ← Quay lại
                </button>
              </div>
            </div>
          </div>
        )}

        {activeGame && (
          <div className="mt-4 text-center">
            <button onClick={() => setActiveGame(null)} className="text-sm" style={{ color: "#C0392B" }}>
              ← Xem tất cả trò chơi
            </button>
          </div>
        )}
      </div>

      <ChatBox open={showChat} onToggle={() => setShowChat(!showChat)} />
    </div>
  );
}
