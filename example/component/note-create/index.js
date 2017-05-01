'use strict'

require('./_note-create.scss')
const $ = require('../../../src')


// TODO: // make an interface for redux-form style controlled forms
// with validation and the works

const {state, setState} = require('../../lib/store.js')

var resetFormState = () => setState({formNoteCreate: {
  title: '',
  content: '',
  contentError: false,
  contentDirty: false,
  titleError: false,
  titleDirty: false,
}})

var handleSubmit = (f) => {
  if(!validate(f.title.value) || !validate(f.content.value)){
    return setState({formNoteCreate: Object.assign(
        state.formNoteCreate,
        {submitted: true, error: true}
      )})
  }

  let note = {
    id: $.hash(),
    title: f.title.value, 
    content: f.content.value,
    complete: false,
    editing: false,
  } 

  setState({notes: [note].concat(state.notes)})
  resetFormState()
}

var controlledInput = (formName, inputName, options={}) => (e) => {
  let validate = (value) => value !== ''
  validate = options.validate || validate

  let change  = {}
  let inputChanges = {}
  inputChanges[inputName] = e.target.value
  inputChanges[inputName + 'Error'] = !validate(e.target.value)

  // only dirty input if user has typed at least one char
  if(!inputChanges[inputName + 'Dirty'] && e.target.value) 
    inputChanges[inputName + 'Dirty'] = true

  change[formName] = Object.assign(state[formName], inputChanges)
  setState(change)
}

let validate = (value) => value.length > 9

const NoteCreate = module.exports = () => $.Form([
  { 
    name: 'title', 
    placeholder: 'title', 
    value: state.formNoteCreate.title,
    classes: {
      error: state.formNoteCreate.error && state.formNoteCreate.titleError || 
        (state.formNoteCreate.error &&!state.formNoteCreate.titleDirty),
    },
    onKeyUp: controlledInput('formNoteCreate', 'title', {validate}),
  },
  {name: 'content', placeholder: 'content', value: state.formNoteCreate.content,
    classes: {
      error: state.formNoteCreate.error && state.formNoteCreate.contentError || 
        (state.formNoteCreate.error &&!state.formNoteCreate.contentDirty),
    },
    onKeyUp: controlledInput('formNoteCreate', 'content', {validate})
  },
  {type: 'submit', value: 'create note'},
], handleSubmit, {className: 'note-create'})

// reset form state on page load
resetFormState()
