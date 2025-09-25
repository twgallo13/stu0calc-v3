
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Allow requests from the Vite frontend development server
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/ratecards', async (req, res) => {
  try {
    const rateCards = await prisma.rateCard.findMany();
    res.json(rateCards);
  } catch (error) {
    console.error('Failed to fetch rate cards:', error);
    res.status(500).json({ error: 'An error occurred while fetching rate cards.' });
  }
});

app.listen(PORT, () => {
  console.log(`API Server is running on http://localhost:${PORT}`);
});
