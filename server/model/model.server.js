// const connectionString = 'mongodb://localhost/server'; // for local

// var mongoose = require('mongoose');
// mongoose.connect(connectionString);
// var db = mongoose.connection;

// db.then(function() {
//   console.log("connection success");
// }).catch(function(err) {
//   console.log("connection error");
// });
//
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("we're connected!");
// });

var recombee = require('recombee-api-client');
// var rqs = recombee.requests;

var client = new recombee.ApiClient('neu', '6uoMqPJ8yC5bxbEzOThoN3n0DVEmHj8kMOqbSyeK6ZqCzzYUw0oksNrvOQcD277C');

module.exports = client;
