import { getAdminGallery } from "@/features/lookbook/application/get-admin-gallery";
import { GalleryManager } from "@/features/lookbook/ui/gallery-manager";

export const dynamic = "force-dynamic";

export default async function AdminLookbookPage() {
  const items = await getAdminGallery();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold">Lookbook</h1>
      <GalleryManager items={items} />
    </div>
  );
}
