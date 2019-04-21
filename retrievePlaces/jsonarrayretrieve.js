



 Places = [
				{
					long:1.2,
					lat:1.3,
					restaurant:"Lovely",
					//Address: "Lovely Near punjab national bank",
					Contact_details:"01972364587",
					opening_timing:"9:00am",
					closing_timing:"11:00pm",
					Facilities:"Breakfast Lunch Dinner"
					
				},
				
				 {
					long:1.8,
					lat:1.9,
					restaurant:"Aamar Hotel",
					//Address: "Aamar hotel near main market",
					Contact_details:"0197233888",
					opening_timing:"9:00am",
					closing_timing:"12:pm",
					Facilities:"Breakfast Lunch Dinner"
					
				},
				 {
					long:1.111,
					lat:1.8111,
					restaurant:"Sharma Hotel",
					//Address: "friends plaza near bust stop",
					Contact_details:"0197237998",
					opening_timing:"9:00am",
					closing_timing:"12:pm",
					Facilities:"Breakfast Lunch Dinner"
				
					
				},
			 {
					long:1.22,
					lat:1.33,
					restaurant:"kathi king",
					//Address: "main market"
					Contact_details:"9876444333",
					opening_timing:"8:00am",
					closing_timing:"8:00pm",
					Facilities:"breakfast lunch dinner"
					
				},
				 {
					long:1.20,
					lat:1.30,
					restaurant:"villa camila",
					//"Address": "hanuman mandir"
					Contact_details:"7766443555",
					opening_timing:"4:00am",
					closing_timing:"7:00pm",
					Facilities:"breakfast lunch dinner"
					
				},
				 {
					long:1.24,
					lat:1.35,
					restaurant:"ramsham restaurant",
					//"Address":"Near sbi bank"
					Contact_details:"0197227266",
					opening_timing:"9:00am",
					closing_timing:"10:00pm",
					Facilities:"Breakfast Lunch Dinner"
					
				},
				{
					long:1.24,
					lat:1.35,
					restaurant:"AAA restaurant",
					//"Address":"Near sbi bank"
					Contact_details:"0197227266",
					opening_timing:"9:00am",
					closing_timing:"10:00pm",
					Facilities:"Breakfast Lunch Dinner"
					
				}
			];
exports.find=function(req, res) {

    var result = [];
    var long=req.params.long;

    var lat=req.params.lat;
for (var i=0;i<Places.length;i++) 
{
	if(Places[i].long==long&&Places[i].lat==lat)
  
    result.push(Places[i]);
  
}

res.contentType('application/json');
res.end(JSON.stringify(result));
};

 