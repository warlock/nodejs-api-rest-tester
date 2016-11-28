var sb = require('spellbook'),
  defaultUser = require('../defaultUser.json')
  //db = new Datastore({ filename: 'db/datafile' })

module.exports = function (app, db, model) {
  db.loadDatabase((err) => {
    if (err) throw Error(`DB USER: Have a problem loading db ${err}`)
    else {
      console.log(`DB USER OK!`)
      db.insert(defaultUser, (err, newDoc) => {
        if (err) throw Error(`DB USER: Have a problem inserting in db ${err}!`)
        else console.log(`DB USER: Default user created!`)
      })
    }
  })


  app.route('/users')
    .post((req, res) => {
      console.log(`USERS POST!`)
      db.insert(model(req.body), (err, newDoc) => {
        if (err) res.json({ res : false, err : `Have a problem inserting in db ${err}!` })
        else res.json({ res : true })
      })
    })
    .get((req, res) => {
      console.log('USERS GET!')
        db.find({}, (err, docs) => {
          if (err) console.log(err)
          else res.json(docs)
        })
    })

  app.route('/users/:user_id')
    .get((req, res) => {
      console.log(`USERS GET: ${req.params.user_id}`)
      db.find({ _id : req.params.user_id }, (err, docs) => {
        if (err) console.log(err)
        else res.json(docs)
      })
    })
    .put((req, res) => {
      console.log(`USERS PUT: ${req.params.user_id}`)
      db.update({ _id: req.params.user_id }, model(req.body), (err, numReplaced) => {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numReplaced : numReplaced })
      })
    })
    .delete((req, res) => {
      console.log(`USERS DELETE: ${req.params.user_id}`)
      db.remove({ _id: req.params.user_id }, {}, function (err, numRemoved) {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numRemoved : numRemoved })
      })
    })
}
