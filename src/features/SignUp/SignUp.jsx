import React from 'react'
import "./Signup.css"
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigator=useNavigate()
  return (
    <div className='container-fluid signUp_container'>
        <div className="row" >
        <h3 className='mt-5' style={{color:"white",textAlign:"center"}}>Welcome to the </h3>
        <h1 style={{color:"white",textAlign:"center"}}><span style={{color:"#073259"}}>F</span>act<span style={{color:"#073259"}}>B</span>ook</h1>

            <div className="col-sm-12 d-flex justify-content-center">
                <div className='Signup'>
                    <input className='input_feilds' type="text" placeholder='User Name' name="" id=""  /><br />
                    <input className='input_feilds' type="tel" name="" id="" placeholder='Phone Number' /><br />
                    <input className='input_feilds' type="password" placeholder='set Password' /><br />
                    <button className='s_b p-2'>Sign Up</button>
                    <button className='mt-2 mb-2 text-light hove' onClick={()=>navigator("/Login")} style={{border:"none",backgroundColor:"transparent"}}>have an Account "Login"</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}
