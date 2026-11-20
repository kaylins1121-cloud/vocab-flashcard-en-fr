# Lexi – Học từ vựng Anh · Pháp theo câu

Ứng dụng web học từ vựng song ngữ Anh – Pháp theo ngữ cảnh câu, kết hợp flashcard lật thẻ và ôn tập lặp lại ngắt quãng (SRS đơn giản). Toàn bộ dữ liệu học được lưu trong trình duyệt (`localStorage`), không cần tài khoản hay máy chủ.

## Tính năng

- Thẻ hiển thị câu mẫu (Tiếng Anh hoặc Tiếng Pháp), lật thẻ để xem nghĩa Tiếng Việt.
- Từ mục tiêu được tô sáng trong câu. Rê chuột hoặc chạm vào từ để xem nghĩa, phiên âm, loại từ và ví dụ.
- Nghe phát âm bằng Web Speech API (`en-US`, `en-GB`, `fr-FR`). Nếu trình duyệt không hỗ trợ, nút nghe bị vô hiệu hóa và ứng dụng vẫn dùng bình thường.
- Đánh giá mức nhớ Khó / Tạm / Dễ để tự động lên lịch ôn lại.
- Lọc nhanh: Tất cả / Chỉ Tiếng Anh / Chỉ Tiếng Pháp.
- Thêm thẻ mới ngay trong ứng dụng và lưu vào `localStorage`.

## Cách 1: Mở file `lexi.html` (không cần cài gì)

1. Tải file `lexi.html`.
2. Bấm đúp để mở bằng Edge hoặc Chrome.

Lưu ý:
- Hãy luôn mở bằng cùng một trình duyệt và cùng một đường dẫn file. Nếu di chuyển file sang thư mục khác, tiến độ cũ có thể không hiện.
- Font chữ đẹp tải từ Google Fonts nên cần mạng. Khi không có mạng, ứng dụng dùng font hệ thống.
- Bản này không có file dữ liệu để sửa. Hãy thêm thẻ bằng tab "Thêm thẻ" trong ứng dụng.

## Cách 2: Chạy bản dự án (React + Vite + TypeScript + Tailwind)

Yêu cầu: cài [Node.js](https://nodejs.org) bản LTS.

```bash
npm install
npm run dev
```

Mở địa chỉ hiện ra trong terminal (thường là `http://localhost:5173`). Không mở trực tiếp `index.html` bằng cách bấm đúp, vì trang sẽ trắng.

Các lệnh khác:

```bash
npm run build     # kiểm tra kiểu và build ra thư mục dist/
npm run preview   # chạy thử bản build
```

Để tạo lại bản một file duy nhất, cài thêm `vite-plugin-singlefile` rồi thêm `viteSingleFile()` vào `plugins` trong `vite.config.ts`. Sau `npm run build`, file `dist/index.html` chính là bản chạy độc lập.

## Cấu trúc thư mục

```
src/
├─ main.tsx, index.css, App.tsx, types.ts
├─ data/cards.json        # dữ liệu thẻ gốc
├─ lib/
│  ├─ srs.ts              # thuật toán ôn tập ngắt quãng
│  ├─ speech.ts           # phát âm (speechSynthesis)
│  └─ storage.ts          # đọc/ghi localStorage
└─ components/
   ├─ Flashcard.tsx       # thẻ lật, highlight từ mục tiêu
   └─ AddCard.tsx         # form thêm thẻ và danh sách thẻ tự tạo
```

## Thêm dữ liệu thẻ

Thêm một object vào `src/data/cards.json`:

```json
{
  "id": "en8",
  "lang": "en",
  "sentence": "Could you speak a bit more slowly?",
  "target": "slowly",
  "translation": "Bạn có thể nói chậm hơn một chút không?",
  "word": {
    "meaning": "chậm rãi",
    "ipa": "/ˈsləʊli/",
    "pos": "trạng từ",
    "example": "He walks slowly."
  }
}
```

- `id` phải là duy nhất.
- `lang` là `"en"` hoặc `"fr"`.
- `target` phải xuất hiện nguyên văn trong `sentence` thì mới được tô sáng.
- `ipa`, `pos`, `example` là tùy chọn.

## Lịch ôn tập (SRS)

Mỗi thẻ lưu số lần ôn, mức nhớ gần nhất, khoảng cách ôn (ngày) và thời điểm ôn tiếp theo.

| Đánh giá | Lần ôn tiếp theo |
|---|---|
| Khó | Sau 10 phút, đặt lại khoảng cách về 0 |
| Tạm | Khoảng cách × 1,6 (tối thiểu 1 ngày) |
| Dễ | Khoảng cách × 2,5 (tối thiểu 3 ngày) |

Thẻ đến hạn xuất hiện trước, thẻ mới sau. Khi hết thẻ đến hạn, bạn có thể bấm "Học tất cả thẻ" để học thêm.

## Phím tắt

| Phím | Tác dụng |
|---|---|
| Space / Enter / ↑ / ↓ | Lật thẻ |
| 1 / 2 / 3 | Đánh giá Khó / Tạm / Dễ |
| → | Bỏ qua thẻ |
| P | Nghe phát âm (câu ở mặt trước, từ ở mặt sau) |

## Dữ liệu lưu trong trình duyệt

| Khóa `localStorage` | Nội dung |
|---|---|
| `lexi.cards` | Thẻ do bạn tự thêm |
| `lexi.progress` | Tiến độ học của từng thẻ |
| `lexi.accent` | Giọng tiếng Anh đã chọn (Mỹ / Anh) |

Xóa dữ liệu trình duyệt sẽ làm mất các mục trên. Nút "Xóa tiến độ học" trong ứng dụng chỉ xóa `lexi.progress`.

## Xử lý sự cố

- **Trang trắng khi bấm đúp `index.html`:** đây là bản dự án, cần chạy bằng `npm run dev` hoặc dùng file `lexi.html`.
- **`'npm' is not recognized`:** chưa cài Node.js, hoặc cần đóng và mở lại terminal sau khi cài.
- **Không nghe được tiếng Pháp:** máy chưa có giọng đọc tiếng Pháp. Trên Windows, cài thêm trong Settings → Time & language → Speech.
