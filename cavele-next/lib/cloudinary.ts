import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary media integration (server-side).
 *
 * The secret only ever lives on the server. Browsers upload with a short-lived
 * signature produced by `signUpload()` (see app/api/cloudinary/sign) — the
 * standard secure pattern — and read images via `cldUrl()`.
 */

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const configured = Boolean(cloudName && apiKey && apiSecret);

if (configured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export function isCloudinaryConfigured(): boolean {
  return configured;
}

export { cloudinary };

/**
 * Sign upload parameters for a browser-side signed upload.
 * Returns everything the client needs to POST directly to Cloudinary.
 */
export function signUpload(params: Record<string, string | number>) {
  const timestamp = Math.round(Date.now() / 1000);
  const toSign = { timestamp, ...params };
  const signature = cloudinary.utils.api_sign_request(toSign, apiSecret as string);
  return { ...toSign, signature, apiKey, cloudName };
}

/** Build an optimized delivery URL for a stored asset. */
export function cldUrl(
  publicId: string,
  opts: { width?: number; height?: number; crop?: string } = {},
): string {
  return cloudinary.url(publicId, {
    secure: true,
    fetch_format: "auto",
    quality: "auto",
    ...opts,
  });
}
