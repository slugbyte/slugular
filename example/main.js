'use strict'

require('./style/main.scss')

const $ = window.$ = require('../src/index.js')
const {state, addListner} = require('./lib/store.js')

const Header = require('./component/header')
const NoteCreate = require('./component/note-create')
const NoteList = require('./component/note-list')

// app mush have one root level component
const App = (state) => {
  return $('div', {
    id: 'root',
    children: [
      Header(state),
      NoteCreate(state),
      NoteList(state),
    ],
  })
}

// initalise the app with the stores state
// add the app to the dom
let root = App(state)
document.body.appendChild(root)

// on every state change to the store 
// render any changes to the app
addListner((state) => {
  console.log('state', state)
  $.render(root, App(state))
})
