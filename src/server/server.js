const express = require('express');
const tasks = require('./Database/DataBaseTask').tasks;
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.options('/api/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    response.send();
});

app.post('/', (req, res) => {
    const task = req.body.task;
    tasks[task](req.body).then(result => res.send(JSON.stringify(result)));
});

app.get('/',async (req, res) => {
    tasks.search({str : 'G'}).then(result => res.send(result));
})

app.listen(port, () => {
});

app.on('error', console.log);