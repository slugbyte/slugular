'use strict'

module.exports  = (id) => {
  id = id.slice(1, id.length).trim()
  return document.getElementById(id)
}
