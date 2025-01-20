import { Environment } from 'vitest'
export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup(global, options) { // this function will be executed before the tests
    console.log('Setup')
    return {
      async teardown() { // this function will be executed after the tests
        console.log('Teardown')
      },
    }
  },
}


/*

é criada uma dependência
- npm link => cria dependência local
- depois no diretório raiz, executo npm link vitest-environment-prisma
- no arquivo vite.config.ts, é colocado o parâmetro test: { environmentMatchGlobs: [['src/tests/end-to-end/**', 'prisma']] }, sendo 'prisma' o nome do arquivo que foi criado (final dele, após o hífen)

*/