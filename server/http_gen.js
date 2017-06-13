var validator = require('./validator.js')

module.exports = serv => {
  return {
    gen : (model, callback) => {
      serv.http.route(`/${model}`)
        .post((req, res) => {
          console.log(`${model} POST!`)
          serv.db[model].insert(validator(model, req.body), (err, newDoc) => {
            if (err) res.json({ res : false, err : `Have a problem inserting in db ${err}!` })
            else res.json({ res : true })
          })
        })
        .get((req, res) => {
          console.log(`${model} GET ALL!`)
          serv.db[model].find({}, (err, docs) => {
            if (err) console.log(err)
            else res.json(docs)
          })
        })

      serv.http.route(`/${model}/:id`)
        .get((req, res) => {
          console.log(`${model} GET: ${req.params.id}`)
          serv.db[model].find({ _id : req.params.id }, (err, docs) => {
            if (err) console.log(err)
            else res.json(docs[0])
          })
        })
        .put((req, res) => {
          console.log(`${model} PUT: ${req.params.id}`)
          serv.db[model].update({ _id: req.params.id }, validator(model, req.body), (err, numReplaced) => {
            if (err) res.json({ res : false, err : err })
            else res.json({ res : true, numReplaced : numReplaced })
          })
        })
        .delete((req, res) => {
          console.log(`${model} DELETE: ${req.params.id}`)
          serv.db[model].remove({ _id: req.params.id }, {}, (err, numRemoved) => {
            if (err) res.json({ res : false, err : err })
            else res.json({ res : true, numRemoved : numRemoved })
          })
        })

      if (Object.prototype.toString.call(callback) == '[object Function]') callback(serv.http, serv.db[model])
    }
  }
}
