import React from 'react';
import './FunkyNavbar.css';
import Link from 'next/link';

const FunkyNavbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">MailCold</div>
      <div className="nav-links">

        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        {/* <a href="#">Services</a>
        <a href="#">Contact</a> */}
      </div>
    </nav>
  );
};

export default FunkyNavbar;
