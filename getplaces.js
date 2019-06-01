'use strict'
const fs = require('fs');
let Point = require('./point.js').Point

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

let Places = loadDataSet();

let getplaces = function(query) { 
    return getplacesImpl(query.lat, query.lng, query.radius, query.format, query.order);
}

let getplacesImpl = function(lat, lng, radius, format, order) {
    var ts_begin = new Date();
    var result = [];
    radius = radius || 5; // KM
    let point = new Point(lat, lng);
    console.log("MeterX: " + point.getMeterX() + ", MeterY: " + point.getMeterY());

	for (var i=0;i < Places.length; i++ ) {
		let distance = getDistance(lat,lng, Places[i].geometry.location.lat, Places[i].geometry.location.lng);
		if(distance < radius) { 
           result.push(Places[i]);
		}
    }
    
    result.sort(function(a,b)
    {
        let d1=getDistance(lat,lng, a.geometry.location.lat, a.geometry.location.lng);
        let d2=getDistance(lat,lng, b.geometry.location.lat, b.geometry.location.lng);
        return order == "desc" ? d2 - d1 :  d1 - d2;
    });

    var ts_end = new Date();
    var time_taken = ts_end - ts_begin;
    console.log("Time taken: " + time_taken + " ms");
    return format == "min" ? toMinOutput(result, lat, lng) : result; 
};

let toRad = function(value) {
     return value * Math.PI / 180;
}

// convert to MinOutput
let toMinOutput = function(result, lat, lng) {
    var minOutput = [];
    for(var kk = 0; kk < result.length; kk++) {
        let place = result[kk];
        let distance = getDistance(lat,lng, place.geometry.location.lat, place.geometry.location.lng);
        console.log(place.name + ", " + distance + " KM");
        minOutput.push({name: place.name, distance: distance});
    }
 
    return minOutput;
}

// start and end are objects with latitude and longitude
//decimals (default 2) is number of decimals in the output
//return is distance in kilometers. 
let getDistance = function(lat1, lng1, lat2, lng2) {
    // use some API or external module to calculate distance
    let start = { latitude: lat1, longitude: lng1 }
    let end = { latitude: lat2, longitude: lng2 }
    let decimals = 2;
    var earthRadius = 6371; // km
    lat1 = parseFloat(start.latitude);
    lat2 = parseFloat(end.latitude);
    let lon1 = parseFloat(start.longitude);
    let lon2 = parseFloat(end.longitude);

    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    // c is the angular distance in radians, and a is the square of half the chord length between the points.//
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
};


module.exports = {
    getplaces: getplaces
};
