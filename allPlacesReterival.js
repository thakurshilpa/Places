'use strict'
const fs = require('fs');



// all places added in allPlaces_database.json
let rawPlacesData = fs.readFileSync('allPlaces_database.json');
let Places = JSON.parse(rawPlacesData);
console.log("number of places in file is"+Places.length);
