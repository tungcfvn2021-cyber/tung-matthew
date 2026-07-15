import { prisma } from "@/shared/lib/prisma";

/** Phục vụ ảnh lưu trong DB: /img/<id> */
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const img = await prisma.imageAsset.findUnique({
    where: { id },
    select: { data: true, contentType: true },
  });
  if (!img) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(img.data), {
    headers: {
      "Content-Type": img.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
