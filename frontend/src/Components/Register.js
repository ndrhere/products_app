import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
const [values, setValues] = useState({name: '', email: '', password: '', role: 'user'})
const navigate = useNavigate()

const handleChange = (event) => {
    event.preventDefault();
    setValues({...values, [event.target.name]: event.target.value})
}

const handleClick = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: values.name, email: values.email, password: values.password, role: values.role})

    })

    const data = await response.json();
    if(data.authToken){
      navigate('/login')
    }

}

  return (
    <div className="register">
<div className="mb-3 my-3">
  <input type="text" className="form-control my-3" id="exampleFormControlInput1" name="name" placeholder="Enter your name " onChange={handleChange}/>
</div>

<div className="mb-3 my-3">
  <input type="email" className="form-control my-3" id="exampleFormControlInput2" name="email" placeholder="Enter your email " onChange={handleChange}/>
</div>

<input type="password" id="inputPassword5 my-3" className="form-control" name="password" placeholder="Enter your password" onChange={handleChange}></input>

<div className="form-group">
  
  <select className="form-control my-4" id="role" name="role" placeholder="Enter your role" defaultValue="user" onChange={handleChange}>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</div>

<button type="button" className="btns btn btn-primary my-4" onClick={handleClick}>Register</button>

    </div>
  )
}

export default Register