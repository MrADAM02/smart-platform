// Protects every /api/admin/* route except login
export default defineEventHandler(async (event) => {
  const path = event.path.split('?')[0]
  if (!path.startsWith('/api/admin/') || path === '/api/admin/login') return
  await requireUserSession(event)
})
