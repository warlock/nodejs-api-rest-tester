var schema = require('../schema.json')
var sb = require('spellbook')

var check = (val, type) => {
  if (sb.empty(sb.get(sb, `is${sb.capitalize(type)}`))) return val
  else return sb.get(sb, `is${sb.capitalize(type)}`)(val)
}

var res = type => {
  switch (type) {
  case 'string':
    return 'Default string'
  case 'integer':
    return 1
  case 'number':
    return 123
  case 'function':
    return function() {}
  case 'object':
    return { object : 'object' }
  default:
    return 'Unknown type'
  }
}

module.exports = (model, data) => {
  if (Object.keys(schema[model]).length > 0) {
    let obj = {}
    Object.keys(schema[model]).forEach((key) => {
      if (check(data[key], schema[model][key])) obj[key] = data[key]
      else obj[key] = res(schema[model][key])
    })
    return obj
  } else return data
}
