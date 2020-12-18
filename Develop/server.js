const express = require("express");


// Initialize
const app = express();
const port = 5353;


app.listen(port, () => {
    console.log("server is listening on PORT: " + port);
});