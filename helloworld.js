var express = require('express');  
var app = express();  
var port =  8000;  
  
app.get("/nearbyservice",function(request,response)  
{  
    response.json({"Message":"hello Node js"});    //key value
});  
  
app.listen(port, function () {  
     
    var message = "Server runnning on Port:- " + port ;  
    console.log(message);  
});