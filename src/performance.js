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
    let fastFactor = 1;
    let totalTimeWithQuad = 0;
    let totalTimeWithLinear = 0;
    for(let kk = 0; kk < 5; kk++) {
        let result = run(query);
        let quad = result[0];
        let linear = result[1];
        totalTimeWithQuad = totalTimeWithQuad + quad.totalTime;
        totalTimeWithLinear = totalTimeWithLinear + linear.totalTime;
        results = results.concat(result);
    }

    fastFactor = 100*Math.floor(totalTimeWithLinear/totalTimeWithQuad);
    let response = {};
    response.conclusion = "QuadTree implementation is " + fastFactor + "% faster than linear search";
    response.results = results;
    return response;
}

let run = function(query, algorithm) {
    var testCount = query.count || 200;
    var testLocations = [];
    for(let kk = 0; kk < testCount; kk++) {
        let index = Math.floor(Math.random() * places.length);
        let place = places[index];
        testLocations.push(place.geometry.location);
    }

    let result = [];
    let search_time = executeAlgorithmBatch(testLocations, "quadtree");
    let estmatedQPS = Math.floor(1000*testLocations.length/search_time);
    result.push({
        algorithm: "quadtree",
        totalSearchRun: testLocations.length,
        totalTime: search_time,
        queriesPerSecond: estmatedQPS
    });

    search_time = executeAlgorithmBatch(testLocations, "linear");
    estmatedQPS = Math.floor(1000*testLocations.length/search_time);
    result.push({
        algorithm: "linear",
        totalSearchRun: testLocations.length,
        totalTime: search_time,
        queriesPerSecond: estmatedQPS
    });

    return result;
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
