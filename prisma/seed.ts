import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
// Fix: Import `process` to resolve error "Property 'exit' does not exist on type 'Process'".
import process from 'process';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

// Fix: Define `__dirname` for ES module scope, as it's not available by default.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface RateCardSeed {
  id: string;
  name: string;
  version: string;
  monthly_minimum_cents: number;
  prices: object;
}

async function main() {
  console.log(`Start seeding ...`);

  const seedFilePath = path.join(__dirname, 'ratecards_seed.json');
  const seedFileContent = fs.readFileSync(seedFilePath, 'utf-8');
  const rateCards: RateCardSeed[] = JSON.parse(seedFileContent);

  for (const rc of rateCards) {
    const rateCard = await prisma.rateCard.upsert({
      where: { id: rc.id },
      update: {
        name: rc.name,
        version: rc.version,
        monthly_minimum_cents: rc.monthly_minimum_cents,
        prices: rc.prices,
      },
      create: {
        id: rc.id,
        name: rc.name,
        version: rc.version,
        monthly_minimum_cents: rc.monthly_minimum_cents,
        prices: rc.prices,
      },
    });
    console.log(`Created/updated rate card with id: ${rateCard.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
