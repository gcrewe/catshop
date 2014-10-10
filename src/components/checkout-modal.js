/** @jsx React.DOM */

var React = require('react')
var Modal = require('react-bootstrap').Modal
var addresses = require('@addresses')
var CheckoutCart = require('./checkout-cart')
var CheckoutQr = require('./checkout-qr')


var CheckoutModal = React.createClass({
  getInitialState: function() {
    return {
      screen: 'cart'
    }
  },

  onCheckout: function() {
    this.setState({
      screen: 'checkout'
    })
  },

  render: function() {
    var totalPrice = this.props.products.reduce(function(price, product) {
      //money and floats/doubles.... fortunately this isn't really money
      return parseFloat((price + product.price).toFixed(3))
    }, 0)

    var contents
    if (this.state.screen === 'cart') {
      contents = <CheckoutCart
        products={this.props.products}
        onCheckout={this.onCheckout}
        totalPrice={totalPrice}
        onRequestHide={this.props.onRequestHide} />
    } else {
      contents = <CheckoutQr
        address={addresses.getPaymentAddress()}
        totalPrice={totalPrice}
        onRequestHide={this.props.onRequestHide} />
    }

    return this.transferPropsTo(
      <Modal title="Cart">
        { contents }
      </Modal>
    )
  }
})

module.exports = CheckoutModal