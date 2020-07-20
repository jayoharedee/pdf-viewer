let lastId = 0

module.exports = function (postfix = '+') {
  lastId++
  return `${lastId}${postfix}`
}
