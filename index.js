var express = require('express'),
  Datastore = require('nedb'),
  bodyParser = require('body-parser'),
  conf = require('./conf.json'),
  io = require('socket.io')({ transports: ['websocket'] }),
  model = require('./model/model'),
  db = {},
  defaultUser = require('./defaultUser.json'),
  app = express(),
  generator = require('./controller/generator.js')

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status : true })
})

generator('users', app, new Datastore(), model.article, (app_users, db_users, schema_users) => {
  db_users.loadDatabase((err) => {
    if (err) throw Error(`DB USER: Have a problem loading db ${err}`)
    else {
      db_users.insert(defaultUser, (err, newDoc) => {
        if (err) throw Error(`DB USER: Have a problem inserting in db ${err}!`)
        else console.log(`DB USER: Default user created!`)
      })
    }
  })
})

db.articles = new Datastore()
generator('articles', app, db.articles, model.article, (app_articles, db_articles, schema_articles) => {

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

  socket.on('addArticles', (data) => {
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

app.listen(conf.http_port, () => {
  console.log(`HTTP: ${conf.http_port} SOCKETS: ${conf.sockets_port}`)
})
