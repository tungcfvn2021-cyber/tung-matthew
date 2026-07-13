import { prisma } from "@/shared/lib/prisma";
import { site } from "@/shared/config/site";

/** Toàn bộ ảnh Lookbook (kể cả chưa đăng) cho admin. */
export function getAdminGallery() {
  return prisma.galleryItem.findMany({
    where: { shop: { slug: site.slug } },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      title: true,
      category: true,
      beforeUrl: true,
      afterUrl: true,
      isPublished: true,
      sortOrder: true,
    },
  });
}

export type AdminGalleryItem = Awaited<
  ReturnType<typeof getAdminGallery>
>[number];
