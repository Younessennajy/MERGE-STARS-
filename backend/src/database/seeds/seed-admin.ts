/**
 * One-time seed: creates the first admin user if none exists.
 *
 * Usage:
 *   npx ts-node -r tsconfig-paths/register src/database/seeds/seed-admin.ts
 *
 * Or inside Docker:
 *   docker compose exec backend npx ts-node -r tsconfig-paths/register src/database/seeds/seed-admin.ts
 */
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

config({ path: '.env' });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'merge_stars',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
});

async function seedAdmin() {
  await dataSource.initialize();

  const usersRepo = dataSource.getRepository('users');

  const existing = await usersRepo.findOne({
    where: { roles: ['admin'] as any },
  });

  if (existing) {
    console.log('✅ Admin already exists — skipping seed.');
    await dataSource.destroy();
    return;
  }

  const passwordHash = await bcrypt.hash('Admin@123456', 12);

  await usersRepo.save(
    usersRepo.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@mergestars.com',
      phone: null,
      personalId: 'ADMIN-001',
      passwordHash,
      roles: ['admin'],
      isVerified: true,
      region: 'geo',
    }),
  );

  console.log('🌱 Admin user created:');
  console.log('   Email:    admin@mergestars.com');
  console.log('   Password: Admin@123456');
  console.log('   ⚠️  Change this password immediately after first login!');

  await dataSource.destroy();
}

seedAdmin().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
