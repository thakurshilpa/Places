
var express=require('express');
var app=express();
var Students = {
				Student1: {
					Name:"shilpa",
					Rollno:1,
					Fathername:"Rattan chand"
					
				},
				Student2: {
					Name:"mani",
					Rollno:2,
					Fathername:"Gurdev chand"
					
				},
				Student3: {
					Name:"madhu",
					Rollno:3,
					Fathername:"Rattan chand"
					
				},
				Student4: {
					Name:"ranjan",
					Rollno:4,
					Fathername:"Rattan chand"
					
				},
				Student5: {
					Name:"adil",
					Rollno:5,
					Fathername:"Rattan chand"
					
				},
				Student6: {
					Name:"harish",
					Rollno:6,
					Fathername:"Rattan chand"
					
				},
			};
			app.get('/:id', function(req, res) {
    var customer = Students["Student" + req.params.id];
  
    res.send( "Student Information\n" + JSON.stringify(customer, null, 4));
});
	console.log("Server running:");		app.listen(8001);
