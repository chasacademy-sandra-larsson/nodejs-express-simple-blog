import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'; // https://fakerjs.dev/

const prisma = new PrismaClient();

// Based on this schema
// script seed.ts in package.json
//"seed": "ts-node prisma/seed.ts"


// model User {
//   id       Int    @id @default(autoincrement())
//   username String @unique
//   email    String @unique
//   password String
//   posts    Post[]
// }

// model Post {
//   id        String  @id @default(uuid())
//   title     String
//   content   String  @db.Text 
//   published Boolean @default(false)
//   author    User    @relation(fields: [authorId], references: [id])
//   authorId  Int
// }


// async function main() {
//   // Skapa användare
//   const userPromises = Array.from({ length: 100 }).map(() => {
//     return prisma.user.create({
//       data: {
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//       },
//     });
//   });

//   const users = await Promise.all(userPromises);

//   // Skapa inlägg för varje användare
//   for (const user of users) {
//     const postPromises = Array.from({ length: 10 }).map(() => {
//       return prisma.post.create({
//         data: {
//           title: faker.lorem.sentence(),
//           content: faker.lorem.paragraphs(3), // Begränsa innehållet till 3 stycken
//           published: faker.datatype.boolean(),
//           authorId: user.id,
//         },
//       });
//     });
//     await Promise.all(postPromises);
//   }
// }

// async function main() {
//   // Delete all data
//   await prisma.post.deleteMany();
// }


async function main() {
  // Create users synchronously
  for (let i = 0; i < 100; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    // Create posts for each user synchronously
    for (let j = 0; j < 10; j++) {
      await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(3),
          published: faker.datatype.boolean(),
          authorId: user.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
