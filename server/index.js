require("dotenv").config();

const express = require("express");
const db = require("./db");
const app = express();

app.use(require("./middleware/headers"));

const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.usercontroller);

app.use(require("./middleware/validate-session"));
app.use("/posts", controllers.postscontroller);
app.use("/replies", controllers.repliescontroller);

db.authenticate()
  .then(() => db.sync())
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
