import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  shoeUpdateReducer,
  shoeCreateReducer,
  productShoeSizesReducer,
  productGetReviewReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userRoleReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
 // orderDetailsReducer,
 // orderPayReducer,
  //orderDeliverReducer,
  //orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  shoeUpdate:shoeUpdateReducer,
  cart: cartReducer,
  shoeCreate:shoeCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userRole: userRoleReducer,
  orderCreate: orderCreateReducer,
  
  orderList: orderListReducer,
  ShoesSizes:productShoeSizesReducer,
  productReviews:productGetReviewReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const useridFromStorage = localStorage.getItem('userid')
  ? JSON.parse(localStorage.getItem('userid'))
  : null
  const authorizationFromStorage = localStorage.getItem('authorization')
  ? JSON.parse(localStorage.getItem('authorization'))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    
  },
 userLogin:{ userInfo: { 
    userid:useridFromStorage,
    authorization:authorizationFromStorage,
   },}
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
