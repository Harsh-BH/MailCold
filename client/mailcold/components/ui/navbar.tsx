import React from 'react';
import './FunkyNavbar.css';

const FunkyNavbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">MailCold</div>
      <div className="nav-links">
        
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
};

export default FunkyNavbar;
