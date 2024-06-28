

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

[AtiPay Backend server](https://github.com/williamitz/) ResfullApi repository.


## Clone project

```bash
$ git clone git@github.com:williamitz/gramma_admin_backend.git
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

# Execute prisma database
$ npx prisma generate

# Build prisma schema
$ npx prisma migrate dev --name init
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
- Author - [William D. Calle Quintero]
