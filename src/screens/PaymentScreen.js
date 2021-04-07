import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createOrder} from '../actions/orderActions' 
function PaymentScreen() {
    const dispatch = useDispatch()
    const userRole = useSelector((state) => state.userRole)
    const { role } = userRole
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const [paymentMethod, setPaymentMethod] = useState('')
    const [adress, setAdress] = useState('')
    const [totalPrice, setTotalPrice] = useState(cartItems
        .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
        .toFixed(2))
    const [shoeID, setShoeID] = useState([])
    const [quantity, setQuantity] = useState([])


  
   
  
    useEffect(() => {
      
        if (role ) {
         if(role==="ROLE_USER" ||role==="ROLE_ADMIN"){

         }else{
            alert("please signup to proceed to payment") 
            window.location.href = '/'
         }
        }else if(userInfo){
            alert("please signup to proceed to payment") 
            window.location.href = '/'
        }
       
    }, [dispatch, role,userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
       
      
        if(adress=="" || paymentMethod=="")
        {
          alert("all field required")
  
        }
        else{
     
       // (userID,paymentMethod,adress,isDelevired,totalPrice,shoesID,quantity) 
        dispatch(createOrder(userInfo.userid,paymentMethod,
            adress,"false",
            totalPrice,
              cartItems.map(item=>item.product), cartItems.map(item=>item.qty)))
        }
      }
    return (
        <section className="signin-section" style={{minHeight:"100vh"}}>
        <div className="signin-container">
        <form onSubmit={submitHandler}  class="login-form">

        <h1 style={{fontSize:"30px"}}>Payment</h1>

        <div className="txtb">
          <input type="text" id="paymentMethod"   value={paymentMethod}
          onChange={(e)=>{
            setPaymentMethod(e.target.value);
           if(!document.getElementById("paymentMethod").classList.contains("focus"))
            document.getElementById("paymentMethod").classList.add("focus");
            if(document.getElementById("paymentMethod").value==0){
                document.getElementById("paymentMethod").classList.remove("focus");
            }
        }}
          />
          <span data-placeholder="payment Method"></span>
        </div>

        <div className="txtb" >
          <input  id="adress" value={adress}  type="adress" onChange={(e)=>{
            setAdress(e.target.value);
              if(!document.getElementById("adress").classList.add("focus")
              )
              document.getElementById("adress").classList.add("focus");
              if(document.getElementById("adress").value==0){
                document.getElementById("adress").classList.remove("focus");
            }
          }}
          />
          <span data-placeholder="adress"></span>
        </div>

      
          total: ${totalPrice}

          <br/>

        <input type="submit" style={{outline:"solid 1px", width:"100%", height:"50px",fontSize:"30px",background:"none"}} value="Pay"/>

     

     
      </form>

      </div>
      </section>
    )
}

export default PaymentScreen
