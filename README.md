# EFA code-databank

### How to setup

- Clone repo
- CD into /server and install node modules

```
cd server/
npm install

```

- CD into /code-databank-refactor and install node modules

```
cd code-databank-refactor/
npm install
```

- Create a .env file in the root of the server folder and add the following variables

```
PORT =
JWT_SECRET =
DB_CONNECTION_STRING =
```

- In postgres, create a database for the app and update .env with database name

- Using postgres the default DB_CONNECTION STRING is:

```
postgres://USERNAME:PASSWORD@localhost:5432/YOUR-DATABASE-NAME
```

### Running the app

- Server

```
node index.js
```

- Client

```
npm run dev
```
