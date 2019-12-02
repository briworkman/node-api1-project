// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send({ api: "up and running..." });
});

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error, "error on GET /users");
      res
        .status(500)
        .json({ errorMessage: "error getting users from database" });
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error, "error on GET /users/:id");
      res
        .status(500)
        .json({ errorMessage: "error getting users by id from database" });
    });
});

const port = 4000;
server.listen(port, () => {
  console.log(`\n ** API running on port ${port} ** \n`);
});
