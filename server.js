'use strict'
var express = require('express');
var app = express();
let port = 8001;
app.listen(port);
console.log("Server running on port: " + port);		

// Register endpoint handlers here
let places = require('./src/getplaces.js')
app.get('/getplaces',function(req, res) {
    console.log("Request: " + req.originalUrl);
    let query = req.query;
    var result = places.getplaces(query);
    var resultJson = JSON.stringify(result);
    console.log("Response: " + resultJson);
    res.contentType('application/json');
    res.end(resultJson);
});

let performance = require('./src/performance.js')
app.get('/performance',function(req, res) {
    console.log("Request: " + req.originalUrl);
    let query = req.query;
    var result = performance.runtest(query);
    var resultJson = JSON.stringify(result);
    console.log("Response: " + resultJson);
    res.contentType('application/json');
    res.end(resultJson);
});


