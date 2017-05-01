'use strict';

const morphdom = require('morphdom')

var nodeSetup = require('./lib/node-setup.js');
var getElementById = require('./lib/get-element-by-id.js')
var getElementsByQuery = require('./lib/get-elements-by-query.js')

const slugular = module.exports = (type, options) => {
  type = type.trim()
  options = options || {}

  if(type.startsWith('#'))
    return getElementById(type)

  if(type.startsWith('?'))
    return getElementsByQuery(type)

  if(type == 'text')
    return document.createTextNode(options)

  var result = document.createElement(type)
  if(typeof options === 'string'){
    result.textContent = options
    return result
  }

  if(options instanceof Element || options instanceof Text){
    result.appendChild(options)
    return result;
    return 
  }

  if(Array.isArray(options))
    return nodeSetup.setChildren(result, options)

  nodeSetup.setAttributes(result, options)
  nodeSetup.setChildren(result, options)
  nodeSetup.setStyles(result, options)
  nodeSetup.setEvents(result, options)

  // set remaining options
  for(var key in options) {
    try {
      result[key] = options[key]
    } catch(e) {
      console.error('fatal attempt to set attribute')
      console.error(e)
    }
  }

  return result
}

slugular.createStore = require('./lib/store.js')

slugular.UnorderedList = (items) => {
  return slugular('ul', items.map(item => slugular('li', [item])))
}

slugular.Input = (config) => {
  if(config.type === 'select'){
    delete config.type
    let options = config.options.map(item => slugular('option', item))
    delete config.options
    config.children = options
    return slugular('select', config)
  }

  if (config.type === 'button'){
    return slugular('button', config)
  }

  return slugular('input', config)
}

slugular.LabelInput = (config) => {
  if(!config.id)
    config.id = btoa(Math.random())

  var label = config.label
  delete config.label
  label = slugular('label', label)
  let children = [ label , slugular.Input(config)]

  if(config.type === 'checkbox') {
    children.reverse()
    label.setAttribute('for', config.id)
  }

  return slugular('fieldset', children)
}

slugular.Form  = (inputs, submitHandler, options={}) => {
  let children = inputs.map(config =>  
                            config.label ? slugular.LabelInput(config) : slugular.Input(config))
  return slugular('form', Object.assign(options, {
    children,
    events: {
      submit: (e) => {
        e.preventDefault()
        submitHandler(e.target, e)
      },
    }
  }))
}

slugular.render = (app, target) => {
  if(!app.id)
    throw new Error('root node of app must set id')
  let container = document.getElementById(app.id)
  if(container)
    return morphdom(container, app)
  target.appendChild(app)
}

slugular.hash = () => btoa(Math.random())

slugular.load = (parent, child) => new Promise((resolve, reject) => {
  parent.appendChild(child)
  child.addEventListener('load', (e) =>  resolve(e))
  child.addEventListener('error', (e) => reject(e))
  child.addEventListener('abort', (e) => reject(e))
})
