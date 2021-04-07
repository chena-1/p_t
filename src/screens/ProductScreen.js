import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    listProductDetails,
    getProductShoeSizes,
    getProductReview,
  } from '../actions/productActions'
  import Product from '../components/Product'
import {addToCart} from '../actions/cartActions'
import StarRatingComponent from 'react-star-rating-component';

function ProductScreen({ history, match }) {
 
    const pageNumber = match.params.page || 1

    const dispatch = useDispatch()
    const productReviews = useSelector((state) => state.productReviews)

    const {  reviews=[]} = productReviews 
    const userRole = useSelector((state) => state.userRole)
    const { role } = userRole
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, product} = productDetails
    const shoesSizes = useSelector(state =>state.ShoesSizes)
    const {shoes}=shoesSizes
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [value, setValue] = useState(0)
    const [isDoneReview, setIsDoneReview] = useState(false)
    useEffect(() => {
       dispatch (getProductReview(match.params.product))
      dispatch(  listProductDetails(match.params.product))
      dispatch(getProductShoeSizes(match.params.product))
        
        for(let i=0;i<reviews.length;i++){
          if(reviews[i].userID===userInfo.userid)
          setIsDoneReview(true)
        }
    }, [dispatch])
    const addProductToCart=((product,size,qty) => {
      let id=''
      for(let i=0;i<shoes.length;i++)
      if(shoes[i].shoeSize===size)
      id=shoes[i].shoeId
     
        dispatch(addToCart(id,product,size,qty))
    })
    function addShoeSize(size,qty) {
        var x = document.getElementById("shoeSize");
       
        var option = document.createElement("option");
        option.text = size;
      if(x){
         
        for(let i=0;i<x.length;i++){
        if(x[i].text===size){return}
       

        }
        x.add(option);
        //addShoeQty(qty)
      }
      }
    function addShoeQty(qty) {
        document.getElementById("shoeQty").innerText = null;
        var x = document.getElementById("shoeQty");    
        for(var i=1;i<=qty;i++)
        {
        var option = document.createElement("option");
        option.text = i;
        x.add(option);
        }
    }
      function onStarClick(nextValue, prevValue, name) {
        setValue(nextValue)
      }
    return (
        <div style={{margin:"auto", minHeight:"100vh"}}>
         
            <div style={{display:"flex",alignItemsasd:"center",flexDirection:"column"}}>
            {
                Product({product})               
            }
           
              <br/>
              <table>
             
            size:
             <select st id="shoeSize" onChange={()=>addShoeQty((shoes.filter(
               (shoe)=>shoe.shoeSize===document.getElementById("shoeSize").value)[0].shoeQuantity
             -(shoes.filter(
              (shoe)=>shoe.shoeSize===document.getElementById("shoeSize").value)[0].shoeSold)
             ))} size="1">
                 <option>-</option>
             </select>   
             qty:
             <select st id="shoeQty" size="1">       
             </select>
            {
           
                shoes?shoes.map((shoe)=>((shoe.shoeQuantity-shoe.shoeSold)>0?addShoeSize(shoe.shoeSize,shoe.shoeQuantity):'')):''
            }
         
            <button id="add_to_cart" style={{marginLeft:"20px",fontSize:"20px",background:"none",outline:"solid 1px"}} onClick={()=>addProductToCart(match.params.product,document.getElementById("shoeSize").value,document.getElementById("shoeQty").value)}>ADD TO CART</button>
         
            </table>
            </div>
            <br/>
            <br/>
             {
            !isDoneReview&&role=="ROLE_USER"? <h1>Write new review</h1>:''
             }
            {
          
               !isDoneReview&&role=="ROLE_USER"?(<div>
                  <StarRatingComponent 
          name="1" 
          starCount={5}
          value={value}
          onStarClick={ onStarClick.bind(this)}
        />
        <br/>
        <input  style={{outline:"solid 1px"}} type="text" id="review_title" placeholder="title"/>
        <br/> <br/>
        <textarea style={{outline:"solid 1px"}} id="review_comment" placeholder="comment"/>
        <br/> 
        <button id="add_review" style={{fontSize:"20px",background:"none",outline:"solid 1px"}} onClick={()=>addProductToCart(match.params.product,document.getElementById("shoeSize").value,document.getElementById("shoeQty").value)}>ADD REVIEW</button>
        <br/> <br/>
              </div>):''

        


            }



<h1 style={{margin:"10px 0"}}>Reviews</h1>
            { 
                reviews.length>0 ?reviews.map((review)=>(
                   <div style={{margin:"10px 0"}}>
                     <tr>Rating: <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={review.reviewRating}
         
          editing={false}
        /></tr>  
                        <tr>
               Title: {review.reviewTitle}
            </tr>
                  <tr>
               Comment: {review.reviewComment}</tr>
               </div >
                )):""
            
             
                }

        </div>
    )
}

export default ProductScreen

/**
 *             <h1>Write a review</h1>
                 <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={value}
          onStarClick={onStarClick.bind(this)}
          editing={true}
        />
 */