import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { Link, useHistory} from "react-router-dom";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'

export default function ShopScreen({ history, match }) {
    const pageNumber = match.params.page || 0

    const dispatch = useDispatch()
  
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        //console.log(match)
      dispatch(listProducts("10",pageNumber))
    }, [dispatch])


    return (
       
      
       
        <tbody id="products-shop" >
          {products.map((product) => (
            <tr >
             <td>{Product({product})}</td>
            </tr>
          ))}
        </tbody>
    
    )
}
