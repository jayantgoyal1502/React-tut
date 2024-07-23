import React from 'react';
import logo from '../assets/logo-color.png'; // Adjust the path according to your project structure

function Logo({ width = '100px' }) {
  return (
    <div>
      <img className='rounded-full' src={logo} alt="Logo" style={{ width }} />
    </div>
  );
}

export default Logo;
