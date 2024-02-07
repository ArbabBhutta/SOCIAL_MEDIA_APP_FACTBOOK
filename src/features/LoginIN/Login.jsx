import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAsyncUser, fetchAsyncUsers } from '../Accounts/AccountsSlice'
import Cookies from "universal-cookie";
import "../SignUp/Signup.css"


export default function Login(props) {
  const {setLogged}=props
  const [signInUP,setSignInUp]=useState(false)
  const SignSetter=()=>{
    setSignInUp(!signInUP)
  }
  const dispatch=useDispatch()
  const [signUserName,setUserName]=useState("")
  const [PasswordSet,setPasswordSet]=useState('')
  const [numberSet,setNumberSet]=useState('')
  const [checkUserName,setCheckUser]=useState('')
  const [chechPassword,setCheckPassword]=useState('')
  const UserNameCookie=new Cookies()

  const SignUpHandler=()=>{
    const UserInfo={
      userName:signUserName,
      phone:numberSet,
      Password:PasswordSet,
      friends:[],
      ProfilePic:""
    }
    dispatch(addAsyncUser(UserInfo))
    alert("You are Registered now please Sign in")
    setSignInUp(!signInUP)
  }
  useEffect(()=>{
    dispatch(fetchAsyncUsers())
  },[dispatch])


const UserList=useSelector(state=>state.user.Users)
const SignInHandler =()=>{
 const checker= UserList.filter((check)=>check.Password===chechPassword && check.userName===checkUserName)
 if (checker.length > 0) {
   setLogged(true);
  UserNameCookie.set("USER-NAME",checkUserName)

  
} else {
  alert("UserName or Password is incorrect");
 
}
}


  return (
    <div>
        {signInUP?<>
          <div className='container-fluid signUp_container'>
        <div className="row" >
        <h3 className='mt-5' style={{color:"white",textAlign:"center"}}>Welcome Back to </h3>
        <h1 style={{color:"white",textAlign:"center"}}><span style={{color:"#073259"}}>F</span>act<span style={{color:"#073259"}}>B</span>ook</h1>

            <div className="col-sm-12 d-flex justify-content-center">
                <div className='Signup'>
                    <input className='input_feilds' type="text" value={checkUserName} onChange={(e)=>setCheckUser(e.target.value)} placeholder='User Name' name="" id=""  /><br />
                    <input className='input_feilds' type="password" value={chechPassword} onChange={(e)=>setCheckPassword(e.target.value)} placeholder=' Password' /><br />
                    <button className='s_b p-2' onClick={SignInHandler}>Sign In</button>
                    <button className='mt-2 mb-2 text-light hove' onClick={SignSetter}  style={{border:"none",backgroundColor:"transparent"}}>Don't have an Account "please Sign up"</button>
                </div>
            </div>
        </div>
        
    </div></>:
      <>
       <div className='container-fluid signUp_container'>
        <div className="row" >
        <h3 className='mt-5' style={{color:"white",textAlign:"center"}}>Welcome to the </h3>
        <h1 style={{color:"white",textAlign:"center"}}><span style={{color:"#073259"}}>F</span>act<span style={{color:"#073259"}}>B</span>ook</h1>

            <div className="col-sm-12 d-flex justify-content-center">
                <div className='Signup'>
                    <input className='input_feilds' type="text" placeholder='User Name' name="" id="" onChange={(e)=>setUserName(e.target.value)}  /><br />
                    <input className='input_feilds' type="tel" name="" id="" placeholder='Phone Number' onChange={(e)=>setNumberSet(e.target.value)} /><br />
                    <input className='input_feilds' type="password" placeholder='set Password' onChange={(e)=>setPasswordSet(e.target.value)} /><br />
                    <button className='s_b p-2' onClick={SignUpHandler}>Sign Up</button>
                    <button className='mt-2 mb-2 text-light hove' onClick={SignSetter} style={{border:"none",backgroundColor:"transparent"}}>have an Account "Login"</button>
                </div>
            </div>
        </div>
        
    </div>
      </>
    }
    </div>
  )
}
