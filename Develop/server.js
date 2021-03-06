// Add require variables for routes and other functions needed //

const express = require("express");
const path = require("path");
const apiNotes = require("./Routes/apiNotes");
const { fs } = require("fs");
// require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

///////////// Add Middleware /////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiNotes);
// app.use("/html", html);

///// get/display saved note //////
app.get("api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const showNote = JSON.parse(data);
      res.json(showNote);
    }
  });
});

//////Route for Homepage index.html///////
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

////////Route for Notes.html//////////////
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`Application listening at http://localhost:${PORT}`)
);
