const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

//GET route for retrieving all notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;
