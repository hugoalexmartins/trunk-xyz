import { PrismaClient, UserRole, EventType, EventStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as Minio from 'minio';

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

  // Create regular user with no events (onboarding flow)
  const newUserEmail = 'newuser@example.com';
  const newUserPassword = 'UserPassword123!';
  const existingNewUser = await prisma.user.findUnique({ where: { email: newUserEmail } });
  if (existingNewUser) {
    console.log(`New user (no events) already exists: ${newUserEmail}`);
  } else {
    const hashedPassword = await bcrypt.hash(newUserPassword, 10);
    await prisma.user.create({
      data: {
        email: newUserEmail,
        passwordHash: hashedPassword,
        role: UserRole.regular,
        approved: true,
      },
    });
    console.log(`Created regular user (no events): ${newUserEmail} / ${newUserPassword}`);
  }

  // Create regular user with existing APPLICATION events (returning user flow)
  const returningUserEmail = 'returning@example.com';
  const returningUserPassword = 'UserPassword123!';
  const existingReturningUser = await prisma.user.findUnique({ where: { email: returningUserEmail } });
  if (existingReturningUser) {
    console.log(`Returning user already exists: ${returningUserEmail}`);
  } else {
    const hashedPassword = await bcrypt.hash(returningUserPassword, 10);
    const returningUser = await prisma.user.create({
      data: {
        email: returningUserEmail,
        passwordHash: hashedPassword,
        role: UserRole.regular,
        approved: true,
      },
    });

    // Seed two APPLICATION events (pipeline heads) for the returning user
    const app1 = await prisma.event.create({
      data: {
        type: EventType.APPLICATION,
        status: EventStatus.PENDING,
        title: 'Frontend Engineer @ Acme Corp',
        date: new Date('2026-03-01'),
        metadata: { position: 'Frontend Engineer', company: 'Acme Corp', jobUrl: null, jobUrlFile: null },
        createdById: returningUser.id,
      },
    });
    await prisma.event.update({ where: { id: app1.id }, data: { pipelineId: app1.id } });

    const app2 = await prisma.event.create({
      data: {
        type: EventType.APPLICATION,
        status: EventStatus.ACTIVE,
        title: 'Full Stack Developer @ Globex Inc',
        date: new Date('2026-03-10'),
        metadata: { position: 'Full Stack Developer', company: 'Globex Inc', jobUrl: 'https://globex.example.com/jobs/42', jobUrlFile: null },
        createdById: returningUser.id,
      },
    });
    await prisma.event.update({ where: { id: app2.id }, data: { pipelineId: app2.id } });

    // Add a SCREENING follow-up event to the second pipeline
    await prisma.event.create({
      data: {
        type: EventType.SCREENING,
        status: EventStatus.PENDING,
        title: 'Phone Screen @ Globex Inc',
        date: new Date('2026-03-14'),
        pipelineId: app2.id,
        metadata: { notes: 'Recruiter call — 30 min' },
        createdById: returningUser.id,
      },
    });

    console.log(`Created returning user with events: ${returningUserEmail} / ${returningUserPassword}`);
  }

  // Ensure MinIO bucket exists for local dev
  const bucketName = process.env.MINIO_BUCKET_NAME || 'trunk-applications';
  try {
    const minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName);
      console.log(`Created MinIO bucket: ${bucketName}`);
    } else {
      console.log(`MinIO bucket already exists: ${bucketName}`);
    }
  } catch (err) {
    console.warn(`MinIO bucket setup skipped (MinIO may not be running): ${err}`);
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
