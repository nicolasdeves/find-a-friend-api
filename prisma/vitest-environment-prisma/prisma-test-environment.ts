import 'dotenv/config';
import { randomUUID } from 'crypto';
import { Environment } from 'vitest';
import { execSync } from 'child_process';
import { prisma } from '@/lib/prisma';

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup(global, options) {
    // this function will be executed before the tests

    const schema = randomUUID();
    process.env.DATABASE_URL = `postgresql://docker:docker@localhost:5432/find-a-friend?schema=${schema}`;

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        // this function will be executed after the tests

        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
};

/*

é criada uma dependência
- npm link => cria dependência local
- depois no diretório raiz, executo npm link vitest-environment-prisma
- no arquivo vite.config.ts, é colocado o parâmetro test: { environmentMatchGlobs: [['src/tests/end-to-end/**', 'prisma']] }, sendo 'prisma' o nome do arquivo que foi criado (final dele, após o hífen)

*/
