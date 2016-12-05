var express = require('express'),
  Datastore = require('nedb'),
  bodyParser = require('body-parser'),
  conf = require('./conf.json'),
  io = require('socket.io')({ transports: ['websocket'] }),
  db = {},
  defaultUser = require('./defaultUser.json'),
  app = express(),
  http_gen = require('./controller/http_gen.js'),
  socket_gen = require('./controller/socket_gen.js')

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status : true })
})

http_gen('users', app, new Datastore(), (app_users, db_users) => {
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
http_gen('articles', app, db.articles, (app_articles, db_articles) => {
  console.log('HTTP: Listen articles...')
})

io.attach(conf.sockets_port)

io.on('connection', (socket) => {
  socket_gen('articles', db.articles, socket)
})

app.listen(conf.http_port, () => {
  console.log(`HTTP: ${conf.http_port} SOCKETS: ${conf.sockets_port}`)
})
