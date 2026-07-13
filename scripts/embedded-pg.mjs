// Dev-only: khởi động một PostgreSQL nhúng (thật) để test local.
// KHÔNG dùng cho production — production dùng Vercel Postgres.
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";
import path from "node:path";

const dir = path.resolve(".localdb");
const pg = new EmbeddedPostgres({
  databaseDir: dir,
  user: "postgres",
  password: "postgres",
  port: 5433,
  persistent: true,
  // UTF8 để lưu được tiếng Việt (locale C: không phụ thuộc encoding OS)
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
});

const initialized = existsSync(path.join(dir, "PG_VERSION"));
if (!initialized) {
  console.log("→ Khởi tạo cluster PostgreSQL...");
  await pg.initialise();
}
await pg.start();
try {
  await pg.createDatabase("tung_matthew");
  console.log("→ Đã tạo database tung_matthew");
} catch {
  console.log("→ Database tung_matthew đã tồn tại");
}
console.log("READY postgres://postgres:postgres@localhost:5433/tung_matthew");

process.stdin.resume();
setInterval(() => {}, 1 << 30);

async function shutdown() {
  try {
    await pg.stop();
  } catch {}
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
