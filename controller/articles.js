var sb = require('spellbook'),
  model = require('../model/model')
  //db = new Datastore({ filename: 'db/datafile' })

module.exports = function (app, db) {
  app.route('/articles')
    .post((req, res) => {
      console.log(`POST REC: ${JSON.stringify(req.body)}`)
      db.insert(model.article(req.body), (err, newDoc) => {
        if (err) res.json({ res : false, err : `Have a problem inserting in db ${err}!` })
        else res.json({ res : true })
      })
    })
    .get((req, res) => {
      console.log('GET ARTICLES!')
        db.find({}, (err, docs) => {
          if (err) console.log(err)
          else res.json(docs)
        })
    })

  app.route('/articles/:article_id')
    .get((req, res) => {
      console.log(`GET: ${req.params.article_id}`)
      db.find({ _id : req.params.article_id }, (err, docs) => {
        if (err) console.log(err)
        else res.json(docs)
      })
    })
    .put((req, res) => {
      db.update({ _id: req.params.article_id }, model.article(req.body), (err, numReplaced) => {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numReplaced : numReplaced })
      })
    })
    .delete((req, res) => {
      db.remove({ _id: req.params.article_id }, {}, function (err, numRemoved) {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numRemoved : numRemoved })
      })
    })
}
