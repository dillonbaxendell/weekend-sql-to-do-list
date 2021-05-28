//GO GET EXPRESS
const express = require('express');
const bodyParser = require('body-parser');

//make a server called app
const app = express();
const PORT = process.env.PORT || 5000;

//SERVE STATIC FILES WHEN REQUESTED
// WHEN I GO TO localhost:5000...
app.use(express.static('server/public'));
//without this bodyParser, we cannot find the data sent in post
app.use(bodyParser.urlencoded({extended : true}))

//GLOBAL VARIABLES




//ROUTERS

















// start listening for connections
// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});