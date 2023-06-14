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

  // const longImg = [
  //   'Attention à la marche en descendant du train.jpg',
  //   'Derivation.jpg',
  //   'Le cadis du bord de la route.jpg',
  //   'Moteur berlinois.jpg',
  //   'Structures parisiennes.jpg',
  //   'Au loin.jpg',
  //   'En aparté.jpg',
  //   'Léna et la pomme .jpg',
  //   'Mousaillon.jpg',
  //   'Cirque solaire.jpg',
  //   'Exposition.jpg',
  //   'Macadam.jpg',
  //   'Otto.jpg',
  //   'Découpes 2.jpg',
  //   'Kinder.jpg',
  //   'Mes dames.jpg',
  //   'Parions sur nous.jpg',
  //   'Découpes.jpg',
  //   'La fourrure et la godasse.jpg',
  //   'Métro parisien, odeurs poétiques.jpg',
  //   'Solitude.jpg',
  // ];

  // const prints = await prisma.print.findMany();

  // if (prints.length === 0) {
  //   return;
  // }

  // prints.forEach(async (print) => {
  //   console.log(print.title);

  //   const isLong = longImg.includes(`${print.title}.jpg`);
  //   console.log(isLong);

  //   if (isLong) {
  //     await prisma.format.create({
  //       data: {
  //         print_id: print.id,
  //         label: 'avec cadre',
  //         size: '30 x 40',
  //         price: 150,
  //       },
  //     });

  //     await prisma.format.create({
  //       data: {
  //         print_id: print.id,
  //         label: 'sans cadre',
  //         size: '20 x 29',
  //         price: 100,
  //       },
  //     });
  //   } else {
  //     await prisma.format.create({
  //       data: {
  //         print_id: print.id,
  //         label: 'avec cadre',
  //         size: '24 x 30',
  //         price: 90,
  //       },
  //     });

  //     await prisma.format.create({
  //       data: {
  //         print_id: print.id,
  //         label: 'sans cadre',
  //         size: '18 x 24',
  //         price: 60,
  //       },
  //     });

  //     await prisma.format.create({
  //       data: {
  //         print_id: print.id,
  //         label: 'avec cadre',
  //         size: '21 x 29,7',
  //         price: 70,
  //       },
  //     });

  //     await prisma.format.create({
  //       data: {
  //         print_id: print.id,
  //         label: 'sans cadre',
  //         size: '13 x 18',
  //         price: 50,
  //       },
  //     });
  //   }
  // });
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
