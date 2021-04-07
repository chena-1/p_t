import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  logout,getUserDetails,updateUserProfile } from '../actions/userActions'

function ProfileScreen({history,location}) {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDetails= useSelector((state) => state.userDetails)
    const { user,error,loading } = userDetails
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const userUpdateProfile= useSelector((state) => state.userUpdateProfile)
    const {success}=userUpdateProfile
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo&&!userInfo.userid) {
            history.push(redirect)
          }
       
       if(success){
           dispatch(logout())
           alert("update succesfull please logIn again") 
           window.location.href = '/'
       }
        if(userUpdateProfile.error){
           // console.log(userUpdateProfile)
            alert(userUpdateProfile.error)
        }
        if (userInfo) {
          dispatch(getUserDetails(userInfo.userid))
          if(error){ 
            alert(error)
            //document.getElementById("form").style.fontSize="50px"
             // document.getElementById("form").innerHTML=`${error}`;
        }
        else{
            setEmail(user.email)
             setFirstName(user.firstName)
            setLastName(user.lastName)
            }
        }
      
    }, [history, userInfo, redirect,dispatch,error, userInfo,success])
    function checkEmail(e) {

        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(e)) {
            alert('Please provide a valid email address');
            return false;
        }
        return true;
    }
    const submitHandler=(e)=>{
            if(checkEmail(user.email))
            dispatch(updateUserProfile({"userId":userInfo.userid,
            "firstName":firstName,"lastName":lastName,"email":user.email
            }))
            else
            alert("email not valid")
    }

    return (<div>
    
        {user&&!loading?(
         <div id="form" className="profile-form">
    
         <h1>Update Profile</h1>
         <div className="txtb" >
        <input type="text"  id="email"   value={email}
 onChange={(e)=>{
    setEmail(e.target.value);}}
    />
       <span style={{position:"absolute", left:"-250px", bottom:"30px"}} data-placeholder="Email:"></span>

        </div>
        <div className="txtb" >
             <input type="text" id="firstName"   value={firstName}
          onChange={(e)=>{
             setFirstName(e.target.value);}}
             />
  <span style={{position:"absolute", left:"-250px", bottom:"30px"}} data-placeholder="firstName:"></span>
</div>

<div className="txtb" >
              <input type="text" id="lastName"   value={lastName}
          onChange={(e)=>{
             setLastName(e.target.value);}}
             />
                    <span style={{position:"absolute", left:"-250px", bottom:"30px"}} data-placeholder="lastName:"></span>
                    </div>
         <button onClick={submitHandler} style={{outline:"solid 1px"}}  value="Update Profile">Update Profile</button>
         
         
         </div>):""
        }
 </div>
    )
}

export default ProfileScreen
