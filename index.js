const express = require('express')
const bodyParser = require('body-parser')
const conf = require('./conf.json')
const cors = require('cors')
const io = require('socket.io')({ transports: ['websocket'] })
const app = express()
const http_gen = require('./server/http_gen.js')
const socket_gen = require('./server/socket_gen.js')
const db_gen = require('./server/db_gen.js')
const db = db_gen()
const http_req = require('./scaffold/http.js')
const socket_req = require('./scaffold/socket.js')

app.use(cors())
app.disable('x-powered-by')
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status: true,  info: 'https://www.npmjs.com/package/rxapi' })
})

app.listen(conf.http_port, () => {
  console.log(`HTTP: ${conf.http_port} SOCKETS: ${conf.sockets_port}`)
  http_req(http_gen({ http: app, db: db }))
})

io.attach(conf.sockets_port)

io.on('connection', socket => {
  socket_req(socket_gen({ socket: socket, db: db }))
})
