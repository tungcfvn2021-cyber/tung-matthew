import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient singleton — tránh tạo nhiều kết nối khi hot-reload ở dev.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Ưu tiên kết nối "unpooled/direct" (Neon) để tránh lỗi pgbouncer trên Vercel.
const dbUrl =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(dbUrl ? { datasourceUrl: dbUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
