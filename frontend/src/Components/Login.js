import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [values, setValues] = useState({email: '', password: ''})
const navigate = useNavigate()

const handleChange = (event) => {
    event.preventDefault();
    setValues({...values, [event.target.name]: event.target.value})
}

const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: values.email, password: values.password})

    })

    const data = await response.json();
    if(data.authToken){
      localStorage.setItem("auth-Token", data.authToken)
      navigate('/product')
    }

}

  return (
    <div className="login">

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput2" name="email" onChange={handleChange}/>
</div>

<label for="inputPassword5" className="form-label">Password</label>
<input type="password" id="inputPassword5" className="form-control" name="password" onChange={handleChange}></input>


<button type="button" className="btn btn-primary btns my-4" onClick={handleLogin}>Login</button>

    </div>
  )
}

export default Login;