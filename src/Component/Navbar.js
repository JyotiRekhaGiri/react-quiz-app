import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <img src={require('./image/logo.png')} alt="Logo" />
      </div>
      <div className="right">
        <div className='right-fir'>
          <a href="/">Home</a>
          <a href="/">Flashcard</a>
          <a href="/">Contact</a>
          <a href="/">FAQ</a>
        </div>
        <div className='right-sec'>
          <button>Button</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
