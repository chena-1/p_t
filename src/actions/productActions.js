import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_SHOE_SIZES_REQUEST ,
  PRODUCT_SHOE_SIZES_SUCCESS,
PRODUCT_SHOE_SIZES_FAIL ,

PRODUCT_GET_REVIEW_REQUEST ,
 PRODUCT_GET_REVIEW_SUCCESS,
 PRODUCT_GET_REVIEW_FAIL,

SHOE_CREATE_REQUEST ,
SHOE_CREATE_SUCCESS ,
SHOE_CREATE_FAIL ,


SHOE_UPDATE_REQUEST, 
SHOE_UPDATE_SUCCESS ,
SHOE_UPDATE_FAIL,

} from '../constants/productConstants'
import {URL} from '../constants/envConstants'

export const listProducts = (limit = '10', pageNumber = '0') => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(
      `${URL}api/products?limit=${limit}&page=${pageNumber}`
    )

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  //console.log(`in product details id: ${id}`)
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`${URL}api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: userInfo.authorization,
      },
    }

    await axios.delete(`${URL}api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })
    const productId=""
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
       // Accept: 'application/json',
        Authorization: userInfo.authorization,
      },

    }
  
    const { data } = await axios.post(`${URL}api/products`,formData, config)
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = ( productId,category,price,brand,name,description) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })

   
    const {
      userLogin: { userInfo },
    } = getState()
    //alert(userInfo.authorization)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.authorization,
      },
     
    }

    const { data } = await axios.put(
      `${URL}api/products`, 
      {productId,category,price,brand,name,description},
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
/*
private String productID;
	private String userID;
	private String reviewTitle;
	private String reviewRating;
	private String reviewComment;
*/
export const createProductReview = (review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.authorization,
      },
      body: review
    }
    await axios.post(`${URL}api/reviews`, config)

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getProductShoeSizes = (id) => async (dispatch) => {
 
  try {
    dispatch({ type:  PRODUCT_SHOE_SIZES_REQUEST })

    const { data } = await axios.get(`${URL}api/shoes/${id}`)

    dispatch({
      type: PRODUCT_SHOE_SIZES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_SHOE_SIZES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductReview = (id) => async (dispatch) => {
 
  try {
    dispatch({ type:  PRODUCT_GET_REVIEW_REQUEST })

    const { data } = await axios.get(`${URL}api/reviews/${id}`)

    dispatch({
      type: PRODUCT_GET_REVIEW_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


/**
 * 	private String shoeSize;
	private String shoeQuantity;	
	private String shoeSold;
	private String productId;
 */
  //dispatch(createShoe((match.params.product,size,qty,sold)))
export const createShoe = (productId,shoeSize,shoeQuantity,shoeSold) => async (dispatch, getState) => {
 console.log(productId)
  try {
    dispatch({ type:  SHOE_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.authorization,
      },
     
    }
    const { data } = await axios.post(`${URL}api/shoes`,
    {shoeSize,shoeQuantity,shoeSold,productId},
    config)

    dispatch({
      type: SHOE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHOE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const updateShoe = (shoeSize,shoeQuantity,shoeSold,shoeId,productId) => async (dispatch, getState) => {
  console.log(shoeSize)
  try {
    dispatch({ type:  SHOE_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.authorization,
      },
     
    }
    const { data } = await axios.put(`${URL}api/shoes`,
    {shoeSize,shoeQuantity,shoeSold,productId,shoeId}
    ,config)

    dispatch({
      type: SHOE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHOE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}