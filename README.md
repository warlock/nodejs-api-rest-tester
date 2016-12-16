#Node.js API RESTFULL for Testing
Run the minimal API Restfull in memory database(NeDB) for testing frontend projects.


###Install
```sh
git clone https://github.com/warlock/nodejs-api-rest-tester.git
cd nodejs-api-rest-tester
npm i
```
###Generate models schema
```json
{
  "users": {
    "username" : "string",
    "surname" : "string",
    "password" : "string"
  },
  "articles": {
    "title" : "string",
    "creation" : "date",
    "tags" : "string",
    "content" : "text",
    "author" : "string"
  }
}

```

###Generate http scaffold in 'index.js' after app initialitzation
```js
http_gen('articles',  app, new Datastore(), (app_articles, db_articles) => {
  console.log('Listening http requests for articles...')
})
```

###Generate socket.io scaffold in 'index.js', in io.on listener
```js
socket_gen('articles', db.articles, socket, (socket_articles, db_articles) => {
  console.log('Listening websockets for articles...')
})

```

###Run
```sh
npm start
```

### HTTP API RESTFULL Routes
Articles demo:

| HTTP Route             | Verb  | Description                    |
| ---------------------- |:-----:| ------------------------------:|
| /articles              |  GET  | Get all articles               |
| /articles              |  POST | Create a article               |
| /articles/:article_id  |  GET  | Get a single article           |
| /articles/:article_id  |  POST | Update a article with new info |
| /articles/:article_id  |  POST | Delete article                 |


### SOCKET.IO SCAFFOLD
Articles demo:

| Emit and events   | Description                    |
| ----------------- | ------------------------------:|
| articlesGetAll    | Get all articles               |
| articlesAdd       | Create a article               |
| articlesGet       | Get a single article           |
| articlesUpdate    | Update a article with new info |
| articlesDelete    | Delete article                 |

### Add fast features in HTTP with callback:
```js
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
```

### Add fast features in SOCKET with callback:
```js
socket_gen('articles', new Datastore(), (socket_articles, db_articles) => {
  db_articles.find({ _id : 1 }, (err, docs) => {
    if (err) console.error(`Error... ${err}`)
    else console.log(`Results: ${JSON.stringify(docs}`)
  })
})
```



### Dependencies thanks
- Express.js [http://expressjs.com/](http://expressjs.com)
- Socket.io [http://socket.io](http://socket.io)
- Body-parser [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)
- NeDB [https://github.com/louischatriot/nedb](https://github.com/louischatriot/nedb)
- Spellbook [http://www.spellbook.io](http://www.spellbook.io)
- Nexo [https://github.com/warlock/nexo](https://github.com/warlock/nexo)



###License

The MIT License (MIT) Copyright (c) 2015 Josep Subils Rigau (josep@spellbook.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
