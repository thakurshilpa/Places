var request = require('request');
var start = new Date();
request.get({
  url : 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=22.279213,%2089.550946&rankby=distance&key=%20AIzaSyAn3XHK4etmU1Fa0oRMOye_lLmV1GSVANQ',
  time : true
},function(err, response){
	 console.log('Request time in ms', new Date() - start);
   
   
})
 
