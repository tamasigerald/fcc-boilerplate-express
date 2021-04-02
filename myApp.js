var express = require('express');
var app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

console.log('Hello World');
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Middlewares
function loggerMiddleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}

function nowMiddleware(req, res, next) {
    req.time = Date().toString();
    next();
}

app.use(loggerMiddleware);


// Routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', function(req, res) {
    const string = "Hello Json";
    let response = process.env.MESSAGE_STYLE === 'uppercase' ? string.toUpperCase() : string;
    res.json({message: `${response}`})
})

app.get('/now', nowMiddleware, function(req, res) {
    res.json({time: req.time});
})

app.get('/:word/echo', function(req, res) {
    let word = req.params.word;
    res.json({echo: word});
})

app.route('/name')
.get(function(req, res) {
    let name = req.query.first;
    let lastname = req.query.last;
    res.json({name: `${name} ${lastname}`});
})
.post(function(req, res) {
    let name = req.body.first;
    let lastname = req.body.last;
    res.json({name: `${name} ${lastname}`});
});


module.exports = app;
