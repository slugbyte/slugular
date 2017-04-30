'use strict'

const $ = require('../../../src')

const {state, setState} = require('../../lib/store.js')

const NoteCreate = module.exports = () => $.form([
  {name: 'title', placeholder: 'title'},
  {name: 'content', placeholder: 'content'},
  {type: 'submit', value: 'create note'},
], (f) => {
  let note = {
    id: $.hash(),
    title: f.title.value, 
    content: f.content.valuei
  } 
  setState({notes: [note].concat(state.notes)})
})





