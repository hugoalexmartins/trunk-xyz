import { validatePassword, PASSWORD_MIN_LENGTH } from '../constants';

describe('Password Validation', () => {
  describe('validatePassword', () => {
    it('should accept a valid password', () => {
      const result = validatePassword('validPassword123');

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject a password that is too short', () => {
      const shortPassword = 'short';
      const result = validatePassword(shortPassword);

      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain(PASSWORD_MIN_LENGTH.toString());
    });

    it('should accept a password with exactly minimum length', () => {
      const minPassword = 'a'.repeat(PASSWORD_MIN_LENGTH);
      const result = validatePassword(minPassword);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept a password longer than minimum', () => {
      const longPassword = 'a'.repeat(PASSWORD_MIN_LENGTH + 10);
      const result = validatePassword(longPassword);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should handle empty string', () => {
      const result = validatePassword('');

      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle very long passwords', () => {
      const veryLongPassword = 'a'.repeat(1000);
      const result = validatePassword(veryLongPassword);

      expect(result.valid).toBe(true);
    });

    it('should accept passwords with special characters', () => {
      const specialPassword = 'P@ssw0rd!#$%^&*()';
      const result = validatePassword(specialPassword);

      expect(result.valid).toBe(true);
    });

    it('should accept passwords with spaces', () => {
      const spacePassword = 'my secure password 123';
      const result = validatePassword(spacePassword);

      expect(result.valid).toBe(true);
    });

    it('should accept passwords with unicode characters', () => {
      const unicodePassword = 'pässwörd123456';
      const result = validatePassword(unicodePassword);

      expect(result.valid).toBe(true);
    });

    it('should have a meaningful error message for short passwords', () => {
      const result = validatePassword('short');

      expect(result.error).toMatch(/at least/i);
      expect(result.error).toMatch(/characters/i);
    });

    it('should return consistent results for the same input', () => {
      const password = 'testPassword123';
      const result1 = validatePassword(password);
      const result2 = validatePassword(password);

      expect(result1).toEqual(result2);
    });
  });

  describe('PASSWORD_MIN_LENGTH constant', () => {
    it('should be defined', () => {
      expect(PASSWORD_MIN_LENGTH).toBeDefined();
    });

    it('should be a positive number', () => {
      expect(typeof PASSWORD_MIN_LENGTH).toBe('number');
      expect(PASSWORD_MIN_LENGTH).toBeGreaterThan(0);
    });

    it('should be at least 8', () => {
      expect(PASSWORD_MIN_LENGTH).toBeGreaterThanOrEqual(8);
    });
  });
});
