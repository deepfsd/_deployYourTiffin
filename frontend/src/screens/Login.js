import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./screen.css"
import logo from "../components/logo.png"


function Login() {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert('Enter Valid Credentials');
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (

    <div id="form-ui" className='all'>
      <form action="" method="post" id="form" onSubmit={handleSubmit}>
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">Tiffin <img src={logo}/> </div>
            <div id="welcome-line-2">Welcome </div>
          </div>
          <div id="input-area">
            <div class="form-inp">
              <input placeholder="Email Address" type="text" name="email"
                value={credentials.email}
                onChange={onChange} />
            </div>
            <div class="form-inp">
              <input placeholder="Password" type="password" name="password" 
              value={credentials.password}
                onChange={onChange}
              />
            </div>
          </div>
          <div id="submit-button-cvr">
            <button id="submit-button" type="submit">Login</button>
          </div>
          <Link to="/createuser">
            <button class="signupBtn">
              Sign up
              <span class="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="rgb(183, 128, 255)"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>
              </span>
            </button>


          </Link>
          <div id="bar"></div>
        </div>
      </form>
    </div>
  )
}

export default Login
