import * as Minio from 'minio';

const PRESIGN_EXPIRY_SECONDS = 15 * 60; // 15 minutes

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000', 10),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

export const MINIO_BUCKET = process.env.MINIO_BUCKET_NAME || 'trunk-applications';

export async function getPresignedUploadUrl(objectName: string): Promise<string> {
  return minioClient.presignedPutObject(MINIO_BUCKET, objectName, PRESIGN_EXPIRY_SECONDS);
}

export function getObjectUrl(objectName: string): string {
  const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
  const port = process.env.MINIO_PORT || '9000';
  return `http://${endpoint}:${port}/${MINIO_BUCKET}/${objectName}`;
}
