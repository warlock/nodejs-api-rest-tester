module.exports = function (api) {
  api.gen('articles', (socket_articles, db_articles) => {
    console.log('SOCKET: Listening articles...')
  })
}
