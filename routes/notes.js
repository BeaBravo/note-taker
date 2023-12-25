const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid"); //uuid package to create unique id
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils"); //helper function

const notesDB = require("../db/notes.json");

//GET route for retrieving all notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  //reads file from notes.json file
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));

  // Sending all reviews to the client
  //   return res.status(200).json(notes);
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

// GET request for a single review
notes.get("/:note_id", (req, res) => {
  if (req.params.note_id) {
    console.info(`${req.method} request received to get a single note`);
    const noteId = req.params.note_id;
    for (let i = 0; i < notesDB.length; i++) {
      const currentNote = notesDB[i];
      if (currentNote.id === noteId) {
        res.status(200).json(currentNote);
        return;
      }
    }
    res.status(404).send("Note not found");
  } else {
    res.status(400).send("Note ID not provided");
  }
});

//DELETE request for one single note
notes.delete("/:note_id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  const noteId = req.params.note_id;
  //this will loop through the notes.json file and will look for the requested note
  for (let i = 0; i < notesDB.length; i++) {
    const currentNote = notesDB[i];
    if (currentNote.id === noteId) {
      //if the requested note exists, it is deleted from notes.json with the readAndDelete function
      res.status(200).json(currentNote);
      readAndDelete(i, "./db/notes.json");
      return;
    }
  }
});

module.exports = notes;
