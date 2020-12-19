
const fs = require("fs");
const ID = require("generate-unique-id");

const editNote = (newNoteArray) => {
  fs.writeFile("./db/db.json", JSON.stringify(newNoteArray), (err) => {
    if (err) throw err;
  });
};

// ROUTING
module.exports = (app) => {
  // GET REQUEST
  app.get("/api/notes", (req, res) => {
    // Read db.json and return saved notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      // Parse data
      res.json(JSON.parse(data));
    });
  });

  // POST REQUEST
  app.post("/api/notes", (req, res) => {
    // Receive new note and add it to the json file
    const newNote = req.body;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      // Parse data
      const noteArray = JSON.parse(data);
      newNote.id = ID({ length: 10 });
      noteArray.push(newNote);

      editNote(noteArray);
      res.send(noteArray);
    });
  });

  // DELETE REQUEST
  app.delete("/api/notes/:id", (req, res) => {
    const deleteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      let noteArray = JSON.parse(data);
      // Removes note with given ID
      for (let i = 0; i < noteArray.length; i++) {
        if (noteArray[i].id === deleteId) {
          noteArray.splice(i, 1);
        }
      }
      editNote(noteArray);
      res.send(noteArray);
    });
  });

  // PUT REQUEST
  app.put("/api/notes/:id", (req, res) => {
    const editId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      let noteArray = JSON.parse(data);

      let chosenNote = noteArray.find((note) => note.id === editId);

      if (chosenNote) {
        let newNote = {
          title: req.body.title,
          text: req.body.text, 
          id: chosenNote.id,
        };
        //  Find index at which the item is stored 
        let targetIndex = noteArray.indexOf(chosenNote);

        //  replace object data with `newNote` object
        noteArray.splice(targetIndex, 1, newNote);

        res.sendStatus(204);
        editNote(noteArray);
        res.json(noteArray);
      } else {
        res.sendStatus(404);
      }
    });
  });
};
