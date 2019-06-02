'use strict'
const fs = require('fs');
let placesModule = require('./getplaces.js')

let places;
let loadDataSet = function() {
    if(places) return;
    let rawPlacesData = fs.readFileSync('data/allPlaces_database.json');
    places = JSON.parse(rawPlacesData);
}

let runtest = function(query) {
    loadDataSet();
    let results = [];
    for(let kk = 0; kk < 5; kk++) {
        let result = run(query);
        results.push(result);
    }

    return results;
}

let run = function(query) {
    var testCount = query.count || 200;
    var testLocations = [];
    for(let kk = 0; kk < testCount; kk++) {
        let index = Math.floor(Math.random() * places.length);
        let place = places[index];
        testLocations.push(place.geometry.location);
    }

    let quadtree_search_time = executeAlgorithmBatch(testLocations, "quadtree");
    let linear_search_time = executeAlgorithmBatch(testLocations, "linear");
    return {
        totalSearchExecuted: testLocations.length,
        quadTreeSearchTimeMs: quadtree_search_time,
        linearSearchTimeMs: linear_search_time
    };
}

let executeAlgorithmBatch = function(testLocations, algorithm) {
    var ts_begin = new Date();
    for(let kk = 0; kk < testLocations.length; kk++) {
        let location = testLocations[kk];
        let query = { lat: location.lat, lng: location.lng, algorithm: algorithm, radius: 2 };
        placesModule.getplaces(query);
    }

    var ts_end = new Date();
    var searchTime = ts_end - ts_begin;
    console.log("Search time using " + algorithm + ": " + searchTime + " ms");
    return searchTime;
}

module.exports = {
    runtest: runtest
};
