module.exports = function(app) {

    var Place = require('./jsonArrayretrieve.js');

    //search places
    app.get('/Place/:long&:lat', Place.find);
}


    