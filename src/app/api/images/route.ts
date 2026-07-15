import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { getSession } from "@/shared/lib/auth-guard";

/** Nhận ảnh từ admin, lưu vào DB, trả về URL /img/<id>. */
export const dynamic = "force-dynamic";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Bạn cần đăng nhập để tải ảnh." },
      { status: 401 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Thiếu file ảnh." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Chỉ nhận ảnh JPG, PNG hoặc WEBP." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Ảnh quá lớn (tối đa 4MB sau khi nén)." },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const img = await prisma.imageAsset.create({
    data: { data: bytes, contentType: file.type },
    select: { id: true },
  });

  return NextResponse.json({ url: `/img/${img.id}` });
}
