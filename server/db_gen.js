var Datastore = require('nedb')
var Models = require('../schema.json')

module.exports = () => {
  var obj = {}
  Object.keys(Models).forEach( model => {
    obj[model] = new Datastore()
  })
  return obj
}
