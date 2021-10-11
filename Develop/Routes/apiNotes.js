//// Add required  ///
const fs = require("fs");
const apiNotes = require("express").Router();
const uuid = require("../helper/uuid");

apiNotes.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const noteWritten = JSON.parse(data); //converts string into JSON object
      res.json(noteWritten);
    }
  });
});


//////////////Post request to add note //////////////

apiNotes.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add note`); //Logs that a post request was received

  //destructure assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    //if all req properties are present
    //variable were object will be saved
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    //read added notes

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        //convert string into JSON object
        const noteWritten = JSON.parse(data);

        //add new note
        noteWritten.push(newNote);

        //use writefile to add new notes
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(noteWritten, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Succesfully added note")
        );
      }
    });

    const response = { status: "success", body: newNote };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

module.exports = apiNotes;
