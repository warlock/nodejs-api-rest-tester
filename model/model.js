var sb = require('spellbook')

module.exports = {
  user : (body) => {
    return {
      username : sb.empty(body.username)?'username_default':body.username,
      name : sb.empty(body.name)?'name_default':body.name,
      surname : sb.empty(body.surname)?'surname_default':body.surname,
      password : sb.empty(body.password)?'surname_default':body.password
    }
  },
  article : (body) => {
    return {
      title : sb.empty(body.title)?'title_default':body.title,
      creation : new Date(),
      tags : sb.empty(body.tags)?['General']:body.tags,
      content : sb.empty(body.content)?'content_default':body.content,
      author : sb.empty(body.author)?'author_default':body.author
    }
  }
}
