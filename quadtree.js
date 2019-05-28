'use strict'
const fs = require('fs');


let rawPlacesData = fs.readFileSync('allPlaces_database.json');
let Places = JSON.parse(rawPlacesData);
 let tl=[[]],tr=[[]],bl=[[]],br=[[]];  //store data in arrays 
    let n=Places.length;
    let p=0;
    for(let i=0;i<n/2;i++){
        tl[i]=[]
        tr[i]=[]
        for(let j=0;j<n/2;j++)
            tl[i].push(Places[p])
        p++;
        for(let j=n/2;j<n;j++)
            tr[i].push(Places[i])
        p++;
    }
    let k=0;
    for(let i=n/2;i<n;i++){
        bl[k]=[]
        br[k]=[]
        for(let j=0;j<n/2;j++)
            bl[k].push(Places[p])
        p++;
        for(let j=n/2;j<n;j++)
            br[k].push(Places[p])
        p++;
        k++;
    }