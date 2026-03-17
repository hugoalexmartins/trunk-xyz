export function getUserInitials(name?: string | null, email?: string | null): string {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.trim().slice(0, 2).toUpperCase()
  }

  if (email) {
    const localPart = email.split('@')[0]
    const parts = localPart.split(/[._-]/)
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return localPart.slice(0, 2).toUpperCase()
  }

  return 'U'
}
