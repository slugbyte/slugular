'use strict'

const $ = require('../../../src');

const {state, setState} = require('../../lib/store.js')

const Header = module.exports =  ({title, navLinks}) => {
  var navAnchors = navLinks.map(item => $('a', { textContent: item.text, href: item.path}))
  return $('header', {
    children: [
      $('h1', {
        textContent: title || '', 
        events: {
          click: () => setState({title: state.title + '!'}),
        },
      }),
      $.input({name: 'title', value: state.title, 
              events: {
                keyup: (e) => {
                  console.log(e) 
                  setState({title: e.target.value})
                }
              }}),
      $('nav', $.unorderedList(navAnchors)),
    ],
  })
}
