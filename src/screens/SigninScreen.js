import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

function SigninScreen({location,history}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      if (userInfo&&userInfo.userid) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }
    return (
        <section style={{minHeight:"100vh"}} className="signin-section">
        <div className="signin-container">
        <form onSubmit={submitHandler}  class="login-form">

        <h1>Login</h1>

        <div className="txtb">
          <input type="text" id="email"   value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
           if(!document.getElementById("email").classList.contains("focus"))
            document.getElementById("email").classList.add("focus");
            if(document.getElementById("email").value==0){
                document.getElementById("email").classList.remove("focus");
            }
        }}
          />
          <span data-placeholder="Email"></span>
        </div>

        <div className="txtb" >
          <input  id="password" value={password}  type="password" onChange={(e)=>{
            setPassword(e.target.value);
              if(!document.getElementById("password").classList.add("focus")
              )
              document.getElementById("password").classList.add("focus");
              if(document.getElementById("password").value==0){
                document.getElementById("password").classList.remove("focus");
            }
          }}
          />
          <span data-placeholder="Password"></span>
        </div>

        <input type="submit" class="logbtn" value="Login"/>

        <div class="bottom-text">
          Don't have account? <a href="#">Sign up</a>
        </div>

     
      </form>

      </div>
      </section>
    )
}

export default SigninScreen
