import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../../server/auth/middleware';
import { getPresignedUploadUrl, getObjectUrl } from '../../../server/minio';
import path from 'path';
import { randomUUID } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isAuthenticated = authMiddleware(req as any);
  if (!isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { filename } = req.body as { filename?: string };

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'filename is required' });
  }

  const ext = path.extname(filename).toLowerCase();
  if (ext !== '.pdf') {
    return res.status(400).json({ error: 'Only PDF files are allowed' });
  }

  const objectName = `resumes/${randomUUID()}${ext}`;

  try {
    const uploadUrl = await getPresignedUploadUrl(objectName);
    const objectUrl = getObjectUrl(objectName);
    return res.status(200).json({ uploadUrl, objectUrl });
  } catch (err) {
    console.error('presign error', err);
    return res.status(500).json({ error: 'Failed to generate upload URL' });
  }
}
