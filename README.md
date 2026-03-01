# 🇻🇳 Lịch Sử Đảng Cộng Sản Việt Nam 1986–1991

Website học tập về giai đoạn Đổi Mới của Đảng Cộng sản Việt Nam.

## Tính năng
- 📖 **Nội dung** – Lịch sử đầy đủ theo giáo trình Lịch sử Đảng
- 🎮 **Trò chơi** – Trắc nghiệm + Điền vào chỗ trống
- ❓ **Hỏi Đáp AI** – Chatbot Claude giải đáp câu hỏi lịch sử
- 💬 **Chat nổi** – Chat box ở góc phải mọi trang
- 👥 **Đếm lượt xem** – Hiển thị số người truy cập

## Cài đặt

```bash
npm install
```

Tạo file `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

```bash
npm run dev
```

## Deploy lên Vercel

1. Push code lên GitHub
2. Import repo vào [vercel.com](https://vercel.com)
3. Thêm Environment Variable: `ANTHROPIC_API_KEY`
4. Deploy!

## Cấu trúc

```
app/
├── page.tsx          # Trang chủ
├── noi-dung/         # Nội dung học thuật
├── tro-choi/         # Trò chơi
├── hoi-dap/          # Hỏi đáp AI (full page)
├── api/chat/         # API chatbot (Anthropic)
└── components/
    ├── Navbar.tsx
    ├── ChatBox.tsx   # Chat box nổi
    └── VisitorCounter.tsx
```
