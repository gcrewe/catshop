/** @jsx React.DOM */

//Browserify buffer toJSON is not Node compatible, we remove it so we can
//safely stringify on our own
delete Buffer.prototype.toJSON

var React = require('react')
var App = require('./components/app')
var catData = require('./cat-data')
var storage = require('@storage')

var NUM_CATS = 6
var LOW_PRICE = 0.001 //cheap cat :)
var HIGH_PRICE = 0.05

var cats = catData.getCats(NUM_CATS, LOW_PRICE, HIGH_PRICE)


//for easy experimentation from the browser console
window.React = React
window.App = App
window.Buffer = Buffer //(from Browserify)
window.cats = cats
window.storage = storage

React.renderComponent(
  <App products={cats} />,
  document.querySelector('.app')
)


