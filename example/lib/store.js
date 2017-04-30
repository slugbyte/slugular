'use strict';

const $ = require('../../src')

var initalState;

// attempt to load state from store
// if it fails set up the default state
try {
  initalState = JSON.parse(localStorage.state)
} catch (e) {
  console.error('no state found')
  initalState = {
    title: 'notes app',
    navLinks: [
      {text: 'Home', path: '/'},
      {text: 'About', path: '/#about'},
      {text: 'Contact', path: '/#contact'},
    ],
    notes: [],
  }
}

var store = module.exports = $.createStore(initalState)

// add a listener to the store that saves the state to localStorage
// on every change
store.addListner((state) => {
  try {
    localStorage.state = JSON.stringify(state)
  } catch (e) {
    console.error('failed to save state', e)
  }
})
