'use strict';

var nodeSetup = module.exports = {}

nodeSetup.setChildren = (node, options) => {
  var children
  if(Array.isArray(options)){
    children = options
  } else {
    children = options.children
    delete options.children
  }

  if(children)
    children.forEach(child => {
      node.appendChild(child)
    })

    return node
}

nodeSetup.setAttributes = (node, options) => {
  var attributes = options.attributes
  delete options.attributes

  if(attributes)
    for(var key in attributes)
      node.setAttribute(key, attributes[key])

  return node
}

nodeSetup.setStyles = (node, options) => {
  var style = options.style
  delete options.style

  if(style)
    for(var key in style)
      node.style[key] = style[key]

  return node
}

nodeSetup.setEvents = (node, options) => {
  var events = options.events
  delete options.events

  if(events)
    for(var key in events)
      node.addEventListener(key, events[key])

  return node
}
