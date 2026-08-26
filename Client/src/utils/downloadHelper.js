/**
 * Downloads a media file directly without opening a new tab (even for cross-origin URLs like Cloudinary).
 * @param {string} url - The URL of the image or video to download
 * @param {string} filename
 */
export const downloadDirectMedia = async (url, filename = "download") => {
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    // Determine extension from content-type or URL
    let ext = "";
    if (blob.type) {
      if (blob.type.includes("jpeg") || blob.type.includes("jpg")) ext = ".jpg";
      else if (blob.type.includes("png")) ext = ".png";
      else if (blob.type.includes("webp")) ext = ".webp";
      else if (blob.type.includes("mp4")) ext = ".mp4";
      else if (blob.type.includes("webm")) ext = ".webm";
      else if (blob.type.includes("quicktime")) ext = ".mov";
    }

    if (!ext) {
      const match = url.split("?")[0].split("#")[0].match(/\.([a-zA-Z0-9]+)$/);
      ext = match ? `.${match[1]}` : ".jpg";
    }

    const cleanFilename = filename.replace(/\.[^/.]+$/, "");
    const finalFilename = `${cleanFilename}${ext}`;

    const link = document.createElement("a");
    link.style.display = "none";
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.warn("Direct blob download failed, using Cloudinary attachment fallback:", error);

    // Fallback: If Cloudinary, inject fl_attachment transformation to force download headers
    let downloadUrl = url;
    if (url.includes("cloudinary.com") && url.includes("/upload/")) {
      downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");
    }

    const link = document.createElement("a");
    link.style.display = "none";
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  }
};
