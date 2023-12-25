// DEPENDENCIES
// express
const express = require("express");
const path = require("path");
//retrieve notes server
const notes = require("./routes/notes");

// DATA

// APP / PORT
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static
app.use(express.static("public"));

// ROUTES
// html routes - deliver pages
// GET / - the home page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// GET / - notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//404 route
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/404.html"))
// );

//ROUTES
//GET api/notes
app.use("/api/notes", notes);

// START SERVER
app.listen(PORT, () => console.log(`Server live on ${PORT}`));
