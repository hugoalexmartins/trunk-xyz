import { add, isValidEmail } from '../utils/example'

describe('Example Utilities', () => {
  describe('add', () => {
    it('should add two numbers correctly', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('should handle negative numbers', () => {
      expect(add(-1, 1)).toBe(0)
    })

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5)
    })
  })

  describe('isValidEmail', () => {
    it('should return true for valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('should return false for email without @', () => {
      expect(isValidEmail('testexample.com')).toBe(false)
    })

    it('should return false for email without domain', () => {
      expect(isValidEmail('test@')).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isValidEmail('')).toBe(false)
    })
  })
})
