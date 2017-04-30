'use strict';
module.exports =  (query) => {
  query = query.slice(1, query.length).trim()
  var nodes = document.querySelectorAll(query)
  return Array.prototype.concat.apply([], nodes)
}
