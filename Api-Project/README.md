# Examenopdracht Front-end Web Development / Web Services

Schrap hierboven wat niet past


- Student: Colin Callebert
- Studentennummer: 202074870
- E-mailadres: colin.callebert@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...

Vul eventueel aan


## Opstarten
To start this API, create a `.env` file in the root of this folder with this content

```.env
NODE_ENV="development"
DATABASE_USERNAME="root"
DATABASE_PASSWORD=""

AUTH_JWKS_URI='https://dev-8jgpdospovvkm7cg.us.auth0.com/.well-known/jwks.json'
AUTH_AUDIENCE='https://ouderenboerderij_ieper.be'
AUTH_ISSUER='https://dev-8jgpdospovvkm7cg.us.auth0.com/'
AUTH_USER_INFO='https://dev-8jgpdospovvkm7cg.us.auth0.com/userinfo'
```

Update the username and password with the credentials of your local database.

You can also extend the .env file with these configurations, only if the database host/port are different than our default.

```
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

## How to start



`cd <gitroot>/Api-Project`

Install dependecies `yarn install`.

Run the app in development mode with `yarn start`.

Run the app in production mode with `yarn start:prod`. We then assume all necessary environment variables are set, no .env file is ever read with this command.

Check if webbservice is running locally

open http://localhost:9000/api/health/ping in you web client

```
Should return http 200

{
    "pong": true
}
```


## How to test

Create a `.env.test` with a similar configuration as above (use another database).

Run the tests with yarn test. To get coverage run yarn `test:coverage`.

## Common errors

* Modules not found errors, try this and run again:

`yarn install`

* Migrations failed, try dropping the existing boerderij database and run again