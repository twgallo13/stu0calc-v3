# C3PL Quote Calculator

This is the monorepo for the C3PL Quote Calculator, containing the backend API and the frontend web application. It is configured to run both servers concurrently for development.

## Project Structure

-   `/apps/api`: The Express.js backend server that connects to the database.
-   `/apps/web`: The React frontend application.
-   `/prisma`: Database schema, migrations, and seed scripts.
-   `/docs`: Project documentation.

## Run Locally

**Prerequisites:** Node.js and PNPM (`npm install -g pnpm`)

1.  **Install Dependencies:**
    From the root of the project, run:
    `pnpm install`

2.  **Set Environment Variables:**
    Create a `.env` file in the project root and add your `DATABASE_URL`.

3.  **Run the App:**
    From the root of the project, run the following command to start both the backend API and the frontend web app:
    `pnpm dev`

    The API will be on `http://localhost:3000` and the web app will be on `http://localhost:5173`.
