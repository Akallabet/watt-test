import { PlatformaticApp, PlatformaticDBMixin, PlatformaticDBConfig, Entity } from '@platformatic/db'

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<PlatformaticDBConfig> & PlatformaticDBMixin<Entity>
  }
}
