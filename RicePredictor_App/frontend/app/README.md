

## Frontend React Application

### Mô tả

Ứng dụng frontend React kết nối với backend Flask qua API, sử dụng Axios để gọi các endpoint.

---

### Yêu cầu

- Node.js (phiên bản >= 16)
- npm hoặc yarn
- Backend Flask đang chạy trên `http://localhost:5000`

---

### Cài đặt

1. Clone repo frontend (nếu chưa)

```bash
git clone <url-repo-frontend>
cd <thư-mục-frontend>
```

2. Cài đặt thư viện 

```bash
npm install
# hoặc
yarn install
```

3. Cấu hình URL kết nối Backend

Vào file frontend/app/.env để tùy chỉnh địa chỉ backend

```ts
// Đường dẫn máy chủ backend
VITE_API_URL=http://localhost:5000/api/v1/
```

4. Khởi động web
```bash
npm run dev
```
