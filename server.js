'use strict'
var express = require('express');
var app = express();
let port = 8001;
app.listen(port);

console.log("Server running on port: " + port);		


let places = require('./getplaces.js')
// Register endpoint handlers here
app.get('/getplaces',function(req, res) {
    var result = places.getplaces(req.query.lat, req.query.lng,req.query.radius);
	res.contentType('application/json');
	res.end(JSON.stringify(result));
});





