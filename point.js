'use strict'

const EARTH_RADIUS = 6378137.0;
const ORIGIN_SHIFT = 2.0 * Math.PI * EARTH_RADIUS / 2.0;

let Point = function(lat, lng) {
    this.latitude = lat;
    this.longitude = lng;
}
/**
 * Gets the X meter in Spherical Mercator EPSG:900913, converted from longitude in WGS84
 * @return meterX
 */
Point.prototype.getMeterX = function() {
    let meterX = this.longitude * ORIGIN_SHIFT / 180.0;
    return meterX;
}

/**
 * Gets the Y meter in Spherical Mercator EPSG:900913, converted from latitude in WGS84
 * @return meterY
 */
Point.prototype.getMeterY = function() {
    let meterY = Math.log(Math.tan((90.0 + this.latitude) * Math.PI / 360.0)) / (Math.PI / 180.0);
    meterY = meterY * ORIGIN_SHIFT / 180.0;
    return meterY;
}

/**
 * Gets latitude in WGS84
 * @return latitude-coordinate
 */
Point.prototype.getLatitude = function() {
    return this.latitude;
}
	
/**
 * Gets longitude in WGS84
 * @return longitude-coordinate
 */
Point.prototype.getLongitude = function() {
    return this.longitude;
}
	

module.exports = {
    Point: Point
};