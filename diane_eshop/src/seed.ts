import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../bcrypt/password-hasher';
import fs = require('fs');
import csvToJson = require('csvtojson');

async function readCSVFile(filePath: string) {
  return csvToJson({
    trim: true,
  }).fromFile(filePath);
}

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

  const prints = await readCSVFile('./prisma/formats.csv');

  prints.forEach(async (print: any) => {
    console.log(print.print);
    const _print = await prisma.print.upsert({
      where: { title: print.print },
      create: {
        title: print.print.replaceAll('.', ','),
        description: 'exemplaire signé',
        documentUrl: `https://images.vanbutselediane.com/${print.print
          .replaceAll(' ', '%20')
          .replaceAll('.', ',')}.jpg`,
        initial_number: 30,
        current_number: 30,
      },
      update: {},
      select: { id: true },
    });

    await prisma.format.create({
      data: {
        label: '',
        size: print.taille,
        price: Number(print.prix),
        size_frame: print.cadre,
        price_frame: Number(print.prixcadre),
        print_id: _print.id,
      },
    });
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
