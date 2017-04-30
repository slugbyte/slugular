'use strict'

const $ = window.$ = require('../src/index.js')
const {setState, addListner} = require('./lib/store.js')

const Header = require('./component/header')
const NoteCreate = require('./component/note-create')

const App = (state) => {
  return $('div', {
    id: 'root',
    children: [
      Header(state),
      NoteCreate(),
      $.UnorderedList(state.notes.map(item => $('p', item.title)))
    ],
  })
}

// setup a listener for rendering the app on any state changes
addListner((state) => {
  console.log('state', state)
  $.render(App(state), document.body)
})

// trigger a state change to cause the render listener to run once 
// on page load
setState();
