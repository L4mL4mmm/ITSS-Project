# HƯỚNG DẪN CÀI ĐẶT VÀ SỬ DỤNG ỨNG DỤNG SMARTFOOD

Hệ thống đi chợ tiện lợi là hệ thống hỗ trợ quản lý thực phẩm thông minh. Hướng dẫn này sẽ giúp bạn tự cài đặt và chạy hệ thống trên máy tính cá nhân từ mã nguồn giải nén.

---

## 📋 YÊU CẦU TRƯỚC KHI CÀI ĐẶT

Máy tính của bạn cần được cài đặt sẵn:
1.  **Node.js** (Phiên bản LTS từ 18.x trở lên). Tải tại: [nodejs.org](https://nodejs.org/).
2.  **MongoDB Community Server** (Tải tại: [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)). Đảm bảo dịch vụ MongoDB đang chạy cục bộ trên máy trước khi khởi động dự án.

---

## 🚀 CÁC BƯỚC CÀI ĐẶT CHI TIẾT

### Bước 1: Chuẩn bị thư mục mã nguồn
1.  Giải nén tệp tin mã nguồn tải về.
2.  Đổi tên thư mục giải nén thành `SmartFood` (hoặc di chuyển các tệp vào thư mục có tên `SmartFood`).
3.  Mở **Terminal** (trên macOS/Linux) hoặc **Command Prompt** (trên Windows) và di chuyển vào thư mục dự án:
    ```bash
    cd SmartFood
    ```

### Bước 2: Cấu hình và chạy phần Backend (Server)
1.  Di chuyển vào thư mục backend và cài đặt thư viện:
    ```bash
    cd smartfood.server
    npm install
    ```
2.  Tạo một tệp tin tên là `.env` trong thư mục `smartfood.server` và sao chép nội dung cấu hình sau vào tệp tin (nếu tệp đã tồn tại, hãy kiểm tra các giá trị cấu hình tương tự):
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/smartfood
    JWT_SECRET=smartfood_jwt_secret_key_2026
    FRONTEND_URL=http://localhost:8080
    ```
    *(Các biến trên cấu hình cơ sở dữ liệu kết nối tới MongoDB cục bộ và cổng kết nối API mặc định cho Frontend).*
3.  Khởi động server backend bằng lệnh:
    ```bash
    npm run dev
    ```
    *(Lúc này server sẽ khởi chạy thành công tại địa chỉ: **http://localhost:5000**).*

### Bước 3: Cài đặt và chạy phần Frontend (Giao diện người dùng)
1.  Mở một cửa sổ Terminal khác và tiến hành di chuyển vào thư mục frontend để cài đặt thư viện:
    ```bash
    cd SmartFood/smartfood.frontend
    npm install
    ```
2.  Khởi động giao diện người dùng bằng lệnh:
    ```bash
    npm run dev
    ```
    *(Giao diện ứng dụng sẽ xuất hiện tại địa chỉ mặc định: **http://localhost:8080**).*

---

## 🔑 TÀI KHOẢN ĐĂNG NHẬP TRẢI NGHIỆM

Bạn có thể sử dụng các tài khoản thử nghiệm sau để đăng nhập vào hệ thống:

| Vai trò | Email đăng nhập | Mật khẩu |
| :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@gmail.com` | `123456` |
| **Trưởng nhóm (Người dùng 1)** | `me@gmail.com` | `123456` |
| **Thành viên (Người dùng 2)** | `bo@gmail.com` | `123456` |

> ⚠️ **Lưu ý:** Đây là tài khoản dùng thử. Vui lòng không đổi mật khẩu hoặc xóa dữ liệu nếu không thực sự cần thiết.

---

Hoàn tất! Bạn đã cài đặt thành công hệ thống SmartFood. Nếu gặp lỗi hoặc có đóng góp ý kiến, hãy gửi phản hồi tại mục Issues của repository: https://github.com/L4mL4mmm/ITSS-Project.git

Chúc bạn có trải nghiệm sử dụng vui vẻ!
