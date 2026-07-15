import { NextResponse } from "next/server";

/**
 * Chẩn đoán tạm thời: chỉ trả về CÓ/KHÔNG của biến môi trường (không lộ giá trị).
 * Sẽ xoá sau khi xử lý xong vấn đề Blob.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
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
