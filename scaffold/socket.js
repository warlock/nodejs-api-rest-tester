module.exports = function (api) {
  api.gen('articles', (socket, db) => {
    console.log('SOCKET: Listening articles...')
  })
}
