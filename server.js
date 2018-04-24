const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

app.use(cookieParser());
app.use(session({ secret: 'secret string xxxxxxx' }));
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/dist'));

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
require("./server/app")(app);

var recombee = require('recombee-api-client');
var rqs = recombee.requests;

var client = require("./server/model/model.server")

// client.send(new rqs.GetUserValues('alice'), function(error, res) {
//   console.log(error);
//   console.log(res);
// });
//
// client.send(new rqs.GetUserValues('alice'))
//   .then(function (user) {
//     console.log(user);
//   })
// client.send(new rqs.ListItems({
//   // 'returnProperties': true,
//   'filter': '\"photography\" in \'categories\'',
// }))
//   .then(function (image) {
//     console.log(image.length);
//   })
// var result = []
// for (var itemId in ['image0', 'image1']) {
//   var itemId =
//   console.log(itemId);
//   client.send(new rqs.GetItemValues(itemId))
//     .then(function (image) {
//       result.push(image);
//       console.log(result);
//     });
// }
// client.send(new rqs.AddPurchase('alice', 'image0'))
//   .then(function (err, user) {
//     console.log(err);
//     console.log(user);
//   })
//
client.send(new rqs.RecommendItemsToUser('alice', 10), function(error, res) {
  console.log(error);
  console.log(res);
});



const port = process.env.PORT || 3100;
app.set('port', port);

const server = http.createServer(app);

app.listen(port);

