# Database Setup and Seeding

This document provides instructions for setting up the PostgreSQL database using Prisma and seeding it with initial data.

## 1. Prerequisites

-   A PostgreSQL server is running.
-   You have a database created and its connection URL (e.g., `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`).
-   Node.js and **pnpm** are installed.
-   Project dependencies are installed (`pnpm install` from the root).

## 2. Environment Variables

Create a `.env` file in the root of the project and add your database connection string:

```
DATABASE_URL="postgresql://user:password@localhost:5432/momentum_db"
```

Replace the example URL with your actual database connection string.

## 3. Database Migration

The database schema is defined in `prisma/schema.prisma`. To create the tables defined in the schema, run the migration command from the project root. This will apply any pending migrations and create the `RateCard`, `Quote`, and `Scenario` tables.

```bash
# This command targets the 'api' workspace to run the migration
pnpm --filter api exec prisma migrate dev --name init
```

After running this, your database schema will be in sync with `prisma/schema.prisma`.

## 4. Seeding the Database

You have two options for populating the `RateCard` table with the initial sample data.

### Option A: Using the Prisma Seed Script (Recommended)

This method uses the TypeScript seed script located at `prisma/seed.ts`.

1.  **Configure `package.json`** (if not already done):
    The `prisma` section in `apps/api/package.json` should be configured to use a TypeScript runner.

2.  **Run the seed command from the project root:**
    ```bash
    pnpm --filter api exec prisma db seed
    ```

This will read the data from `prisma/ratecards_seed.json` and insert the three sample rate cards into your database.

### Option B: Using the SQL Script

This is a good alternative if you prefer to work directly with SQL.

1.  **Locate the SQL script:** The script is located at `sql/insert_ratecards.sql`.

2.  **Run the script using `psql`:**
    You will need the `psql` command-line tool. Execute the following command, replacing `<YOUR_DATABASE_URL>` with your full connection string.

    ```bash
    psql -d "<YOUR_DATABASE_URL>" -f sql/insert_ratecards.sql
    ```

    This will execute the `INSERT` statements in the file and populate the `RateCard` table.

After completing these steps, your database will be ready for development.
