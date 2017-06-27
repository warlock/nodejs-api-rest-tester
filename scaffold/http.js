module.exports = api => {
  api.gen('users', (http, db) => {
    
    db.loadDatabase(err => {
      if (err) throw Error(`DB USER: Have a problem loading db ${err}`)
      else {
        db.insert(
          {
            "username" : "user",
            "name" : "user_name",
            "surname" : "user_surname",
            "password" : "password"
          },
          (err, newDoc) => {
            if (err) throw Error(`DB USER: Have a problem inserting in db ${err}!`)
            else console.log(`DB USER: Default user created!`)
          }
        )
      }
    })
  })

  api.gen('articles',  (http, db) => {
    console.log(`HTTP: Listening articles... `)
  })
}
