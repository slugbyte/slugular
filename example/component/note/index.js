'use strcit'

require('./_note.scss')
const $ = require('../../../src')
const NOTE = require('../../lib/note.js')

var handleSubmit = note => f => NOTE.update({
          id: note.id,
          editing: false, 
          title: f.title.value,
          content: f.content.value})

const Note = module.exports = ({note}) => {
  return $('div', {
    classes: {
      note: true,
      editing: note.editing,
    },
    onDoubleClick: (e) => NOTE.update({id: note.id, editing: !note.editing}),
    children: [
      $('main', {
        children: [
          $('h2', note.title),
          $('p', note.content),
          $('button', {
            textContent: 'delete',
            onClick: (e) => NOTE.delete({id: note.id})
          }),
        ]
      }),
      $.Form([
        {name: 'title', value: note.title },
        {name: 'content', value: note.content},
        {
          type: 'button',
          textContent: 'cancel',
          onClick: (e) => NOTE.update({id: note.id , editing: false })
        },
        {type: 'submit', value: 'update note'},
      ], handleSubmit(note))
    ],
  })
}
