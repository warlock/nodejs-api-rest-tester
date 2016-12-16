var validator = require('../validator/validator.js')

module.exports = function (model, socket, db, callback) {
  socket.on(`${model}GetAll`, (data) => {
    db.find({}, (err, docs) => {
      if (err) {
        console.log(`SOCKET getArticles ERROR: ${err}`)
        socket.emit(`${model}GetAll`, { err : err })
      } else socket.emit(`${model}GetAll`, { articles : docs })
    })
  })

  socket.on(`${model}Add`, (data) => {
    db.insert(validator(model, data), (err, newDoc) => {
      if (err) {
        console.log(`SOCKET ${model}Add ERROR: ${err}`)
        socket.emit(`${model}Add`, { err : err })
      } else socket.emit(`${model}Add`, { res : true })
    })
  })

  socket.on(`${model}Get`, (data) => {
    db.find({ _id : data.article_id }, (err, docs) => {
      if (err) {
        console.log(`SOCKET ${model}Get ERROR: ${err}`)
        socket.emit(`${model}Get`, { err : err })
      } else socket.emit(`${model}Get`, { res : true })
    })
  })

  socket.on(`${model}Update`, (data) => {
    db.find({ _id : data.article_id }, (err, docs) => {
      if (err) {
        console.log(`SOCKET ${model}Update ERROR: ${err}`)
        socket.emit(`${model}Update`, { err : err })
      } else socket.emit(`${model}Update`, { res : true })
    })
  })

  socket.on(`${model}Delete`, (data) => {
    db.remove({ _id: req.params.article_id }, {}, function (err, numRemoved) {
      if (err) {
        console.log(`SOCKET ${model}Delete ERROR: ${err}`)
        socket.emit(`${model}Delete`, { err : err })
      } else socket.emit(`${model}Delete`, { res : true })
    })
  })

  callback(db)
}
