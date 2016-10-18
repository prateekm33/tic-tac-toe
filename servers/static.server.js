const express = require('express');
const app = express();


// serve static files
app.use(express.static(__dirname + '/../src'));


// listen to port 3000
app.listen(3000, () => { console.log('listening on port 3000')})