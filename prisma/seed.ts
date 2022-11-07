import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // await prisma.token.deleteMany();
  // console.log("Deleted records in token table");
  // await prisma.order.deleteMany();
  // console.log("Deleted records in order table");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
