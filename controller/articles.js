var sb = require('spellbook')
  //db = new Datastore({ filename: 'db/datafile' })

module.exports = function (app, db, model) {
  app.route('/articles')
    .post((req, res) => {
      console.log(`ARTICLES POST!`)
      console.log(JSON.stringify(req.body))
      db.insert(model(req.body), (err, newDoc) => {
        if (err) res.json({ res : false, err : `Have a problem inserting in db ${err}!` })
        else res.json({ res : true })
      })
    })
    .get((req, res) => {
      console.log('ARTICLES GET!')
        db.find({}, (err, docs) => {
          if (err) console.log(err)
          else res.json(docs)
        })
    })

  app.route('/articles/:article_id')
    .get((req, res) => {
      console.log(`USERS GET: ${req.params.article_id}`)
      db.find({ _id : req.params.article_id }, (err, docs) => {
        if (err) console.log(err)
        else res.json(docs)
      })
    })
    .put((req, res) => {
      console.log(`USERS PUT: ${req.params.article_id}`)
      db.update({ _id: req.params.article_id }, model(req.body), (err, numReplaced) => {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numReplaced : numReplaced })
      })
    })
    .delete((req, res) => {
      console.log(`USERS DELETE: ${req.params.article_id}`)
      db.remove({ _id: req.params.article_id }, {}, function (err, numRemoved) {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numRemoved : numRemoved })
      })
    })
}
