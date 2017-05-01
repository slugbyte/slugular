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
    for(let key in style)
      node.style[key] = style[key]

  var classes = options.classes
  delete options.classes

  for(let key in classes){
    if(classes[key])
      node.classList.add(key)
    else 
      node.classList.remove(key)
  }

  return node
}

nodeSetup.setEvents = (node, options) => {
  var events = options.events
  delete options.events

  var slugularEvents = {
    onClick: 'click',
    onDoubleClick: 'dblclick',
    onMouseUp: 'mouseup',
    onMouseDown: 'mousedown',
    onMouseEnter: 'mouseenter',
    onMouseLeave: 'mouseleave',
    onMouseOut: 'mouseout',
    onMouseMove: 'mousemove',
    onMouseOver: 'mouseover',
    onSubmit: 'submit',
    onBlur: 'blur', 
    onError: 'error', 
    onSelect: 'onselect',
    onFocus: 'focus',
    onFocusIn: 'focusin',
    onFocusOut: 'focusout',
    onLoad: 'load',
    onUnload: 'unload',
    onScoll: 'scroll',
    onKeyDown: 'keydown',
    onKeyUp: 'keyup',
    onKeyPress: 'keypress',
    onChange: 'change',
  }

  if(events)
    for(let key in events)
      node.addEventListener(key, events[key])

  for(let key in slugularEvents){
    if(options[key]){
      node.addEventListener(slugularEvents[key], options[key])
      delete options[key]
    }
  }
    

  return node
}
