module.exports = function (socket, gen) {
  gen('articles', socket, (socket_articles, db_articles) => {
    console.log('SOCKET: Listening articles...')
  })
}
