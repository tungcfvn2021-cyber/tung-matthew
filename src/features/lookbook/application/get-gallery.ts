import { prisma } from "@/shared/lib/prisma";
import { site } from "@/shared/config/site";

/** Ảnh Lookbook đã đăng (có consent). */
export function getGallery() {
  return prisma.galleryItem.findMany({
    where: { isPublished: true, hasConsent: true, shop: { slug: site.slug } },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      title: true,
      category: true,
      beforeUrl: true,
      afterUrl: true,
      tiktokUrl: true,
    },
  });
}

export type GalleryItemDTO = Awaited<ReturnType<typeof getGallery>>[number];
