var Datastore = require('nedb');
var Models = require('../schema/schema.json');

module.exports = function () {
  var obj = {};
  Object.keys(Models).forEach( model => {
    obj[model] = new Datastore();
  })
  return obj;
}
