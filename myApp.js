var express = require('express');
var app = express();

require('dotenv').config();

console.log('Hello World');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', function(req, res) {
    let response = process.env.MESSAGE_STYLE === 'uppercase' ? "Hello World".toUpperCase() : "Hello World";
    res.json({message: `${response}`})
})


module.exports = app;
