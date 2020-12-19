
const path = require("path");

module.exports = (app) => {

  // Returns notes.html 
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  // Returns index.html, and is default 
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};