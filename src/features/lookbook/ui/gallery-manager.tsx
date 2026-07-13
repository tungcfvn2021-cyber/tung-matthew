"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUploadSignature,
  createGalleryItem,
  deleteGalleryItem,
  toggleGalleryPublish,
} from "@/features/lookbook/ui/admin-actions";
import { CATEGORY_ORDER, categoryLabel } from "@/features/services/domain/category";

type Item = {
  id: string;
  title: string | null;
  category: string | null;
  beforeUrl: string | null;
  afterUrl: string;
  isPublished: boolean;
};

export function GalleryManager({ items }: { items: Item[] }) {
  const router = useRouter();
  const [afterUrl, setAfterUrl] = useState("");
  const [beforeUrl, setBeforeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const sig = await getUploadSignature();
    if (!sig.ok) {
      setError(sig.error.message);
      setUploading(false);
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", sig.data.apiKey);
    fd.append("timestamp", String(sig.data.timestamp));
    fd.append("signature", sig.data.signature);
    fd.append("folder", sig.data.folder);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.data.cloudName}/image/upload`,
        { method: "POST", body: fd },
      );
      const data = await res.json();
      if (data.secure_url) setAfterUrl(data.secure_url);
      else setError("Tải ảnh thất bại.");
    } catch {
      setError("Không kết nối được Cloudinary.");
    }
    setUploading(false);
  }

  async function add() {
    setBusy(true);
    setError(null);
    const res = await createGalleryItem({
      afterUrl,
      beforeUrl: beforeUrl || undefined,
      title: title || undefined,
      category: category || undefined,
    });
    setBusy(false);
    if (res.ok) {
      setAfterUrl("");
      setBeforeUrl("");
      setTitle("");
      setCategory("");
      router.refresh();
    } else setError(res.error.message);
  }

  async function remove(id: string) {
    if (!confirm("Xoá ảnh này?")) return;
    await deleteGalleryItem(id);
    router.refresh();
  }

  async function toggle(id: string, pub: boolean) {
    await toggleGalleryPublish(id, pub);
    router.refresh();
  }

  return (
    <div>
      {/* Thêm ảnh */}
      <div className="rounded-xl border border-line bg-ink-2 p-5">
        <h2 className="mb-4 font-display text-lg font-semibold">Thêm ảnh</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-[2px] border border-line-gold px-4 py-2 text-sm text-paper transition-colors hover:border-gold">
              {uploading ? "Đang tải…" : "Tải ảnh lên"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <span className="text-sm text-smoke-2">hoặc dán URL:</span>
            <input
              value={afterUrl}
              onChange={(e) => setAfterUrl(e.target.value)}
              placeholder="https://…/anh.jpg"
              className="min-w-[220px] flex-1 rounded-md border border-line bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold"
            />
          </div>

          {afterUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={afterUrl}
              alt="Xem trước"
              className="h-40 w-32 rounded-md object-cover"
            />
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tiêu đề (vd: Low Fade)"
              className="rounded-md border border-line bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-line bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold"
            >
              <option value="">— Danh mục —</option>
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>
                  {categoryLabel(c)}
                </option>
              ))}
            </select>
            <input
              value={beforeUrl}
              onChange={(e) => setBeforeUrl(e.target.value)}
              placeholder="URL ảnh 'trước' (tuỳ chọn)"
              className="rounded-md border border-line bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold"
            />
          </div>

          {error && <p className="text-sm text-gold">{error}</p>}

          <button
            type="button"
            onClick={add}
            disabled={busy || !afterUrl}
            className="self-start rounded-[2px] bg-gold px-6 py-2.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-50"
          >
            {busy ? "Đang lưu…" : "Thêm vào Lookbook"}
          </button>
        </div>
      </div>

      {/* Danh sách */}
      <h2 className="mb-4 mt-10 font-display text-lg font-semibold">
        Ảnh hiện có ({items.length})
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-smoke">Chưa có ảnh nào.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-line bg-ink-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.afterUrl}
                alt={item.title ?? ""}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="p-3">
                <div className="truncate text-sm font-medium text-paper">
                  {item.title ?? "Không tiêu đề"}
                </div>
                <div className="text-xs text-smoke-2">
                  {item.category ? categoryLabel(item.category) : "—"}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggle(item.id, !item.isPublished)}
                    className="flex-1 rounded-[2px] border border-line px-2 py-1.5 text-xs text-paper transition-colors hover:border-line-gold"
                  >
                    {item.isPublished ? "Đang hiện" : "Đang ẩn"}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="rounded-[2px] border border-line px-2 py-1.5 text-xs text-smoke transition-colors hover:text-gold"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
