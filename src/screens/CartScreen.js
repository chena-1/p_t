import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id,size) => {
    dispatch(removeFromCart(id,size))
  }

  const checkoutHandler = () => {
    history.push('/payment')
  }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{fontSize:"30px", margin:"20px"}}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image.split("public")[1]} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    qty:<Form.Control
                      as='select'  
                    >
                        
                        <option>
                        {item.qty}
                        </option>
                    
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    size:<Form.Control
                      as='select'  
                    >
                        <option>
                        {item.size}
                        </option>
                     
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      style={{outline:"solid 1px", margin:" 10px 0"}}
                      onClick={() => removeFromCartHandler(item.product,item.size)}
                    >
                    remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({Number(cartItems.reduce((acc, item) => acc + Number(item.qty), 0))})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                style={{outline:"solid 1px", margin:"10px 0"}}
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
               
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
   
    </Row>
  )
}

export default CartScreen
