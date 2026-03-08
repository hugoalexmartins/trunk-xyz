import { createToken, verifyToken } from "../jwt";
import jwt from "jsonwebtoken";

describe("JWT Token Management", () => {
  const testUserId = "test-user-123";
  const testEmail = "test@example.com";

  describe("createToken", () => {
    it("should create a valid JWT token", () => {
      const token = createToken(testUserId, testEmail);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // JWT has 3 parts
    });

    it("should include user ID and email in the payload", () => {
      const token = createToken(testUserId, testEmail);
      const decoded = jwt.decode(token) as any;

      expect(decoded.sub).toBe(testUserId);
      expect(decoded.email).toBe(testEmail);
    });

    it("should set expiration time", () => {
      const token = createToken(testUserId, testEmail);
      const decoded = jwt.decode(token) as any;

      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(decoded.iat);
    });

    it("should handle different user IDs", () => {
      const userId1 = "user-1";
      const userId2 = "user-2";
      const token1 = createToken(userId1, testEmail);
      const token2 = createToken(userId2, testEmail);

      expect(token1).not.toBe(token2);

      const decoded1 = jwt.decode(token1) as any;
      const decoded2 = jwt.decode(token2) as any;

      expect(decoded1.sub).toBe(userId1);
      expect(decoded2.sub).toBe(userId2);
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid token", () => {
      const token = createToken(testUserId, testEmail);
      const payload = verifyToken(token);

      expect(payload).not.toBeNull();
      expect(payload?.sub).toBe(testUserId);
      expect(payload?.email).toBe(testEmail);
    });

    it("should return null for an invalid token", () => {
      const invalidToken = "invalid.token.here";
      const payload = verifyToken(invalidToken);

      expect(payload).toBeNull();
    });

    it("should return null for a malformed token", () => {
      const malformedToken = "not-a-token";
      const payload = verifyToken(malformedToken);

      expect(payload).toBeNull();
    });

    it("should return null for an expired token", () => {
      // Create a token with expired signature
      const expiredToken = jwt.sign(
        { sub: testUserId, email: testEmail },
        "wrong-secret",
        { expiresIn: "1h" },
      );
      const payload = verifyToken(expiredToken);

      expect(payload).toBeNull();
    });

    it("should extract all payload fields", () => {
      const token = createToken(testUserId, testEmail);
      const payload = verifyToken(token);

      expect(payload).toBeDefined();
      expect(payload?.sub).toBe(testUserId);
      expect(payload?.email).toBe(testEmail);
      expect(payload?.iat).toBeDefined();
      expect(payload?.exp).toBeDefined();
    });

    it("should work with special characters in email", () => {
      const specialEmail = "user+test@sub.example.com";
      const token = createToken(testUserId, specialEmail);
      const payload = verifyToken(token);

      expect(payload?.email).toBe(specialEmail);
    });
  });

  describe("Token Round Trip", () => {
    it("should create and verify a token in sequence", () => {
      const token = createToken(testUserId, testEmail);
      const payload = verifyToken(token);

      expect(payload).not.toBeNull();
      expect(payload?.sub).toBe(testUserId);
      expect(payload?.email).toBe(testEmail);
    });

    it("should maintain payload integrity through encode/decode", () => {
      const originalPayload = {
        sub: "complex-id-with-special-chars!@#",
        email: "test+special@example.co.uk",
      };

      const token = createToken(originalPayload.sub, originalPayload.email);
      const decodedPayload = verifyToken(token);

      expect(decodedPayload?.sub).toBe(originalPayload.sub);
      expect(decodedPayload?.email).toBe(originalPayload.email);
    });
  });
});
