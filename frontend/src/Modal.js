

import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34, 34, 34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  overflow: 'hidden',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000
};

const BUTTON_STYLES = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'transparent',
  color: '#fff',
  border: 'none',
  cursor: 'pointer'
};
const CART_STYLES = {
  maxHeight: '80%', // Define a maximum height for the cart area
  overflowY: 'auto', // Enable vertical scrolling if content exceeds the maximum height
};

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <button style={BUTTON_STYLES} onClick={onClose}>X</button>
          <div style={CART_STYLES}>{children}</div>
        </div>
      </div>
    </>,
    document.getElementById('cart-root')
    );
  };
  
  export default Modal;
  // // https://youtu.be/iFMK6N4hUkw?list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&t=506