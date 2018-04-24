module.exports = function(app) {

  require("./model/model.server.js");
  require("./services/user.service.server.js")(app);
  require("./services/image.service.server.js")(app);
};
