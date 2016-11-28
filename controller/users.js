var sb = require('spellbook'),
  model = require('../model/model'),
  defaultUser = require('../defaultUser.json')
  //db = new Datastore({ filename: 'db/datafile' })




module.exports = function (app, db) {
  db.loadDatabase((err) => {
    if (err) throw Error(`Have a problem loading db ${err}`)
    else {
      console.log(`DB OK!`)
      db.insert(defaultUser, (err, newDoc) => {
        if (err) throw Error(`Have a problem inserting in db ${err}!`)
        else console.log(`User created!`)
      })
    }
  })


  app.route('/users')
    .post((req, res) => {
      console.log(`POST REC: ${JSON.stringify(req.body)}`)
      db.insert(model.user(req.body), (err, newDoc) => {
        if (err) res.json({ res : false, err : `Have a problem inserting in db ${err}!` })
        else res.json({ res : true })
      })
    })
    .get((req, res) => {
      console.log('GET NEWS!')
        db.find({}, (err, docs) => {
          if (err) console.log(err)
          else res.json(docs)
        })
    })

  app.route('/users/:user_id')
    .get((req, res) => {
      console.log(`GET: ${req.params.user_id}`)
      db.find({ _id : req.params.user_id }, (err, docs) => {
        if (err) console.log(err)
        else res.json(docs)
      })
    })
    .put((req, res) => {
      db.update({ _id: req.params.user_id }, model.user(req.body), (err, numReplaced) => {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numReplaced : numReplaced })
      })
    })
    .delete((req, res) => {
      db.remove({ _id: req.params.user_id }, {}, function (err, numRemoved) {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numRemoved : numRemoved })
      })
    })
}
