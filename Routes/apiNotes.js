//// Add required  ///
const fs = require('fs');
const apiNotes = require('express').Router();

apiNotes.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const noteWritten = JSON.parse(data); //converts string into JSON object
            res.json(noteWritten);
        }
        
    });
});

//////////////Post request to add note //////////////

apiNotes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add note`); //Logs that a post request was received

    //destructure assignment for the items in req.body
    const {title, text} = req.body;

    if(tittle && text) {  //if all req properties are present
        //variable were object will be saved 
        const newNote = {
            title,
            text,
        };
    }
})