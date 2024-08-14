import React, { useState } from 'react'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo.webp'
const LoginPage = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const [auth, setAuth] = useAuth();

  const handleOnChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:8700/api/v1/auth/login",{ email: credentials.email, password: credentials.password });
      if(response && response.data.success){
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token
        })
        localStorage.setItem('auth', JSON.stringify(response.data))
        window.alert(response.data.message)
        navigate('/')
      }
      else{
        window.alert(response.data.message)
      }
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }

  return (
    <div className='container'>
      <div>
      <nav class="navbar bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand">
      <img src={logo} alt="Bootstrap" width="50" height="50" />
    </a>
  </div>
</nav>
      </div>
      <div className="header">
        LogIn
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputField">
          <div className="usernameField">
            <label htmlFor="username">User Name</label>
            <input type="email" className="form-control" id="email" name='email' required onChange={handleOnChange}/>
          </div>
          <div className="passwordField">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name='password' placeholder='Enter Password' required onChange={handleOnChange}/>
          </div>
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
