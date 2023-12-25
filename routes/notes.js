const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

//GET route for retrieving all notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  const note = req.body;
  //append to notes db and create a new object with a unique ID
  const newNote = {
    id: uuidv4(),
    title: note.title,
    text: note.text,
  };
  res.json(newNote);
  readAndAppend(newNote, "./db/notes.json");
});

module.exports = notes;
