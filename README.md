# E-Magazine: Đại hội XIV – 9 Nghị quyết chiến lược

**Sản phẩm học liệu số phục vụ giảng dạy, nghiên cứu lý luận chính trị**  
Khoa LLCT&KHXHNV · Trường Đại học Cảnh sát nhân dân

Sản phẩm được thiết kế theo phong cách **Light Liquid Glass (Apple style)**, tối ưu hoá tương tác sư phạm và ứng dụng hình ảnh thực tế từ các cơ quan báo chí.

---

## 🚀 Cách chạy dự án

Dự án không yêu cầu build phức tạp.

**Khuyến nghị:**
1. Cài đặt Python trên máy.
2. Mở terminal/command prompt tại thư mục dự án và chạy:
   ```bash
   python -m http.server 8091
   ```
3. Truy cập `http://localhost:8091` trên trình duyệt để trải nghiệm mượt mà nhất.

*(Có thể mở bằng VS Code Live Server hoặc cài Node.js dùng `npx serve .`)*

---

## 📁 Cấu trúc thư mục

```text
e-magazine/
├── index.html              ← Trang chính (SPA)
├── README.md
├── images/                 ← Thư mục chứa ảnh thực tế
│   ├── hero_flags...       ← Ảnh nền cờ
│   └── resolutions/        ← Ảnh riêng của 9 nghị quyết
│       ├── 57/             
│       ├── 59/             
│       └── ...
└── src/
    ├── app.js              ← Logic SPA, routing, transition
    ├── data/
    │   └── resolutions.js  ← Dữ liệu nội dung (trích dẫn, thông tin NQ)
    └── styles/
        └── main.css        ← Toàn bộ CSS (Light Theme)
```

---

## ✏️ Cách chỉnh sửa dữ liệu

Mở file **`src/data/resolutions.js`** và tìm đến object nghị quyết cần sửa. Các trường quan trọng:

- `heroImage`: Đường dẫn ảnh Hero (ví dụ: `"./images/resolutions/57/1.png"`).
- `inlineImages`: Mảng các ảnh đính kèm trong bài viết.
- `gallery`: Mảng các ảnh dưới cùng của bài viết.
- `quoteBlocks`: Các trích dẫn nổi bật của Lãnh đạo cấp cao. Định dạng:
  ```javascript
  {
    quote: "Nội dung trích dẫn...",
    speaker: "Tổng Bí thư ...",
    context: "Phát biểu tại..."
  }
  ```
- Các trường `coreIdeas`, `goals2030`, `vision2045` hiển thị nội dung chính.

**Lưu ý:** Phần "Ý nghĩa giảng dạy" và "Nguồn tham khảo" đã được ẩn khỏi giao diện để ưu tiên tập trung vào văn kiện.

---

## 🖼️ Nguồn hình ảnh và Dữ liệu

Toàn bộ dữ liệu, số liệu thống kê, và hình ảnh hiển thị trong các bài viết chi tiết được **trích xuất tự động trực tiếp từ 9 chuyên trang đặc biệt của Báo Nhân Dân**.

- Hình ảnh được lưu trữ cục bộ (`images/resolutions/`) để đảm bảo không gặp lỗi CORS hay chậm tốc độ tải (Hotlinking).
- Các trích dẫn quan trọng cũng được nhúng trực tiếp.

---

## 🔗 Hệ thống giao diện và hiệu ứng

Dự án áp dụng:
1. **Light Theme**: Nền sáng trắng ngà (`#F5F5F7`), chữ đen/xám để dễ đọc.
2. **Glassmorphism**: Các khối nội dung có hiệu ứng kính mờ (blur), độ trong suốt cao nhưng vẫn nổi bật chữ.
3. **Organic Animations**:
   - Chuyển động Mindmap: Float, hover phóng to với `cubic-bezier`.
   - Trang chi tiết: Khi chuyển trang có hiệu ứng scale/zoom mượt mà.
   - Lightbox xem ảnh toàn màn hình.

---

## 🛠️ Yêu cầu kỹ thuật

- Trình duyệt: Chrome 90+, Firefox 85+, Edge 90+, Safari 14+
- Kết nối internet để tải Google Fonts (nếu offline, dùng font dự phòng hệ thống)
- Hỗ trợ tốt trên cả Desktop, Tablet và Mobile.

---

*Phiên bản: 2.0 (Light Theme) · Cập nhật: 06/2026*
