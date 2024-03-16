
## Description

I implemented this service using [Nest](https://github.com/nestjs/nest) and applied several design patterns, including Dependency Injection, decorators, and the middleware pattern.

## Installation

```bash
$ npm install
```

## Create .env File (example only)
```bash
# ENV TYPE
NODE_ENV=development

POSTGRE_PORT=5432
POSTGRE_DIALECT=postgres
POSTGRE_HOST=localhost
POSTGRE_USER=postgres
POSTGRE_PASS=
POSTGRE_DB_NAME=logique

API_KEY=HiJhvL$T27@1u^%u86g
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

I put Postman File on root directory name is postman
```bash
Logique Backend.postman_collection.json
```

## Database Migration (PostgreSQL)

```bash
# migration up all table
$ npx sequelize-cli db:migrate

# seed the data for login
$ npx sequelize-cli db:seed:all
```

## Unit Test Command

```bash
# unit tests
$ npm run test

# test show coverage
$ npm run test:cov
```

## Logical Test
I put answer for Logical Test in folder 
```bash
logical_test/
```

## Running question no 1
```bash
node soal1.js
```

## Running question no 2
```bash
node soal2.js
```

## Running question no 3
```bash
node soal3.js
```

## Running question no 4
```bash
node soal4.js
```

## Running question no 5
```bash
node soal5.js
```
