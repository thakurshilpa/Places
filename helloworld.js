var express = require('express');  
var app = express();  
var port =  8000;  

  
app.get('/',function(request,response)  
{  
    response.json({"Message":"hello Node js"});    //key value
}); 

<<<<<<< HEAD
=======

>>>>>>> 9c37270f0d418a377b62697e2ac9892545d272f5
  
app.listen(port, function () {  
     
    var message = "Server runnning on Port:- " + port ;  
    console.log(message);  
});
