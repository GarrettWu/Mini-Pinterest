module.exports = function (app) {
  // var userModel = require("../model/user/user.model.server")

  var recombee = require('recombee-api-client');
  var rqs = recombee.requests;

  var client = require("../model/model.server")

  var bcrypt = require("bcrypt-nodejs");

  var passport = require('passport');
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy(localStrategy));

  app.get("/api/user/:userId", findUserById);
  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);

  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);

  app.put('/api/user/:userId/image/:imageId', saveImage);
  app.get('/api/user/:userId/purchase', findPurchasesByUser);
  app.get('/api/user/:userId/recommend', getRecommendsByUser);

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function login(req, res) {
    res.json(req.user);
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    var userId = user.username;

    client.send(new rqs.AddUser(userId), function() {
      client.send(new rqs.SetUserValues(userId, user), function() {
        req.login(user, function(){
          res.json(user);
        })
      });
    });
  }
  function loggedIn(req, res) {
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function createUser(req, res) {
    var user = req.body;
    // user.password = bcrypt.hashSync(user.password);

    var userId = user.username;

    client.send(new rqs.AddUser(userId), function() {
      client.send(new rqs.SetUserValues(userId, user), function() {
        res.json(user);
      });
    });
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];

    client.send(new rqs.GetUserValues(userId))
      .then(function(user) {
        res.json(user);
    });
  }

  function updateUser(req, res) {
    var user = req.body;
    var userId = user.userId;

    client.send(new rqs.SetUserValues(userId, user), function() {
      res.json(user);
    });
  }

  function saveImage(req, res) {
    var user = req.body;
    var userId = user.userId;
    var itemId = req.params.itemId;

    client.send(new rqs.AddPurchase(userId, itemId), function() {
      res.json(user);
    });
  }

  function findPurchasesByUser(req, res) {
    var userId = req.params.userId;
    client.send(new rqs.ListUserPurchases(userId))
      .then(function (purchases) {
        res.json(purchases);
      });
  }

  function getRecommendsByUser(req, res) {
    var userId = req.params.userId;

    client.send(new rqs.RecommendItemsToUser(userId, 30))
      .then(function (imageIdObjects) {
        res.json(imageIdObjects);
      });
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    var userId = user.userId;

    client.send(new rqs.GetUserValues(userId))
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        })
  }

  function localStrategy(usrn, pass, done) {
    var userId = usrn;

    client.send(new rqs.GetUserValues(userId))
      .then(
        function(user) {
          if(user.username === usrn
            && bcrypt.compareSync(pass, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }})
  }
}
