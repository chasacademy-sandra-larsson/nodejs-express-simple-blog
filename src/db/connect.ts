import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()


// async function main() {

  // Read all users
  // const allUsers = await prisma.user.findMany()

  // console.log(allUsers)

    // Delete all posts
//await prisma.post.deleteMany({});

// Delete all users
//await prisma.user.deleteMany({});
//   const users = await prisma.user.findMany({
//       include: {
//           posts: true,
//       },
//   })
//   //console.log(users); 
//   console.log(JSON.stringify(users, null, 2));

//   const posts = await prisma.post.create({
//         data: {
//             title: 'My first post',
//             content: 'Hello world',
//             published: true,
//         }
//   })

//  }

// main()
// .then(async () => {
//   await prisma.$disconnect()
// })
// .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })