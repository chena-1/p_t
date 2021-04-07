import React, { useState ,useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { logout,getUserRole } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'



const Header =()=>{
    const [values, setValues] = useState({
        search: "",
        result:"",
        togger:"menu-toggler",
        mainnav:"main-nav"
    });
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userRole = useSelector((state) => state.userRole)
    const { role } = userRole
  
    const {search,result, togger,mainnav}=values;
   
    const logoutHandler = () => {
        dispatch(logout())
      }
    useEffect(() => {
      
        if (userInfo) {
           // console.log(`in userInfo header ${userInfo.userid}`)
          dispatch(getUserRole(userInfo.userid))
       
        }
    }, [dispatch, userInfo])

   let togglerClass="menu-toggler";
   let mainnavClass="main-nav";
   const changeLink=(e)=>{
    e.preventDefault();
    if(window.innerWidth<600)
    setValues({togger:"menu-toggler",mainnav:"main-nav "});
   }

   const changeStyle=(e)=>{
    e.preventDefault();
    if(togger==="menu-toggler")
    setValues({togger:"menu-toggler active", mainnav:"main-nav active"});
    else
    setValues({togger:"menu-toggler",mainnav:"main-nav "});
   }
        return (
     <div className="wrapmenu" >
   
     
      <nav className={mainnav}>
        <ul className="menu" >
       
        
        <li className="menu" onClick={changeLink} ><Link  to="/" className="link">Home</Link></li> 
        <li className="menu" onClick={changeLink}><Link to="/cart"   className="link">Cart</Link></li> 
       {/**geust */} 
       {userInfo&&Object.keys(userInfo).includes('userid')&&!userInfo.userid?
       <li className="menu" onClick={changeLink}><Link to="/signup"   className="link">Signup</Link></li>:"" 
        }
        {
         userInfo&&Object.keys(userInfo).includes('userid')&&!userInfo.userid?
         <li className="menu" onClick={changeLink}><Link to="/signin"   className="link">Signin</Link></li>:""

        }

        {/**user */}

        {role=="ROLE_USER"?         <li className="menu" onClick={logoutHandler}><Link  onClick={()=>window.location.reload()}  className="link">Logout</Link></li>:""}
        {role=="ROLE_USER"?         <li className="menu" ><Link to="/profile"  className="link">Profile</Link></li>:""}
        {/**admin*/}
     
        {role=="ROLE_ADMIN"?         <li className="menu" onClick={logoutHandler}><Link  onClick={()=>window.location.reload()}  className="link">Logout</Link></li>:""}
     
        {role=="ROLE_ADMIN"?         <li className="menu" ><Link to="/products/list"  className="link">products pannel</Link></li>:""}
      
       
        </ul>
   

        </nav>
    </div>
    );
    
  
}

export default Header;
