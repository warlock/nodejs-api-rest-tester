var sb = require('spellbook')
var validator = require('../validator/validator.js')

module.exports = function (model, app, db, callback) {
  app.route(`/${model}`)
    .post((req, res) => {
      console.log(`${model} POST!`)
      db.insert(validator(model, req.body), (err, newDoc) => {
        if (err) res.json({ res : false, err : `Have a problem inserting in db ${err}!` })
        else res.json({ res : true })
      })
    })
    .get((req, res) => {
      console.log(`${model} GET ALL!`)
        db.find({}, (err, docs) => {
          if (err) console.log(err)
          else res.json(docs)
        })
    })

  app.route(`/${model}/:id`)
    .get((req, res) => {
      console.log(`${model} GET: ${req.params.article_id}`)
      db.find({ _id : req.params.article_id }, (err, docs) => {
        if (err) console.log(err)
        else res.json(docs)
      })
    })
    .put((req, res) => {
      console.log(`${model} PUT: ${req.params.article_id}`)
      db.update({ _id: req.params.article_id }, validator(model, req.body), (err, numReplaced) => {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numReplaced : numReplaced })
      })
    })
    .delete((req, res) => {
      console.log(`${model} DELETE: ${req.params.article_id}`)
      db.remove({ _id: req.params.article_id }, {}, function (err, numRemoved) {
        if (err) res.json({ res : false, err : err })
        else res.json({ res : true, numRemoved : numRemoved })
      })
    })

    callback(app, db)
}
