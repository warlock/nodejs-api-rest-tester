module.exports = function (http, gen) {
  gen('users', http, (http_users, db_users) => {
    db_users.loadDatabase((err) => {
      if (err) throw Error(`DB USER: Have a problem loading db ${err}`)
      else {
        db_users.insert(
          {
            "username" : "user",
            "name" : "user_name",
            "surname" : "user_surname",
            "password" : "password"
          },
          (err, newDoc) => {
          if (err) throw Error(`DB USER: Have a problem inserting in db ${err}!`)
          else console.log(`DB USER: Default user created!`)
        })
      }
    })
  })

  gen('articles', http, (http_articles, db_articles) => {
    console.log(`HTTP: Listening articles... `)
  })
}
