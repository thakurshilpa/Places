'use strict'
const fs = require('fs');

//http://localhost:8001/getplaces?lat=1.30&lng=1.20

// We should add restaurants to this file places_database.json
let rawPlacesData = fs.readFileSync('allPlaces_database.json');
let Places = JSON.parse(rawPlacesData);
console.log(Places.length);
