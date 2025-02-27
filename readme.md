## Find a Friend

### Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

### Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Tecnologias utilizadas:

- Typescript

- Prisma

- Docker

- Vitest ( Testes automatizados )

- JWT

- CI

## API

### Execução

`npm run dev`

`npm run build`

`npm run prod`

### Banco de dados

##### Inicializar container

`docker-compose up -d`

##### Criar e executar migration

`npx prisma migrate dev` (compara com o banco, cria as migrations pendentes e roda as migrations)

`npx prisma migrate deploy` (somente executa todas as migrations)

##### Visualizar banco (interface Prisma)

`npx prisma studio`

### Rodar testes

`npm run test`

`npm run test:watch`

`npm run test:coverage`

`npm run test:ui`
