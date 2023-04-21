import { PrismaClient } from '@prisma/client';
import { hashPassword } from './../bcrypt/password-hasher';

const prisma = new PrismaClient();

async function main() {
  // create admin
  console.log('seeding admin table');
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_MAIL as string },
    update: {},
    create: {
      email: process.env.ADMIN_MAIL as string,
      password: hashPassword(process.env.ADMIN_PASS as string),
    },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
