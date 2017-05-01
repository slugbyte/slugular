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
    title: '(edit me) two way data binding',
    navLinks: [
      {text: 'Contact', path: ''},
      {text: 'About', path: ''},
      {text: 'Home', path: ''},
    ],
    notes: [ 
      {
        id: $.hash(),
        editing: false,
        title: 'Create a note, make sure title and content are 10 characters',
        content: 'Click delete to remove a note',
      },
      {
        id: $.hash(),
        editing: true,
        title: 'Double click notes to edit them',
        content: 'Change my text',
      },
    ],
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
