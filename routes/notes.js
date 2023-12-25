const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid"); //uuid package to create unique id
const { readFromFile, readAndAppend } = require("../helpers/fsUtils"); //helper function

//GET route for retrieving all notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  //reads file from notes.json file
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  const note = req.body;
  //append to notes.json and create a new object with a unique ID
  //the request body will have title and text
  const newNote = {
    id: uuidv4(),
    title: note.title,
    text: note.text,
  };
  res.json(newNote);
  //reads and append file with new note
  readAndAppend(newNote, "./db/notes.json");
});

module.exports = notes;
