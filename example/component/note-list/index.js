'use strict'

const Note = require('../note')

const NoteList = module.exports = ({notes}) => {
  return $.UnorderedList(notes.map(note => Note({note})))
}
