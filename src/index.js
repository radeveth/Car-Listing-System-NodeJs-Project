const express = require("express");
const handlebars = require("express-handlebars");

const initDb = require("./models/index");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const { details } = require("./controllers/details");
const { notFound } = require("./controllers/notFound");
const { deleteGet, deletePost } = require("./controllers/delete");
const { createGet, createPost } = require("./controllers/create");
const { editGet, editPost } = require("./controllers/edit");

const carsService = require("./services/cars");

start();

async function start() {
  await initDb();

  const app = express();
  const hbs = handlebars.create({ extname: ".hbs" });

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));

  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  app.use(carsService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);
  app.route("/create").get(createGet).post(createPost);
  app.route("/delete/:id").get(deleteGet).post(deletePost);
  app.route("/edit/:id").get(editGet).post(editPost);
  app.get("*", notFound);

  app.listen(3000, () => {
    console.log("Server started on port 3000.");
  });
}
