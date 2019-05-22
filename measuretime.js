var request = require('request');
var start = new Date();
request.get({
  url : 'getplaces.js',
  time : true
},function(err, response){
	 console.log('Request time in ms', new Date() - start);
   
   
})
 
