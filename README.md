# showroom full-stack website

This repository contains the development environment of the showroom's website.

Showroom is an association of curious synthesiser enthousiasts whoes goal is to share knowledge on sound synthesis.

This website is a forum dedicated to sound synthesis knowledge sharing.

## Dependencies

This projects uses: 
1) **postgres (v13.5)** database with **Docker compose (v3.8)**
2) **Vue.js (v3)** front end environment 
3) **Node.js (v19.1)** backend environment with **Nest**, **Express**, **Prisma ORM** and **SendGrid**

## Development environment

To initiate project :
```bash
# clone repo : 
git clone https://github.com/victorbusta/victorbusta-shop-vitrine.git
cd victorbusta-shop-vitrine

# start development environment database
docker compose up -d

# create .env and change content according to your needs
mv diane_eshop/.env.local diane_eshop/.env
```

Please note that you need to change values located in the **docker-compose.yml** file and in the **.env** file

## Development environment backend

This back-end is a **REST API** with **OPEN API**'s' documentation served localy at **http://localhost:3000/api/**

To initiate backend :
```bash
# go to folder
cd diane_eshop

# install node dependencies
npm i

# initiate prisma and configure database (development database can by found in the full-stack repo)
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# start project in development
npm run start:dev

# start project in production
npm run start:prod

# build project
npm run build
```
