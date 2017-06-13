var validator = require('./validator.js')

module.exports = serv => {
  return {
    gen : (model, callback) => {
      serv.socket.on(`${model}GetAll`, (data) => {
        serv.db[model].find({}, (err, docs) => {
          if (err) {
            console.log(`SOCKET getArticles ERROR: ${err}`)
            serv.socket.emit(`${model}GetAll`, { err : err })
          } else serv.socket.emit(`${model}GetAll`, { articles : docs })
        })
      })

      serv.socket.on(`${model}Add`, (data) => {
        serv.db[model].insert(validator(model, data), (err, newDoc) => {
          if (err) {
            console.log(`SOCKET ${model}Add ERROR: ${err}`)
            serv.socket.emit(`${model}Add`, { err : err })
          } else serv.socket.emit(`${model}Add`, { res : true })
        })
      })

      serv.socket.on(`${model}Get`, (data) => {
        serv.db[model].find({ _id : data.article_id }, (err, docs) => {
          if (err) {
            console.log(`SOCKET ${model}Get ERROR: ${err}`)
            serv.socket.emit(`${model}Get`, { err : err })
          } else serv.socket.emit(`${model}Get`, { res : true })
        })
      })

      serv.socket.on(`${model}Update`, (data) => {
        serv.db[model].find({ _id : data.article_id }, (err, docs) => {
          if (err) {
            console.log(`SOCKET ${model}Update ERROR: ${err}`)
            serv.socket.emit(`${model}Update`, { err : err })
          } else serv.socket.emit(`${model}Update`, { res : true })
        })
      })

      serv.socket.on(`${model}Delete`, (data) => {
        serv.db[model].remove({ _id: req.params.article_id }, {}, (err, numRemoved) => {
          if (err) {
            console.log(`SOCKET ${model}Delete ERROR: ${err}`)
            serv.socket.emit(`${model}Delete`, { err : err })
          } else serv.socket.emit(`${model}Delete`, { res : true })
        })
      })

      if (Object.prototype.toString.call(callback) == '[object Function]') callback(serv.socket, serv.db[model])
    }
  }
}
