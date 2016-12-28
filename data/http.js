module.exports = function (app, gen) {
gen('users', app, (app_users, db_users) => {
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

gen('articles', app, (app_articles, db_articles) => {
  console.log('HTTP: Listen articles...')
})

}
