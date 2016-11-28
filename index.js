var express = require('express'),
  Datastore = require('nedb'),
  bodyParser = require('body-parser'),
  conf = require('./conf.json'),
  io = require('socket.io')({ transports: ['websocket'] }),
  model = require('./model/model'),
  db = {}

var app = express(),
  users = require('./controller/users.js'),
  articles = require('./controller/articles.js')

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status : true })
})

db.articles = new Datastore()
users(app, new Datastore(), model.user)
articles(app, db.articles, model.article)

app.listen(conf.http_port, () => {
  console.log(`HTTP: ${conf.http_port} SOCKETS: ${conf.sockets_port}`)
})

io.attach(conf.sockets_port)

io.on('connection', (socket) => {


  socket.on('getAllArticles', (data) => {
    db.articles.find({}, (err, docs) => {
      if (err) {
        console.log(`SOCKET getArticles ERROR: ${err}`)
        socket.emit('AllArticles', { err : err })
      } else socket.emit('AllArticles', { articles : docs })
    })
  })

  socket.on('setArticles', (data) => {
    db.articles.insert(model.article(data), (err, newDoc) => {
      if (err) {
        console.log(`SOCKET setArticle ERROR: ${err}`)
        socket.emit('setArticle', { err : err })
      } else socket.emit('setArticle', { res : true })
    })
  })

  socket.on('getOneArticle',  (data) => {
    db.articles.find({ _id : data.article_id }, (err, docs) => {
      if (err) {
        console.log(`SOCKET getOneArticle ERROR: ${err}`)
        socket.emit('setArticle', { err : err })
      } else socket.emit('setArticle', { res : true })
    })
  })

  socket.on('updateOneArticle',  (data) => {
    db.articles.find({ _id : data.article_id }, (err, docs) => {
      if (err) {
        console.log(`SOCKET updateOneArticle ERROR: ${err}`)
        socket.emit('updateArticle', { err : err })
      } else socket.emit('updateArticle', { res : true })
    })
  })

  socket.on('deleteOneArticle', (data) => {
    db.articles.remove({ _id: req.params.article_id }, {}, function (err, numRemoved) {
      if (err) {
        console.log(`SOCKET deleteOneArticle ERROR: ${err}`)
        socket.emit('deleteArticle', { err : err })
      } else socket.emit('deleteArticle', { res : true })
    })
  })

})
