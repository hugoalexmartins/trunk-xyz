import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Backfill existing users that don't have approval status set
  // (Schema migration should have set defaults, but ensure consistency)
  const totalUsers = await prisma.user.count();
  console.log(`Total users in database: ${totalUsers}`);

  // Create or update admin user for development
  const adminEmail = 'admin@example.com';
  const adminPassword = 'AdminPassword123!';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`Admin user already exists: ${adminEmail}`);
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        role: UserRole.admin,
        approved: true,
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  }

  console.log('Seed completed');
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
