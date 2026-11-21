# Lexi – Học từ vựng Anh · Pháp theo câu

Ứng dụng web học từ vựng song ngữ Anh – Pháp theo ngữ cảnh câu, kết hợp flashcard lật thẻ và ôn tập lặp lại ngắt quãng (SRS đơn giản). Toàn bộ dữ liệu học được lưu trong trình duyệt (`localStorage`), không cần tài khoản hay máy chủ.

## Tính năng

- Thẻ hiển thị câu mẫu (Tiếng Anh hoặc Tiếng Pháp), lật thẻ để xem nghĩa Tiếng Việt.
- Từ mục tiêu được tô sáng trong câu. Rê chuột hoặc chạm vào từ để xem nghĩa, phiên âm, loại từ và ví dụ.
- Nghe phát âm bằng Web Speech API (`en-US`, `en-GB`, `fr-FR`). Nếu trình duyệt không hỗ trợ, nút nghe bị vô hiệu hóa và ứng dụng vẫn dùng bình thường.
- Đánh giá mức nhớ Khó / Tạm / Dễ để tự động lên lịch ôn lại.
- Lọc nhanh: Tất cả / Chỉ Tiếng Anh / Chỉ Tiếng Pháp.
- Thêm thẻ mới ngay trong ứng dụng và lưu vào `localStorage`.
- **Tab “Gốc từ & Ghép từ”**: tra cứu 18 gốc từ, tiền tố, hậu tố thông dụng của Tiếng Anh và Tiếng Pháp, có công thức ghép từ, từ phái sinh, nghe phát âm và thanh tìm kiếm theo thời gian thực.
- Từ trong flashcard có chứa gốc từ sẽ hiện nút “🌱 Xem gốc từ” để nhảy thẳng tới cách ghép từ đó.

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

Dự án đã cấu hình sẵn `vite-plugin-singlefile`: sau `npm run build`, file `dist/index.html` là bản chạy độc lập, bấm đúp là mở được.

## Cấu trúc thư mục

```
src/
├─ main.tsx, index.css, App.tsx, types.ts
├─ data/
│  ├─ cards.json          # dữ liệu thẻ flashcard
│  └─ wordRoots.json      # dữ liệu gốc từ, tiền tố, hậu tố
├─ lib/
│  ├─ srs.ts              # thuật toán ôn tập ngắt quãng
│  ├─ roots.ts            # tìm kiếm gốc từ, nhận diện gốc từ của thẻ
│  ├─ speech.ts           # phát âm (speechSynthesis)
│  └─ storage.ts          # đọc/ghi localStorage
└─ components/
   ├─ Flashcard.tsx       # thẻ lật, highlight từ mục tiêu
   ├─ RootsPage.tsx       # tab Gốc từ & Ghép từ (tìm kiếm, thẻ gốc từ)
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

## Tab “Gốc từ & Ghép từ”

- **Tìm kiếm**: gõ gốc từ (`spect`, `port`, `bio`), tiền tố/hậu tố (`anti-`, `-tion`), nghĩa Tiếng Việt (`nhìn`, `viết`, có hoặc không dấu), hoặc một từ bất kỳ (`inspect` hiện cấu tạo; `inspection` được tách ra chứa `spect`). Nhấn `/` để nhảy nhanh tới ô tìm kiếm.
- **Bộ lọc** Tất cả / EN / FR dùng chung với tab Flashcard.
- Mỗi mục gồm: gốc/tiền tố/hậu tố, nguồn gốc và nghĩa cốt lõi, công thức ghép từ (có bản EN và FR đối chiếu), 3–5 từ phái sinh mỗi ngôn ngữ kèm nút nghe.
- **Liên kết từ Flashcard**: nếu từ mục tiêu của thẻ có trong kho gốc từ, thẻ hiện nút “🌱 Xem gốc từ”. Với hậu tố, thẻ nhận diện thêm các từ dài kết thúc bằng hậu tố đó (vd `lentement` → `-ment`). Gốc từ thường không được nhận diện theo đoạn chữ để tránh gán nhầm (vd `airport` không phải gốc `port`).

### Thêm dữ liệu gốc từ

Thêm một object vào `src/data/wordRoots.json`:

```json
{
  "id": "vis", "kind": "root", "langs": ["en", "fr"],
  "form": { "en": "-vis- / -vid-", "fr": "-vis- / -voir" },
  "origin": "Gốc Latin “videre”", "meaning": "thấy, nhìn",
  "note": "Ghi chú tùy chọn.",
  "frag": ["vis", "vid"],
  "formula": {
    "en": { "parts": [["re-", "lại"], ["view", "xem"]], "result": "review", "meaning": "xem lại" },
    "fr": { "parts": [["re-", "lại"], ["voir", "thấy"]], "result": "revoir", "meaning": "xem lại" }
  },
  "words": {
    "en": [["visible", "vis + -ible", "nhìn thấy được"]],
    "fr": [["visible", "vis + -ible", "nhìn thấy được"]]
  }
}
```

- `kind`: `root` (gốc từ), `prefix` (tiền tố) hoặc `suffix` (hậu tố).
- `langs`: mục chỉ có một ngôn ngữ thì ghi một phần tử (vd `["en"]`) và chỉ khai báo `formula`, `words` cho ngôn ngữ đó.
- `frag`: các đoạn không dấu, chữ thường, dùng để nhận diện từ bất kỳ khi tra cứu. Để `[]` nếu đoạn quá ngắn hoặc dễ khớp nhầm.
- Mỗi từ phái sinh là bộ ba `[từ, cấu tạo, nghĩa Việt]`. Mỗi phần của công thức là cặp `[phần, nghĩa Việt]`.

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
| / | (Tab Gốc từ) Nhảy tới ô tìm kiếm |

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
