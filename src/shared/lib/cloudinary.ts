import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export const CLOUDINARY_FOLDER = "tung-matthew/lookbook";

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && apiKey && apiSecret);
}

export type UploadSignature = {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
};

/** Ký tham số cho upload trực tiếp từ trình duyệt (không lộ API secret). */
export function signUpload(): UploadSignature | null {
  if (!cloudName || !apiKey || !apiSecret) return null;
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: CLOUDINARY_FOLDER },
    apiSecret,
  );
  return { timestamp, signature, apiKey, cloudName, folder: CLOUDINARY_FOLDER };
}
