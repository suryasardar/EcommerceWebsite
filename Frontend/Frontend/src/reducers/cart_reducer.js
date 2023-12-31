import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  SET_CART
} from '../actions'
import axios from 'axios';
import images from '../assets/images';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    console.log(id,amount,product,"idfj");
    const tempItem = state.cart.find((i) => i.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: images[id],
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if (action.type === SET_CART) {
    switch (action.type) {
      // Other cases...
  
      case SET_CART:
        return {
          ...state,
          cart: action.payload,
        };
  
      // Other cases...
  
      default:
        return state;
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    try {
      const itemNameToRemove = action.payload; // assuming action.payload contains the item name or ID
  
      axios.delete(`http://localhost:4000/apis/deletebyname/${itemNameToRemove}`)
        .then(response => {
          console.log('Item removed from server:', response.data);
        })
        .catch(error => {
          console.error('Error removing item from server:', error);
        });
    } catch (error) {
      console.error('Error in try block:', error);
    }
  }
  /////////////////////////////
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    axios.delete('http://localhost:4000/apis/clear')
    .then(response => {
      console.log('Cart cleared:', response.data);
    })
    .catch(error => {
      console.error('Error clearing cart:', error);
    });
    return { ...state, cart: [] };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      { total_items: 0, total_amount: 0 }
    )
    return { ...state, total_items, total_amount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer;