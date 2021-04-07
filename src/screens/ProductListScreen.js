import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
//import Product from '../components/Product'
import Loader from '../components/Loader'
import { Link, Redirect, useHistory} from "react-router-dom";
import {
  listProducts,
  deleteProduct,
  createProduct
  ,updateProduct
} from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {

  const pageNumber = match.params.page || 0

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [productid, setProductid] = useState('')
  const [ formData,setFormData]= useState(new FormData())
  const [ photoName,setPhotoName]=useState('')
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  const userRole = useSelector((state) => state.userRole)
  const { role } = userRole
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


    useEffect(() => {
      
      dispatch(listProducts())
    }, [dispatch])

    const handleChange =  photoName => event => {
     
      const value = photoName === 'photo' ? event.target.files[0] : event.target.value;

      formData.set( "file", value);

      setPhotoName( value);
     
  };

    const deleteProduct=(id)=>{
      dispatch(deleteProduct(id));
    }

    const update=()=>{   
     dispatch(updateProduct(
      document.getElementById("productId").value,
      document.getElementById("category").value,
     document.getElementById("price").value,
      document.getElementById("brand").value,
      document.getElementById("name").value,
      document.getElementById("description").value
      ) )
    }
    const addProduct=()=>{
      let b= document.getElementById("add_brand").value
      formData.append("productDetails",`{"brand":"${String(b)}",
      "category":"${String(  document.getElementById("add_category").value)}",
      "price":"${String( document.getElementById("add_price").value)}",
      "name":"${ String(document.getElementById("add_name").value)}",
      "description":"${  String(       document.getElementById("add_description").value)}"
      }
      `)
      dispatch(createProduct(formData))
    }
    
  return (
    <div style={{minHeight:"100vh"}}>
        <br/>
        <h1>Add Product</h1>
        <br/>
                  <input type="text" id="add_name" placeholder="Name"/>
                  <input type="text" id="add_price" placeholder="Price"/>
                  <input type="text" id="add_category" placeholder="Category"/>
                  <input type="text" id="add_brand" placeholder="Brand"/>
                  <input type="text" id="add_description" placeholder="Description"/>
                  <input type="file"  onChange={handleChange('photo')}
                    id="product" name="photo"
                    accept="image/png, image/jpeg"/>

                  <button onClick={()=>addProduct()}>Add prodcut</button>

                 
          <br/>
          <br/>
          <br/>
          <h1>Products</h1>
       
   {role!="ROLE_ADMIN"? "history.push":""
   }
      {
      loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
              
               
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                {
             products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>
      
                  <button onClick={()=>{
                    document.getElementById("update-form").style.display="block"
                    document.getElementById("productId").value=product.productId
                    document.getElementById("category").value=product.category
                    document.getElementById("price").value=product.price
                    document.getElementById("brand").value=product.brand
                    document.getElementById("name").value=product.name
                    document.getElementById("description").value=product.description
                  
                    
                }}>update</button>
              <Link to={`/shoes/list/${product.productId}`} className="btn btn-primary">Shoes</Link>
                </td>
              </tr>
            ))
                  }
                </tbody>
              </Table>
            
                )}

<br/>
              <div style={{display:"none"}} id="update-form">
                <h1>Update Product</h1>
                <br/>
                  <input type="text" id="productId" style={{display:"none"}}/>
                  <input type="text" id="name" placeholder="Name"/>
                  <input type="text" id="price" placeholder="Price"/>
                  <input type="text" id="category" placeholder="Category"/>
                  <input type="text" id="brand" placeholder="Brand"/>
                  <input type="text" id="description" placeholder="Description"/>
                  <button onClick={()=>update()}>update</button>
                </div>

    </div>
  )
}

export default ProductListScreen
