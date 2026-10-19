import { scrypt, timingSafeEqual } from 'node:crypto'

/** Verifies a password against a `scrypt:<salt>:<hex>` hash produced by scripts/hash-password.ts */
export function verifyAdminPassword(password: string, stored: string): Promise<boolean> {
  const [algo, salt, hex] = stored.split(':')
  if (algo !== 'scrypt' || !salt || !hex) return Promise.resolve(false)
  const expected = Buffer.from(hex, 'hex')
  return new Promise((resolve) => {
    scrypt(password, salt, expected.length, (err, key) => {
      resolve(!err && key.length === expected.length && timingSafeEqual(key, expected))
    })
  })
}
