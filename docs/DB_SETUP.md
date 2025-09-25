# Database Setup and Seeding

This document provides instructions for setting up the PostgreSQL database using Prisma and seeding it with initial data.

## 1. Prerequisites

-   A PostgreSQL server is running.
-   You have a database created and its connection URL (e.g., `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`).
-   Node.js and a package manager (e.g., pnpm) are installed.
-   Project dependencies are installed (`pnpm install`).

## 2. Environment Variables

Create a `.env` file in the root of the project and add your database connection string:

```
DATABASE_URL="postgresql://user:password@localhost:5432/momentum_db"
```

Replace the example URL with your actual database connection string.

## 3. Database Migration

The database schema is defined in `prisma/schema.prisma`. To create the tables defined in the schema, run the migration command. This will apply any pending migrations and create the `rate_cards`, `quotes`, and `scenarios` tables.

```bash
# This command will create and apply a migration based on the schema
npx prisma migrate dev --name init
```

After running this, your database schema will be in sync with `prisma/schema.prisma`.

## 4. Seeding the Database

You have two options for populating the `rate_cards` table with the initial sample data.

### Option A: Using the Prisma Seed Script (Recommended)

This method uses the TypeScript seed script located at `prisma/seed.ts` and is the standard way to seed when using Prisma.

1.  **Configure `package.json`** (if not already done):
    Ensure your `package.json` has a `prisma` section for seeding:
    ```json
    "prisma": {
      "seed": "tsx prisma/seed.ts"
    }
    ```
    *Note: You may need to install `tsx` (`pnpm add -D tsx`) as a modern TypeScript runner.*

2.  **Run the seed command:**
    ```bash
    npx prisma db seed
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

    This will execute the `INSERT` statements in the file and populate the `rate_cards` table.

After completing these steps, your database will be ready for development.
