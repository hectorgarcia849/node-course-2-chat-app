const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const express = require('express');
var app = express();

console.log(publicPath);

app.use(express.static(publicPath)); //location of files we will read from


app.listen(port,() => {
    console.log(`Server is up on port ${port}`)
});