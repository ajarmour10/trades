# Trade-In Application

This is a scaffold for an automotive trade-in web application.

## Structure
- `api` – Express + TypeScript backend.
- `worker` – Background worker running scheduled valuation updates.
- `client` – React frontend with basic webpack setup.
- `prisma` – Prisma ORM schema.

## Setup
1. Install Node.js and Docker.
2. Copy `api/.env.example` to `api/.env` and adjust variables.
3. Run `npm run setup` from the repository root.

## Scripts
- `npm run setup` – install dependencies for all packages.
- `npm test` – run backend unit tests.

## Development
- `npm run dev:api` – start API in watch mode.
- `npm run dev:worker` – start worker in watch mode.
- `npm run dev:client` – start React dev server.

## Docker
Use `docker-compose up` for a local stack including Postgres.
