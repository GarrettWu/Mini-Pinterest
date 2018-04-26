module.exports = function(app) {

  var recombee = require('recombee-api-client');
  var rqs = recombee.requests;

  var client = require("../model/model.server")

  app.get('/api/images/:imageId', findImageById);
  app.get('/api/images/tag/:tag', findImagesByTag);

  function findImageById(req, res) {
    var imageId = req.params.imageId;

    client.send(new rqs.GetItemValues(imageId))
      .then(function (image) {
        res.json(image);
      });
  }

  function findImagesByTag(req, res) {
    var tag = req.params.tag;
    var filter = '\"' + tag + '\"' + ' in \'categories\'';

    client.send(new rqs.ListItems({
      'returnProperties': true,
      'filter': filter,
    }))
      .then(function (images) {
        res.json(images);
      });
  }

}
