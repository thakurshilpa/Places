'use strict'
const fs = require('fs');


let rawPlacesData = fs.readFileSync('allPlaces_database.json');
let Places = JSON.parse(rawPlacesData);
 //let tl=[[]],tr=[[]],bl=[[]],br=[[]];  //store data in arrays 
   let n=128;
   var tl=[];
   tl[0]=[];
   tl[0][0]=1;
   console.log(tl[0][0])
