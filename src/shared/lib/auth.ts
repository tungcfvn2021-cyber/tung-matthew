import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/shared/lib/prisma";

const trustedOrigins = [
  "http://localhost:3000",
  "https://www.tungmatthew.pro.vn",
  "https://tungmatthew.pro.vn",
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined,
].filter((v): v is string => Boolean(v));

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    // Admin do OWNER tạo — không mở đăng ký công khai
    disableSignUp: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "ADMIN",
        input: false,
      },
      shopId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 ngày
    updateAge: 60 * 60 * 24, // gia hạn mỗi ngày
  },
  // nextCookies phải là plugin cuối
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
