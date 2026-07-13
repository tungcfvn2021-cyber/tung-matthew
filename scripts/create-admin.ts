// Tạo tài khoản admin đầu tiên (OWNER). Dùng instance Better Auth riêng
// (không có nextCookies) để chạy được ngoài ngữ cảnh Next.
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: { type: "string", input: false, defaultValue: "ADMIN" },
      shopId: { type: "string", required: false, input: false },
    },
  },
});

const email = process.env.ADMIN_EMAIL ?? "admin@tungmatthew.com";
const password = process.env.ADMIN_PASSWORD ?? "Barber@12345";
const name = process.env.ADMIN_NAME ?? "Tùng Matthew";

async function main() {
  try {
    await auth.api.signUpEmail({ body: { email, password, name } });
    console.log(`✅ Đã tạo tài khoản: ${email}`);
  } catch (e) {
    console.log(
      `ℹ️  Không tạo mới (có thể đã tồn tại): ${(e as Error).message}`,
    );
  }

  const shop = await prisma.shop.findUnique({
    where: { slug: "tung-matthew" },
    select: { id: true },
  });
  await prisma.user.update({
    where: { email },
    data: { role: "OWNER", shopId: shop?.id ?? null, emailVerified: true },
  });
  console.log(`✅ Đã gán quyền OWNER cho ${email}`);
}

main()
  .catch((e) => {
    console.error("❌ Lỗi tạo admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
