var express = require('express');  
var app = express();  
var port =  8000;  

  
app.get('/',function(request,response)  
{  
    response.json({"Message":"hello Node js"});    //key value
}); 

//require('./commands.js')(app);
const data = require('/list.json')

app.get('/list:id', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})
  
app.listen(port, function () {  
     
    var message = "Server runnning on Port:- " + port ;  
    console.log(message);  
});