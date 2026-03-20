import { describe, it, expect, beforeEach } from '@jest/globals';
import type { NextApiRequest, NextApiResponse } from 'next';

// Relative paths from: src/server/__tests__/
jest.mock('../auth/middleware', () => ({
  authMiddleware: jest.fn(),
}));

jest.mock('../minio', () => ({
  getPresignedUploadUrl: jest.fn(),
  getObjectUrl: jest.fn(),
}));

import { authMiddleware } from '../auth/middleware';
import { getPresignedUploadUrl, getObjectUrl } from '../minio';
import handler from '../../pages/api/upload/presign';

const mockAuthMiddleware = authMiddleware as jest.MockedFunction<typeof authMiddleware>;
const mockGetPresignedUploadUrl = getPresignedUploadUrl as jest.MockedFunction<typeof getPresignedUploadUrl>;
const mockGetObjectUrl = getObjectUrl as jest.MockedFunction<typeof getObjectUrl>;

function createMockReqRes(overrides: Partial<NextApiRequest> = {}) {
  const req = {
    method: 'POST',
    body: {},
    headers: {},
    ...overrides,
  } as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as NextApiResponse;

  return { req, res };
}

describe('POST /api/upload/presign', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    const { req, res } = createMockReqRes({ method: 'GET' });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('returns 401 when not authenticated', async () => {
    mockAuthMiddleware.mockReturnValueOnce(false);
    const { req, res } = createMockReqRes({ body: { filename: 'resume.pdf' } });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 400 when filename is missing', async () => {
    mockAuthMiddleware.mockReturnValueOnce(true);
    const { req, res } = createMockReqRes({ body: {} });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 for non-PDF files', async () => {
    mockAuthMiddleware.mockReturnValueOnce(true);
    const { req, res } = createMockReqRes({ body: { filename: 'resume.docx' } });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    const jsonCall = (res.json as jest.Mock).mock.calls[0][0] as { error: string };
    expect(jsonCall.error).toContain('PDF');
  });

  it('returns presigned URL and object URL for valid PDF', async () => {
    mockAuthMiddleware.mockReturnValueOnce(true);
    mockGetPresignedUploadUrl.mockResolvedValueOnce('https://minio/presign-url');
    mockGetObjectUrl.mockReturnValueOnce('https://minio/object-url');

    const { req, res } = createMockReqRes({ body: { filename: 'my-resume.pdf' } });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const jsonCall = (res.json as jest.Mock).mock.calls[0][0] as { uploadUrl: string; objectUrl: string };
    expect(jsonCall.uploadUrl).toBe('https://minio/presign-url');
    expect(jsonCall.objectUrl).toBe('https://minio/object-url');
  });
});
