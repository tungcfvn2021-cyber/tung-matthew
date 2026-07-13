# Deploy lên Vercel + tên miền

## 1. Đưa code lên GitHub

```bash
# Tạo repo mới trên github.com (ví dụ: tung-matthew), rồi:
git remote add origin https://github.com/<user>/tung-matthew.git
git branch -M main
git push -u origin main
```

## 2. Import vào Vercel

1. https://vercel.com/new → chọn repo `tung-matthew` → **Import**.
2. Framework tự nhận là **Next.js**. Giữ nguyên Build Command mặc định (`npm run build`).
3. **Chưa deploy vội** — thêm biến môi trường ở bước 3 trước.

## 3. Tạo Database + biến môi trường

**Database:** Vercel → project → tab **Storage** → **Create Database** → **Postgres** (Neon) → Region **Singapore**. Kết nối vào project — Vercel tự thêm `DATABASE_URL`.

**Thêm các biến môi trường** (Settings → Environment Variables):

| Biến | Giá trị |
|---|---|
| `DATABASE_URL` | (Vercel Postgres tự thêm) |
| `BETTER_AUTH_SECRET` | Chuỗi ngẫu nhiên ≥ 32 ký tự (tạo: `openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | `https://tungmatthew.com` (tên miền của bạn) |
| `NEXT_PUBLIC_SITE_URL` | `https://tungmatthew.com` |

Tuỳ chọn (bật khi có): `CLOUDINARY_*`, `ZALO_*`, `RESEND_API_KEY`, `GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID`.

## 4. Khởi tạo dữ liệu (chạy 1 lần, từ máy bạn)

Lấy chuỗi `DATABASE_URL` của Neon (tab Storage → Connect), rồi:

```bash
# PowerShell
$env:DATABASE_URL="<chuỗi Neon>"
$env:BETTER_AUTH_SECRET="<cùng secret như trên Vercel>"
npm run db:push        # tạo bảng
npm run db:seed        # dịch vụ, giờ mở, gallery
$env:ADMIN_EMAIL="ban@email.com"; $env:ADMIN_PASSWORD="<mật khẩu mạnh>"
npm run admin:create   # tạo tài khoản quản trị
```

## 5. Deploy + gắn tên miền

1. Vercel → **Deploy**. Chờ build xong → có URL `*.vercel.app`.
2. Settings → **Domains** → thêm tên miền của bạn → làm theo hướng dẫn trỏ DNS (A/CNAME).
3. Cập nhật `BETTER_AUTH_URL` và `NEXT_PUBLIC_SITE_URL` sang tên miền chính thức → **Redeploy**.

## 6. Sau khi live

- **Google Business Profile**: tạo/nhận hồ sơ, điền đúng NAP **khớp với** `src/shared/config/site.ts`.
- Cập nhật NAP + socials thật trong `src/shared/config/site.ts` rồi commit + push (Vercel tự deploy).
- Google Search Console: submit `https://tungmatthew.com/sitemap.xml`.
- Đăng link `https://tungmatthew.com/bio` lên TikTok/Instagram.

## Ghi chú kỹ thuật

- Khi traffic lớn: chuyển `DATABASE_URL` sang chuỗi **pooled** của Neon và thêm `directUrl` (unpooled) vào `schema.prisma` cho migration.
- `BETTER_AUTH_SECRET` **bắt buộc** ở production (nếu thiếu, đăng nhập admin sẽ lỗi).
