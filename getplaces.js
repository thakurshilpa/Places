'use strict'
const fs = require('fs');

//http://localhost:8001/getplaces?lat=1.30&lng=1.20

// We should add restaurants to this file places_database.json
let rawPlacesData = fs.readFileSync('Places1_database.json');
let Places = JSON.parse(rawPlacesData);

let getplaces = function(lat, lng) {
    var result = [];
    var distanceArray=[];
    //Object.keys(req.query).length    one option
    
    var radius = 5; //KM
   
	for (var i=0;i<Places.length;i++) {
		let distance = getDistance(lat,lng, Places[i].geometry.location.lat, Places[i].geometry.location.lng);
		console.log("Distance from start(" + lat + "," + lng + ") to end(" + Places[i].geometry.location.lat + "," + Places[i].geometry.location.lng + ") is " + distance + " KM");
		if(distance < radius) { 
            distanceArray.push(distance);
	 	   result.push(Places[i]);
		}
	}

	return result;
};

if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

let toRad = function(value) {
	 return value * Math.PI / 180;
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


