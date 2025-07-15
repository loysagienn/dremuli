# Dremuli

https://dremuli.com

## Start

Create `.env` file:

```env
HTTP_PORT=3040
POSTGRESQL_URL="postgresql://postgres@localhost:5432/dremuli"
DOMAIN="localhost"
SUPPORT_EMAIL="<email to send messages>"
SUPPORT_EMAIL_PASSWORD="<email password>"
```

Install dependencies

```
npm install
```

Apply prisma migrations

```
npx prisma migrate deploy
```

Generate Prisma Client

```
npx prisma generate
```

Run the project

```
npm run dev
```

## Prisma

New prisma migration

```
npx prisma migrate dev --name <your_migration_name>
```

Apply existing migrations

```
npx prisma migrate deploy
```

Reset DB (drops all data), applies all migrations again — dev only

```
npx prisma migrate reset
```

Generate Prisma Client based on `schema.prisma`

```
npx prisma generate
```

Auto-format the `schema.prisma` file

```
npx prisma format
```

## Migrations

Build migrations

```
npm run build-migrations
```

Run migration

```
npm run migration -- <migration-name>
```
