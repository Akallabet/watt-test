# Watt Deployment Test

Minimal Watt (Platformatic) monorepo for testing DigitalOcean deployment.

## Structure

```
├── watt.json           # Main Watt runtime config
├── web/
│   ├── api/            # Platformatic DB service
│   ├── app/            # Next.js frontend
│   └── composer/       # Gateway/proxy service
└── docker/             # Docker configuration
```

## Prerequisites

- Node.js 24.x
- Docker & Docker Compose
- PostgreSQL (or use Docker)

## Quick Start

1. Copy environment file:

   ```bash
   cp .env.example .env
   ```

2. Start PostgreSQL:

   ```bash
   npm run db:start
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3042

## Endpoints

- **Frontend**: http://localhost:3042/
- **API Health**: http://localhost:3042/api/data/health
- **API Items**: http://localhost:3042/api/data/items

## Docker Build

```bash
docker build -f docker/prod/Dockerfile -t watt-test .
docker run -p 3042:3042 --env-file .env watt-test
```
