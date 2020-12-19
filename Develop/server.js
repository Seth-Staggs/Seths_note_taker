const express = require("express");


// Initialize
const app = express();
const port = process.env.PORT || 5353;




// Static files
app.use(express.static("public"));

// Data Parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes
require("./Routes/routesAPI")(app);
require("./Routes/routesHTML")(app);


// Check to see if server is listening
app.listen(port, () => {
    console.log("server is listening on PORT: " + port);
});