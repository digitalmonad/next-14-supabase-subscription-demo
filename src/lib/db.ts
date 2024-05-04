import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

//@ts-ignore
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
//@ts-ignore
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
