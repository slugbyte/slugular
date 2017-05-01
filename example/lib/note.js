'use strict'

const {setState, state} = require('./store.js')

const NOTE= module.exports = {}

NOTE.create = (note) => {
  setState({notes: [note].concat(state.notes)})
}

NOTE.delete = (note) => {
  setState({notes: state.notes.filter(item => {
    return item.id !== note.id
  })})
}

NOTE.update = (note) => {
  setState({notes: state.notes.map(item => {
    console.log('note', note, item)
    if(note.id == item.id){
      return Object.assign(item, note)
    }
    return item
  })
  })
}
