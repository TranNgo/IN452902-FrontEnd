# Campus Life – Bài thực hành Front End

Dự án mẫu hoàn chỉnh về trang liệt kê hoạt động sinh viên, sử dụng HTML, CSS, JavaScript và mock API.

## Yêu cầu
- Node.js 22 trở lên
- VS Code hoặc trình soạn thảo tương đương
- Không cần `npm install`

## Cách chạy
1. Giải nén thư mục `campus-life-practice`.
2. Mở thư mục bằng VS Code.
3. Mở Terminal tại thư mục dự án.
4. Chạy:

```bash
node start.mjs
```

5. Mở `http://localhost:5500`.

API chạy tại `http://localhost:4000`. Thử tìm kiếm bằng các từ khoá như `sách`, `CV`, `chạy`, `âm nhạc`, `hiến máu`.

## Kiểm tra trạng thái lỗi
Dừng server bằng `Ctrl + C`, chạy `node start.mjs --fail`. Trang sẽ hiển thị thông báo lỗi tải dữ liệu. Chạy lại `node start.mjs` để dùng bình thường.

## Cấu trúc
- `site/index.html`: cấu trúc trang.
- `site/css/style.css`: giao diện responsive.
- `site/js/app.js`: tìm kiếm, gọi API và tạo card bằng DOM.
- `mock-api/`: dữ liệu và server giả lập.
- `start.mjs`: chạy trang và API.

## Nội dung đã thực hiện
- Header dùng Flexbox.
- Danh sách hoạt động dùng CSS Grid: 1 cột mobile, 2 cột tablet, 3 cột desktop.
- Form tìm kiếm gửi từ khoá lên API.
- Hiển thị ngày giờ, địa điểm, số suất còn lại.
- Dùng `createElement`, `textContent`, `setAttribute`, `replaceChildren`.
- Có xử lý lỗi khi API trả về trạng thái không thành công.
