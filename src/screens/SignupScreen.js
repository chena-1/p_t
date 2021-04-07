import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

function SignupScreen({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
        alert("password dont match")
      }
      else
      if(firstName=="" || lastName==""||email==""||password=="")
      {
        alert("all field required")

      }
      else if(!validateEmail(email)){
        alert("email not valid")
      }
      else{
      dispatch(register(firstName,lastName,email, password))
      }
    }
    return (
        <section style={{minHeight:"100vh"}}  className="signup-section">
        <div className="signup-container">
        <form onSubmit={submitHandler} class="login-form">

        <h1>Signup</h1>
        <div className="txtb">
          <input type="text" id="firstName"   
          onChange={(e)=>{
            setFirstName(e.target.value);
           if(!document.getElementById("firstName").classList.contains("focus"))
            document.getElementById("firstName").classList.add("focus");
            if(document.getElementById("firstName").value==0){
                document.getElementById("firstName").classList.remove("focus");
            }
        }}
          />
          <span data-placeholder="FirstName"></span>
        </div>
        
        <div className="txtb">
          <input type="text" id="lastName"   
          onChange={(e)=>{
            setLastName(e.target.value);
           if(!document.getElementById("lastName").classList.contains("focus"))
            document.getElementById("lastName").classList.add("focus");
            if(document.getElementById("lastName").value==0){
                document.getElementById("lastName").classList.remove("focus");
            }
        }}
          />
          <span data-placeholder="LastName"></span>
        </div>


        <div className="txtb">
          <input type="text" id="email"   
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
          <input  id="password"  type="password" onChange={(e)=>{
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

        <div className="txtb" >
          <input  id="confirmPassword"  type="password" onChange={(e)=>{
              setConfirmPassword(e.target.value);
              if(!document.getElementById("confirmPassword").classList.add("focus")
              )
              document.getElementById("confirmPassword").classList.add("focus");
              if(document.getElementById("confirmPassword").value==0){
                document.getElementById("confirmPassword").classList.remove("focus");
            }
          }}
          />
          <span data-placeholder="confirmPassword"></span>
        </div>

        <input type="submit" class="logbtn" value="Signup"/>
      </form>

      </div>
      </section>
    )
}

export default SignupScreen
