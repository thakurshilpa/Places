'use strict'
const fs = require('fs');


let rawPlacesData = fs.readFileSync('allPlaces_database.json');
let Places = JSON.parse(rawPlacesData);
var tl = [];    // all places data divide on the basis of lat long
var tr=[];      
var bl=[];
var br=[];
var l=Places.length;
Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),    //to truncate values of lat long
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};
var i=0,k=0;
while(i<l)

{
	 var latitude=Places[i].geometry.location.lat;
	 var longitude=Places[i].geometry.location.lng;

	// this node containig information of places whose lat ranges 30 - 32  and lng ranges 74-78
	if((latitude.toFixedDown(0)==30)||(latitude.toFixedDown(0)==31)||(latitude.toFixedDown(0)==32)   

		&&(longitude.toFixedDown(0)==74)||(longitude.toFixedDown(0)==76)||(longitude.toFixedDown(0)==77)||
		(longitude.toFixedDown(0)==78))
		{tl.push(Places[i]);
		console.log(tl[k]);
		
	}
i++;
}

var j=0,m=0;
while(j<l)

{
	 var latitude=Places[j].geometry.location.lat;
	 var longitude=Places[j].geometry.location.lng;

	// this node containig information of places whose lat ranges 10- 19and lng ranges 74-78
	if((latitude.toFixedDown(0)==10)||(latitude.toFixedDown(0)==11)||(latitude.toFixedDown(0)==12)||
		(latitude.toFixedDown(0)==15)||(latitude.toFixedDown(0)==16)||(latitude.toFixedDown(0)==17)||
			(latitude.toFixedDown(0)==18)||(latitude.toFixedDown(0)==16)
		&&(longitude.toFixedDown(0)==73)||(longitude.toFixedDown(0)==74)||(longitude.toFixedDown(0)==75)||
		(longitude.toFixedDown(0)==76)||(longitude.toFixedDown(0)==77)||(longitude.toFixedDown(0)==78))
		 
		 {
		 	tr.push(Places[j]);
		    console.log(tr[m]);
		m++;
	     }
j++;
}

var p=0,q=0;
while(p<l)

{
	 var latitude=Places[p].geometry.location.lat;
	 var longitude=Places[p].geometry.location.lng;
//this node containig information of places whose lat ranges 30 - 32  and lng ranges 73-82
	
	if((latitude.toFixedDown(0)==25)||(latitude.toFixedDown(0)==26)||(latitude.toFixedDown(0)==27)||   
		(latitude.toFixedDown(0)==28)||(latitude.toFixedDown(0)==29)
		&&(longitude.toFixedDown(0)==73)||(longitude.toFixedDown(0)==72)||(longitude.toFixedDown(0)==76)||
		(longitude.toFixedDown(0)==77)||(longitude.toFixedDown(0)==82))
		 
		 {
		 	bl.push(Places[p]);
		    console.log(bl[q]);
		q++;
	     }
p++;
}
console.log(q);
var r=0,s=0;
while(r<l)

{
	 var latitude=Places[r].geometry.location.lat;
	 var longitude=Places[r].geometry.location.lng;

	// this node containig information of places whose lat ranges 22-24 and lng ranges 73-81
	if((latitude.toFixedDown(0)==22)||(latitude.toFixedDown(0)==23)||(latitude.toFixedDown(0)==24)
		
		&&(longitude.toFixedDown(0)==74)||(longitude.toFixedDown(0)==75)||(longitude.toFixedDown(0)==76)||
		(longitude.toFixedDown(0)==77)||(longitude.toFixedDown(0)==81))
		 
		 {
		 	br.push(Places[r]);
		    console.log(br[s]);
		s++;
	     }
r++;
}
console.log("length of top left array"+tl.length);
console.log("length of top right array"+tr.length);
console.log("length of bottom left array"+br.length);
console.log("length of bottom left array"+bl.length);



