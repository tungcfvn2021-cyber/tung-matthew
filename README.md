# Tùng Matthew Barber — Website

Website thương hiệu cá nhân barber tại Vũng Tàu. Next.js 15 · React 19 · TypeScript · Tailwind v4 · Prisma · PostgreSQL.

## Tech stack

- **Next.js 15** (App Router, RSC, Server Actions)
- **TypeScript** strict
- **Tailwind CSS v4** (design tokens trong `globals.css`)
- **Prisma + PostgreSQL** (Neon/Supabase)
- Kiến trúc: Clean Architecture + feature slices (xem `src/features` từ Sprint 2)

## Bắt đầu

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file môi trường và điền DATABASE_URL
cp .env.example .env        # (Windows: copy .env.example .env)

# 3. Sinh Prisma Client
npm run db:generate

# 4. Tạo bảng trong DB (cần DATABASE_URL hợp lệ)
npm run db:push             # hoặc: npm run db:migrate

# 5. Seed dữ liệu mẫu (shop, dịch vụ, dáng mặt)
npm run db:seed

# 6. Chạy dev
npm run dev                 # http://localhost:3000
```

## Scripts

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production (kèm `prisma generate`) |
| `npm run typecheck` | Kiểm tra kiểu TypeScript |
| `npm run lint` | ESLint |
| `npm run db:push` | Đồng bộ schema -> DB (dev nhanh) |
| `npm run db:migrate` | Tạo migration |
| `npm run db:seed` | Seed dữ liệu |
| `npm run db:studio` | Prisma Studio (xem DB) |

## Lộ trình Sprint

- **S1 — Nền móng** ✅ setup, Prisma schema (14 models), design tokens, seed
- **S2 — Trang chủ + Hero** Nav, Footer, Sticky bar, Hero đầy đủ
- **S3 — Dịch vụ + Booking** form 3 chạm + Server Action + Zalo/email
- **S4 — Admin + SEO** Better Auth, dashboard, Schema/sitemap/metadata
- **S5 — Lookbook + /bio + Local SEO** gallery, landing từ khóa, Pixel

## Test local không cần Vercel DB

Dự án kèm một PostgreSQL nhúng (chạy trong Node, không cần cài đặt) để test offline:

```bash
# Terminal 1: khởi động DB local (port 5433, dữ liệu lưu ở .localdb)
npm run db:local

# Terminal 2: trỏ DATABASE_URL vào DB local rồi push + seed + test
#   PowerShell:
$env:DATABASE_URL="postgresql://postgres:postgres@localhost:5433/tung_matthew"
$env:BETTER_AUTH_SECRET="dev-secret-doi-thanh-chuoi-ngau-nhien-dai"
npm run db:push
npm run db:seed
npm run admin:create     # tạo admin@tungmatthew.com / Barber@12345 (OWNER)
npm run test:booking     # integration test luồng đặt lịch
npm run dev              # /admin để đăng nhập quản trị
```

> Đổi mật khẩu admin khi chạy thật: đặt `ADMIN_EMAIL` / `ADMIN_PASSWORD` trước khi chạy `admin:create`.

Production dùng **Vercel Postgres** (đặt `DATABASE_URL` thật trong `.env` / Vercel env).

## Ghi chú

- Thương hiệu cam kết **Dark Mode** làm bản sắc chính; theme sáng bổ sung sau.
- `src/shared/config/site.ts` là **nguồn sự thật NAP** (tên/địa chỉ/SĐT) — đổi 1 chỗ, đồng bộ toàn site.
- Biến môi trường được xác thực fail-fast tại `src/shared/config/env.ts`.
