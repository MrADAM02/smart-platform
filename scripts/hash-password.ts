import { scrypt, randomBytes } from 'node:crypto'

const password = process.argv[2]
if (!password) {
  console.error('Usage: npm run hash-password -- "your-password"')
  process.exit(1)
}
const salt = randomBytes(16).toString('hex')
scrypt(password, salt, 64, (err, key) => {
  if (err) throw err
  console.log(`NUXT_ADMIN_PASSWORD_HASH=scrypt:${salt}:${key.toString('hex')}`)
})
