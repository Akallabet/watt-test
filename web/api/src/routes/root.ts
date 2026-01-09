import { type FastifyInstance } from 'fastify'

export default async function (app: FastifyInstance) {
  app.get('/health', async () => {
    const { db, sql } = app.platformatic

    // Test database connection
    const result = await db.query(sql`SELECT 1 as ok`)

    return {
      status: 'ok',
      database: result[0]?.ok === 1 ? 'connected' : 'error',
      timestamp: new Date().toISOString(),
    }
  })
}
