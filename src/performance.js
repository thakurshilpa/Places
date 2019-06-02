'use strict'
const fs = require('fs');

let loadDataSet = function() {
    var ts_begin = new Date();
    let rawPlacesData = fs.readFileSync('data/allPlaces_database.json');
    let places = JSON.parse(rawPlacesData);
    var ts_end = new Date();
    var time_taken = ts_end - ts_begin;
    console.log("Dataset load time: " + time_taken + " ms");
    return places;
}