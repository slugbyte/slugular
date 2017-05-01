'use strcit'

require('./_note.scss')

const $ = require('../../../src')

const {setState, state} = require('../../lib/store.js')

var deleteNote = (note) => {
  console.log('delte', note)
  setState({notes: state.notes.filter(item => {
    return item.id !== note.id
  })})
}

var updateNote = (note) => {
  setState({notes: state.notes.map(item => {
    console.log('note', note, item)
    if(note.id == item.id){
      return Object.assign(item, note)
    }
    return item
  })
  })
}

var handleSubmit = (f) => updateNote({
          editing: false, 
          title: f.title.value,
          content: f.content.value,
          id: f.getAttribute('noteid')})

const Note = module.exports = ({note}) => {
  var editing = false;;
  return $('div', {
    classes: {
      note: true,
      editing: note.editing,
    },
    attributes: {
      noteid: note.id,
    },
    onDoubleClick: (e) => {
      editing = !editing
      updateNote({id: e.target.getAttribute('noteid'), editing: editing})
    },
    children: [
      $('main', {
        attributes: { noteid: note.id },
        children: [
          $('h2', {
            textContent: note.title,
            attributes: { noteid: note.id },
          }),
          $('p', {
            textContent: note.content,
            attributes: { noteid: note.id },
          }),
          $('button', {
            attributes: {noteid: note.id},
            textContent: 'delete',
            onClick: (e) => deleteNote({id: e.target.getAttribute('noteid')})
          }),
        ]
      }),
      $.Form([
        {name: 'title', value: note.title },
        {name: 'content', value: note.content},
        {
          type: 'button',
          textContent: 'cancel',
          attributes: {noteid: note.id},
          onClick: (e) => updateNote({id: e.target.getAttribute('noteid'), editing: false })
        },
        {type: 'submit', value: 'update note'},
      ], handleSubmit, {attributes: {noteid: note.id}})
    ],
  })
}
