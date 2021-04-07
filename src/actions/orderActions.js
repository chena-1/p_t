import {URL} from '../constants/envConstants'
import {ORDER_CREATE_REQUEST ,
 ORDER_CREATE_SUCCESS ,
 ORDER_CREATE_FAIL ,


 ORDER_LIST_REQUEST ,
 ORDER_LIST_SUCCESS ,
 ORDER_LIST_FAIL,
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (userID,paymentMethod,adress,isDelevired,totalPrice,shoesID,quantity) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.authorization,
      },
    }
    let orderTime=''
    const { data } = await axios.post(`${URL}api/orders`,
    {userID,orderTime,paymentMethod,adress,isDelevired,totalPrice,shoesID,quantity},  
     config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrders = (userID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: userInfo.authorization,
      },
    }

    const { data } = await axios.get(`${URL}api/orders/${userID}`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
