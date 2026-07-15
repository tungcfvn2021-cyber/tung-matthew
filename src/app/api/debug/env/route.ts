import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

/**
 * Chẩn đoán tạm thời: chỉ trả về CÓ/KHÔNG của biến môi trường (không lộ giá trị).
 * Sẽ xoá sau khi xử lý xong vấn đề Blob.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  // Kiểm tra bảng lưu ảnh đã được tạo trong DB chưa
  let imageTable: string;
  try {
    const n = await prisma.imageAsset.count();
    imageTable = `OK (${n} ảnh)`;
  } catch (e) {
    imageTable = "LỖI: " + (e as Error).message.split("\n")[0];
  }

  return NextResponse.json({
    imageTable,
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    env: process.env.VERCEL_ENV ?? null,
    hasBlobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasDatabaseUnpooled: Boolean(process.env.DATABASE_URL_UNPOOLED),
    hasAuthSecret: Boolean(process.env.BETTER_AUTH_SECRET),
    blobLikeKeys: Object.keys(process.env).filter((k) =>
      k.toUpperCase().includes("BLOB"),
    ),
    hasOidcToken: Boolean(process.env.VERCEL_OIDC_TOKEN),
    vercelKeys: Object.keys(process.env)
      .filter((k) => k.toUpperCase().startsWith("VERCEL"))
      .sort(),
  });
}
