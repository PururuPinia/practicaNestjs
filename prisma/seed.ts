import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  console.log('Cleaning existing data...');

  // Limpiar tablas para evitar duplicados si se corre varias veces
  await prisma.user.deleteMany();
  console.log('Users deleted');
  await prisma.tenant.deleteMany();
  console.log('Tenants deleted');

  console.log('Creating tenants...');

  // Crear Tenants según la captura de tu guía
  const tenant1 = await prisma.tenant.create({
    data: { name: 'Tech Solutions' }
  });
  const tenant2 = await prisma.tenant.create({
    data: { name: 'Marketing Pro' }
  });
  const tenant3 = await prisma.tenant.create({
    data: { name: 'Consulting Exp' }
  });

  // Crear un usuario de prueba encriptando su contraseña
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin User',
      password: hashedPassword,
      telephone: '12345678',
      role: 'ADMIN',
      tenantid: tenant1.id
    }
  });
}

// Ejecutar la función principal
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });