'use strict'


let listners = []
let state  = {};

let setState = (changes) => {
  state = Object.assign(state, changes)
  listners.forEach(cb => cb(state))
}

let addListner = (cb) => {
  if(typeof cb === 'function')
    listners.push(cb)
}

let createStore = module.exports = (initialState) => {
  setState(initialState)

  return {
    state,
    setState,
    addListner,
  }
}
