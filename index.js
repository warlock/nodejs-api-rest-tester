const express = require('express'),
  bodyParser = require('body-parser'),
  conf = require('./conf.json'),
  cors = require('cors'),
  io = require('socket.io')({ transports: ['websocket'] }),
  app = express(),
  http_gen = require('./server/http_gen.js'),
  socket_gen = require('./server/socket_gen.js'),
  db_gen = require('./server/db_gen.js'),
  db = db_gen(),
  http_req = require('./scaffold/http.js'),
  socket_req = require('./scaffold/socket.js')

app.use(cors())
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status : true,  info : 'https://www.npmjs.com/package/rxapi' })
})

app.listen(conf.http_port, () => {
  console.log(`HTTP: ${conf.http_port} SOCKETS: ${conf.sockets_port}`)
  http_req(http_gen({ http : app, db : db }))
})

io.attach(conf.sockets_port)

io.on('connection', socket => {
  socket_req(socket_gen({ socket : socket, db : db }))
})
