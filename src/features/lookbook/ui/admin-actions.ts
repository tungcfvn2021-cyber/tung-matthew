"use server";

import { revalidatePath } from "next/cache";
import type { ServiceCategory } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import { getSession } from "@/shared/lib/auth-guard";
import { site } from "@/shared/config/site";
import { signUpload, type UploadSignature } from "@/shared/lib/cloudinary";
import { ok, fail, ErrorCode, type ActionResult } from "@/shared/types/action";

async function assertAdmin(): Promise<ActionResult<never> | null> {
  const session = await getSession();
  return session ? null : fail(ErrorCode.UNAUTHORIZED, "Bạn cần đăng nhập.");
}

/** Ký chữ ký cho upload Cloudinary trực tiếp từ trình duyệt. */
export async function getUploadSignature(): Promise<
  ActionResult<UploadSignature>
> {
  const denied = await assertAdmin();
  if (denied) return denied;

  const sig = signUpload();
  if (!sig) {
    return fail(
      ErrorCode.INTERNAL,
      "Chưa cấu hình Cloudinary. Thêm CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET vào biến môi trường.",
    );
  }
  return ok(sig);
}

export async function createGalleryItem(input: {
  afterUrl: string;
  title?: string;
  category?: string;
  beforeUrl?: string;
}): Promise<ActionResult<{ id: string }>> {
  const denied = await assertAdmin();
  if (denied) return denied;

  if (!input.afterUrl?.trim()) {
    return fail(ErrorCode.VALIDATION, "Thiếu ảnh (URL hoặc tải lên).");
  }

  const shop = await prisma.shop.findUnique({
    where: { slug: site.slug },
    select: { id: true },
  });
  if (!shop) return fail(ErrorCode.NOT_FOUND, "Không tìm thấy shop.");

  const max = await prisma.galleryItem.aggregate({
    _max: { sortOrder: true },
    where: { shopId: shop.id },
  });

  const item = await prisma.galleryItem.create({
    data: {
      shopId: shop.id,
      afterUrl: input.afterUrl.trim(),
      beforeUrl: input.beforeUrl?.trim() || null,
      title: input.title?.trim() || null,
      category: input.category ? (input.category as ServiceCategory) : null,
      sortOrder: (max._max.sortOrder ?? 0) + 1,
    },
    select: { id: true },
  });

  revalidatePath("/admin/lookbook");
  revalidatePath("/lookbook");
  return ok({ id: item.id });
}

export async function deleteGalleryItem(
  id: string,
): Promise<ActionResult<true>> {
  const denied = await assertAdmin();
  if (denied) return denied;

  await prisma.galleryItem.deleteMany({
    where: { id, shop: { slug: site.slug } },
  });
  revalidatePath("/admin/lookbook");
  revalidatePath("/lookbook");
  return ok(true);
}

export async function toggleGalleryPublish(
  id: string,
  isPublished: boolean,
): Promise<ActionResult<true>> {
  const denied = await assertAdmin();
  if (denied) return denied;

  await prisma.galleryItem.updateMany({
    where: { id, shop: { slug: site.slug } },
    data: { isPublished },
  });
  revalidatePath("/admin/lookbook");
  revalidatePath("/lookbook");
  return ok(true);
}
