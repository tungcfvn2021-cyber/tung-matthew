// Tự khởi tạo DB khi build trên Vercel: nếu có DATABASE_URL thì tạo bảng + seed.
// Nếu chưa có (lần deploy đầu, chưa tạo DB) -> bỏ qua, không làm hỏng build.
import { spawnSync } from "node:child_process";

const url =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL;

if (!url) {
  console.log("[prebuild-db] Chưa có DATABASE_URL — bỏ qua khởi tạo DB.");
  process.exit(0);
}

const env = { ...process.env, DATABASE_URL: url };

function run(cmd, args) {
  console.log("[prebuild-db] $", cmd, args.join(" "));
  const r = spawnSync(cmd, args, { stdio: "inherit", env, shell: true });
  return r.status === 0;
}

try {
  const pushed = run("npx", [
    "prisma",
    "db",
    "push",
    "--skip-generate",
    "--accept-data-loss",
  ]);
  if (pushed) {
    run("npx", ["tsx", "prisma/seed.ts"]);
    // Tạo admin nếu đã đặt ADMIN_EMAIL + ADMIN_PASSWORD trong env Vercel
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      run("npx", ["tsx", "scripts/create-admin.ts"]);
    }
  } else {
    console.warn("[prebuild-db] db push thất bại — build vẫn tiếp tục.");
  }
} catch (e) {
  console.error("[prebuild-db] Lỗi (không chặn build):", e);
}

// Luôn thoát 0 để không làm hỏng deploy
process.exit(0);
