import React, { useState, useEffect } from 'react';
import "./component.css";
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import logo from "./logo.png";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  // Add event listener to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-success${scrolled ? ' fixed-top' : ''}`}>
        <div className="container-fluid">
          <Link className="logo" to="/">
            <img src={logo} alt="Logo" />
          </Link>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
            </div>
            :
            <div className='naa'>
              <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                My Cart {" "}
                <Badge pill bg="danger"> {data.length} </Badge>
              </div>
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}
              <div>
                <button className="Btn" onClick={handleLogout}>
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="text">Logout</div>
                </button>
              </div>
            </div>
          }
        </div>
      </nav>
    </div>
  );
}
