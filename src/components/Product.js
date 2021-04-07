import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
function Product({product}) {
    //const url=".."+product.image.split("src")[1].split(String.fromCharCode(92)).join("/")
  /*  for(let key of Object.keys(product)){
        console.log( Object.keys(product).includes('image')); // will only log object's Own properties
      }*/
      console.log(product)
    return (
   
        Object.keys(product).includes('image')?
        (
        <Card className='my-3 p-3 rounded' >
        <Link to={`/product/${product.productId}`}>
          <Card.Img src={product.image.split("public")[1]} variant='top' />
        </Link>
  
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
           
          brand: {`${product.brand}`}

       </Card.Text>
          <Card.Text as='div'>
           
          category: {`${product.category}`}

       </Card.Text>
          <Card.Text as='div'>
           
            description:  {`${product.description}`}

          </Card.Text>
  
          <Card.Text as='h3'>${product.price}</Card.Text>
        </Card.Body>
      </Card>):""
        
    )
        
}

export default Product
