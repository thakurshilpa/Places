var express = require('express');
var app = express();
//var bodyParser = require('body-parser');
//app.use(bodyParser.json())

require('./requesthandler.js')(app);

console.log("Server running:");		app.listen(8001);
/*var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})*/