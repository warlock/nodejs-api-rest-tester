var Datastore = require('nedb');
var fs = require('fs');

module.exports = function () {
  return new Promise((resolve, reject) => {
    fs.readdir('./models/', (err, res) => {
      var obj = {};
      res.forEach(dir => {
        //obj[dir] = "asdsad";
        obj[dir] = new Datastore();
      })
      if (Object.keys(obj).length > 0) resolve({ data : obj, models : res });
      else reject('System without models.')
    })
  })
}
