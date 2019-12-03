// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send({ api: "up and running..." });
});

server.post("/users", (req, res) => {
  const userData = req.body;
  const { name, bio } = userData;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (name && bio) {
    db.insert(req.body)
      .then(user => {
        db.findById(user.id)
          .then(foundUser => {
            res.status(200).json(foundUser);
          })
          .catch(() => {
            json
              .status(500)
              .json({ message: "There was an error retrieving the user" });
          });
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
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
        .json({ error: "The users information could not be retrieved." });
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
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      if (!removed) {
        //there was no hub with that ID
        res.status(200).json({ message: "user removed successfully" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log("error on DELETE /users/:id", error);
      res.status(500).json({ error: "The user could not be removed" });
    });
});

const port = 4000;
server.listen(port, () => {
  console.log(`\n ** API running on port ${port} ** \n`);
});
