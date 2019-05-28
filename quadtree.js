'use strict'
const fs = require('fs');


let rawPlacesData = fs.readFileSync('allPlaces_database.json');
let Places = JSON.parse(rawPlacesData);
create(Places);

function Node(Places,topLeft,topRight,bottomLeft,bottomRight) {
     this.Places = Places;
     this.topLeft =null;
     this.topRight = null;

     this.bottomLeft = null;
     this.bottomRight = null;
 };
  

  fuction create(Places){  //store data in arrays 
  
   var tl=[];
  var tr=[];
  var bl=[];
  var br=[];
  if(l<500) return;
  l=Places.length;
    for(i=0;i<l/4;i++)
  {
  	tl[i].push(Places[i]);
  	
  }
  for(i=l/4;i<(2*l)/4;i++)
  {
  	tr[i].push(Places[i]);
  	
  }
  for(i=(2*l)/4;i<(3*l)/4;i++)
  {
  	t[i].push(Places[i]);
  	
  }
  for(i=(3*l)/4;i<n;i++)
  {
  	tl[i].push(laces[i]);
  	
  }



};

