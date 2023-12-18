import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./screen.css"
import logo from "../components/logo.png"


function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!credentials.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Password validation
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm Password validation
    if (!credentials.geolocation.trim()) {
      newErrors.geolocation = 'Geolocation is required';
      isValid = false;
    } else if (credentials.geolocation.length < 15) {
      newErrors.geolocation = 'Please provide a detailed address for better accuracy';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),

      });
      navigate('/login');
    }
  };

  //   const json = await response.json();
  //   console.log(json);
  //   if (!json.success) {
  //     alert('Enter Valid Credentials');
  //   }

  // };


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error when the input changes
  };

  return (
    <div id="form-ui" className='all'>
      <form action="" method="post" id="form" onSubmit={handleSubmit} >
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">Tiffin <img src={logo} /></div>
            <div id="welcome-line-2">Welcome,
              <div>
                <Link to="/login" className='log' >
                  or login to your account </Link>
              </div>
            </div>
          </div>
          <div id="input-area">
            <div class="form-inp">
              <input placeholder={errors.name ? errors.name : 'Name'}
                type="text" name="name" value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div class="form-inp">
              <input placeholder="ADDRESS"
                type="text" name="geolocation" value={credentials.geolocation}
                onChange={onChange}
              />
              {errors.geolocation && <span style={{color:"#FF0000",fontSize:"small"}}>{errors.geolocation}</span>}

            </div>
            <div class="form-inp">
              <input placeholder="Email"
                type="text" name="email" value={credentials.email}
                onChange={onChange}
              />
              {errors.email && <span style={{color:"#FF0000",fontSize:"small"}}>{errors.email}</span>}

            </div>
            <div class="form-inp">
              <input placeholder="PASSWORD"
                type="password" name="password" value={credentials.password}
                onChange={onChange}
              />
              {errors.password && <span style={{color:"#FF0000",fontSize:"small"}}>{errors.password}</span>}

            </div>
          </div>
          <div id="submit-button-cvr" >
            <button id="submit-button" type="submit">Continue</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
