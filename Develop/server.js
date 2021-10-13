// Add require variables for routes and other functions needed //

const express = require("express");
const path = require("path");
const apiNotes = require("./Routes/apiNotes");
const noteData = require("./db/db.json");
const { fs } = require("fs");

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

/////////////// delete note /////////////// not working

// app.delete("api/notes", (req, res) => {
//   const noteId = req.params.id;
//   fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
//     if (err) {
//       console.error(err);
//       const notes = JSON.parse(data);
//       const allNotes = notes.filter((item) => {
//         return item.id !== noteId;
//       });
//       fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err, data) => {
//         console.log("Note deleted!");
//         if (err) {
//           console.error(err);
//           res.json(allNotes);
//         }
//       });
//     }
//   });
// });

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
