import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'
import {URL} from '../constants/envConstants'


export const addToCart = (shoeID,id, size,qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${URL}api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product:shoeID,
      size: size,
      image: data.image,
      price: data.price,   
      qty:qty
    },
  })
 
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id,size) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {product:id,
      size:size
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



