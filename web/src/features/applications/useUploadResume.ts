import { useState } from 'react';

export function useUploadResume() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const upload = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);
    try {
      // Request presigned URL from our API
      const presignRes = await fetch('/api/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name }),
      });

      if (!presignRes.ok) {
        const data = await presignRes.json() as { error?: string };
        throw new Error(data.error || 'Failed to get upload URL');
      }

      const { uploadUrl, objectUrl } = await presignRes.json() as {
        uploadUrl: string;
        objectUrl: string;
      };

      // Upload the file directly to MinIO
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/pdf' },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error('File upload failed');
      }

      return objectUrl;
    } catch (err: any) {
      const message = err?.message || 'Upload failed';
      setUploadError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, uploadError };
}
