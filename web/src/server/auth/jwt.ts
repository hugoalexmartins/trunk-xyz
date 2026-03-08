import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "./constants";

/**
 * JWT token payload structure
 * sub: Subject (user ID)
 * email: User email address
 * iat: Issued at timestamp
 * exp: Expiration timestamp
 */
export interface TokenPayload {
  sub: string; // user ID
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Creates a signed JWT token for the given user
 * Token is valid for JWT_EXPIRY duration (default: 24 hours)
 */
export function createToken(userId: string, email: string): string {
  return jwt.sign(
    {
      sub: userId,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRY,
    }
  );
}

/**
 * Verifies and decodes a JWT token
 * Returns the token payload if valid, null if invalid or expired
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return payload;
  } catch (error) {
    return null;
  }
}
