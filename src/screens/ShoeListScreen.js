import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getProductShoeSizes,createShoe,updateShoe} from '../actions/productActions'
//getProductShoeSizes
function ShoeListScreen({ match }) {
   

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
    const shoesSizes = useSelector(state =>state.ShoesSizes)
    const {shoes}=shoesSizes
  
      useEffect(() => {
        
        dispatch(getProductShoeSizes(match.params.product))
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
      //(shoeSize,shoeQuantity,shoeSold,shoeId,productId) 
       dispatch(updateShoe(
        document.getElementById("shoeSize").value,
        document.getElementById("shoeQuantity").value,
        document.getElementById("shoeSold").value,
        document.getElementById("shoeId").value,
        match.params.product
        ) )
      }  
      const addShoe=(size,qty,sold)=>{
        console.log(size)
        console.log(match.params.product)
       if((shoes.filter((shoe)=>shoe.shoeSize==size)).length===0){
         // (productId,shoeSize,shoeQuantity,shoeSold) 
        dispatch(createShoe(match.params.product,size,qty,sold))
       }
      }

    return (
        <div style={{minHeight:"100vh"}}>
       <br/>
       <h1>Add Shoe</h1>
        <br/>
                  <input type="text" id="add_shoe_size" placeholder="size"/>
                  <input type="text" id="add_quantity" placeholder="quantity"/>
                  <input type="text" id="add_shoe_sold" placeholder="shoes sold"/>

                  <button onClick={()=>addShoe(
                     document.getElementById("add_shoe_size").value,
                     document.getElementById("add_quantity").value,
                     document.getElementById("add_shoe_sold").value
                     )}>Add shoe</button>

                 
          <br/>




           <table style={{width:"100%", alignItems:"center",alignContent:"center",border:"solid 1px"}}>
           <thead style={{width:"100%", alignItems:"center",alignContent:"center",border:"solid 1px"}}>
 <tr >
   <th>ID</th>
   <th>SIZE</th>
   <th>QUANTITY</th>
   <th>SHOESOLD</th>
  
 </tr>
</thead>
            {

               shoes.map((shoe)=>
                <tr >
                   <td>{shoe.shoeId}</td> 
              <td>{shoe.shoeSize}</td> 
              <td>{shoe.shoeQuantity}</td> 
             
              <td>{shoe.shoeSold}</td> 
              <td> <button onClick={()=>{
                    document.getElementById("update-form").style.display="block"
                    document.getElementById("shoeId").value=shoe.shoeId
                    document.getElementById("shoeSize").value=shoe.shoeSize
                    document.getElementById("shoeQuantity").value=shoe.shoeQuantity
                    document.getElementById("shoeSold").value=shoe.shoeSold
                    
                  
                    
                }}>update</button></td>
               </tr>

               )
            }
             </table>
             <br/>
              <div style={{display:"none"}} id="update-form">
                <h1>Update Product</h1>
                <thead style={{width:"100%", alignItems:"center",alignContent:"center",border:"solid 1px"}}>
            <tr >
   <th>ID</th>
   <th>QUANTITY</th>
   <th>SHOESOLD</th>
  
 </tr>
                <br/>
                <tr>
                <td> <input type="text" id="shoeId" /></td> 
                 <input type="text" id="shoeSize" placeholder="shoe size"style={{display:"none"}}  />
                 <td><input type="text" id="shoeQuantity" placeholder="shoe quantity"/></td> 
                 <td> <input type="text" id="shoeSold" placeholder="shoe sold"/></td> 
                  
                 <td> <button onClick={()=>update()}>update</button></td> 
                  </tr>
                  </thead>
                </div>
        </div>
       
    )
}

export default ShoeListScreen
