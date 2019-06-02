'use strict'
const fs = require('fs');
let Point = require('./Point.js').Point
let Rect = require('./Rect.js').Rect
let QuadTree = require('./QuadTree.js').QuadTree
const EARTH_RADIUS = 6378137.0;
const ORIGIN_SHIFT = 2.0 * Math.PI * EARTH_RADIUS / 2.0;

let loadDataSet = function() {
    var ts_begin = new Date();
    let rawPlacesData = fs.readFileSync('data/allPlaces_database.json');
    let places = JSON.parse(rawPlacesData);
    var ts_end = new Date();
    var time_taken = ts_end - ts_begin;
    console.log("Total places loaded: " + places.length);
    console.log("Dataset load time: " + time_taken + " ms, " + "Dataset size: " + Math.floor(rawPlacesData.length/1024) + " KB");
    return places;
}

let loadQuadTree = function (places) {
    var ts_begin = new Date();
    let rootRect = new Rect(-ORIGIN_SHIFT, -ORIGIN_SHIFT, ORIGIN_SHIFT, ORIGIN_SHIFT);
    let maxEntriesPerTile = 100; // configurable
    let minRect = new Rect(0,0, 100, 100); // configurable
    let quadTree = new QuadTree(rootRect, maxEntriesPerTile, minRect); // min 100 meters 
    for (var i = 0;i < places.length; i++) {
        let location = places[i].geometry.location;
        let point = new Point(location.lat, location.lng, places[i]);
        quadTree.addEntry(point);
    }

    var ts_end = new Date();
    var time_taken = ts_end - ts_begin;
    console.log("QuadTree load time: " + time_taken + " ms");
    console.log("QuadTree meta data: " + JSON.stringify(quadTree.getMeta()));
    return quadTree;
}

let Places = loadDataSet();
let quadTree = loadQuadTree(Places);
let getplaces = function(query) { 
    let lat = parseFloat(query.lat);
    let lng = parseFloat(query.lng);
    let defaultRadius = 2000;// in Meters
    let radius = query.radius ? query.radius*1000 : defaultRadius; // 
    let format = query.format || "full";
    let order = query.order || "asc";
    let algorithm = query.algorithm || "quadtree"; // linear or quadtree
    return getplacesImpl(lat, lng, radius, format, order, algorithm);
}

let getplacesImpl = function(lat, lng, radius, format, order, algorithm) {
    let source = new Point(lat, lng);
    var ts_begin = new Date();
    let result = [];
    let useQuadTreeAlgorithm = algorithm == "quadtree";
    if(useQuadTreeAlgorithm) {
        result = matchUsingQuadTree(source, radius);
    } else {
        result = matchUsingLinearSearch(source, radius);
    }

    sortPlacesResult(result, source, order);
    var ts_end = new Date();
    var time_taken = ts_end - ts_begin;
    
    // Debugging only
    // logResult(result, source);
    
    // Prepare response
    let response = {};
    response.time_taken = time_taken;
    response.entriesSearched = Places.length;
    response.matchCount = result.length;
    response.result = format == "min" ? toMinOutput(result, source) : result;
    return response; 
};

let sortPlacesResult = function(result, source, order) {
    result.sort(function(a,b)
    {
        let point1 = new Point(a.geometry.location.lat, a.geometry.location.lng);
        let point2 = new Point(b.geometry.location.lat, b.geometry.location.lng);
        let d1 = source.distanceTo(point1);
        let d2 = source.distanceTo(point2);
        return order == "desc" ? d2 - d1 :  d1 - d2;
    });
}

let matchUsingLinearSearch = function(source, radius) {
    let result = [];
    for (var i = 0;i < Places.length; i++ ) {
        let location = Places[i].geometry.location;
        let point = new Point(location.lat, location.lng);
        let distance = source.distanceTo(point);
        if(distance < radius) { 
            result.push(Places[i]);
		}
    }

    return result;
}


let matchUsingQuadTree = function(source, radius) {
    let rangeRect = new Rect(source.getMeterX() - radius/2, source.getMeterY() - radius/2, 
                             source.getMeterX() + radius/2, source.getMeterY() + radius/2);
    let rangeEntries = quadTree.getEntriesInRange(rangeRect);
    //console.log("QuadTree:RangeEntries: " + rangeEntries.length);
    let result = [];
    for(let kk = 0; kk < rangeEntries.length; kk++) {
        let place = rangeEntries[kk].payload;
        let location = place.geometry.location;
        let point = new Point(location.lat, location.lng);
        let distance = source.distanceTo(point);
        if(distance < radius) { 
            result.push(place);
		}
    }

    return result;
}

let round = function(num, decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

let logResult = function(result, source) {
    for(var kk = 0; kk < result.length; kk++) {
        let place = result[kk];
        let point = new Point(place.geometry.location.lat, place.geometry.location.lng);
        let distance = round(source.distanceTo(point)/1000, 2);
        console.log(place.name + ", " + distance + " KM");
    }
}

// convert to MinOutput
let toMinOutput = function(result, source) {
    var minOutput = [];
    for(var kk = 0; kk < result.length; kk++) {
        let place = result[kk];
        let point = new Point(place.geometry.location.lat, place.geometry.location.lng);
        let distance = round(source.distanceTo(point)/1000, 2);
        minOutput.push({name: place.name, distance: distance});
    }
 
    return minOutput;
}

module.exports = {
    getplaces: getplaces
};
