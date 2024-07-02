

<p align="center">
  <a href="https://nodejs.org/en" target="blank">
    <img src="https://www.svgrepo.com/show/376337/node-js.svg" width="200" alt="Nest Logo" />
 </a>
</p>


  <p align="center">ATIPAY Server, backend server integration <a href="https://tupaypagos.com/" target="_blank">Tupay</a> deposits.</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[AtiPay Backend server](https://github.com/williamitz/atipay-backend) ResfullApi repository.


## Clone project

```bash
$ git clone git@github.com:williamitz/atipay-backend.git
```

## Installation

```bash
$ npm install
```

## Config environments variables
```
Clone file .env.template and rename .env
Config environments variables
```
## Developments steps

```bash
# Running docker container
$ docker-compose up -d

# Este comando crear el directorio para prisma, y agrega una variable de entorno en .env
$ npx prisma init

# Mapear modelos al esquema de la bd
$ npx prisma migrate dev --name init

# Verificar tener instalador el cli de hookdeck
$ npm install hookdeck-cli -g

# Levantar servidor de hookdeck
$ hookdeck listen [PORT] atipay-server
```

## Running the app

```bash
# development
$ npm run start:dev

# watch build
$ npm run build:dev

# production mode
$ npm run start:prod
```


## Stay in touch
[Prisma ORM](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-mysql) Documentation to Prisma ORM

[Hookdeck](https://dashboard.hookdeck.com/) Documentation to hookdeck 
[Hookdeck Cli](https://github.com/hookdeck/hookdeck-cli) Documentation to hookdeck Cli 


- Author - [William D. Calle Quintero]
