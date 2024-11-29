import { PrismaClient } from '@prisma/client'

// Name property for global variable to avoid collision
const prismaClientPropertyName = `__prevent-name-collision__prisma`;

// Global type for better TypeScript safety
type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient;
};

// Function to get the Prisma Client
const getPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV === `production`) {
    return new PrismaClient();
  } else {
    // In development, use a global variable to store Prisma Client
    const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
    if (!newGlobalThis[prismaClientPropertyName]) {
      newGlobalThis[prismaClientPropertyName] = new PrismaClient();
    }
    return newGlobalThis[prismaClientPropertyName];
  }
};

// Instantiate Prisma Client
const prisma = getPrismaClient();

// Ensure proper cleanup when the app shuts down in production
if (process.env.NODE_ENV === `production`) {
  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

export default prisma;
