var express = require('express'),
  Datastore = require('nedb'),
  bodyParser = require('body-parser'),
  server = require('./server.json')

var app = express(),
  users = require('./controller/users.js'),
  articles = require('./controller/articles.js')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status : true })
})

users(app, new Datastore())
articles(app, new Datastore())

app.listen(server.http_port, () => {
  console.log(`Server running port ${server.http_port}`)
})
