import { genSalt, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('Start seeding...');

  try {
    // User (Admin)
    const admin = {
      email: 'admin@dailee.com',
      username: 'admin',
      password: 'admin',
    }

    admin.password = await hash(admin.password, await genSalt(10));

    await prisma.user.create({
      data: admin
    });
  } catch (error) {
    console.error('Error while seeding data:', error);
  } finally {
    await prisma.$disconnect();

    console.log("Seeding successful");
  }
}

main().catch(async (err) => {
  console.error('Script execution failed:', err);
});