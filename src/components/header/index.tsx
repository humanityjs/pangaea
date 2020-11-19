import React from 'react';
import './header.scss';

const Header: React.FC = () => {
  return (
    <div className="header">
      <h1 className="title">All Products</h1>
      <h6 className="sub-text">A 360<sup>o</sup> look at Lumin</h6>
    </div>
  )
}

export default Header;

