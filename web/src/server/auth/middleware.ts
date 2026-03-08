import { NextApiRequest } from "next";
import { verifyToken, TokenPayload } from "./jwt";
import { COOKIE_NAME } from "./constants";

export interface AuthRequest extends NextApiRequest {
  user?: TokenPayload;
}

export function extractTokenFromCookie(req: NextApiRequest): string | null {
  const cookieHeader = req.headers.cookie || "";
  const cookies = cookieHeader.split("; ").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  return cookies[COOKIE_NAME] || null;
}

export function authMiddleware(req: AuthRequest): boolean {
  const token = extractTokenFromCookie(req);

  if (!token) {
    return false;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return false;
  }

  req.user = payload;
  return true;
}
