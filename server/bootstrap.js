var  fs = require('fs');

//rxapi add articles
module.exports = function () {
  var boot = { db : [], http : [], socket : [] }
  fs.readdir('./models/', (err, res) => {
    res.forEach(dir => {

    })
  })
}
