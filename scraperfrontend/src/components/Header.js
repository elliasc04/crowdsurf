import './components.css';
import {Link} from 'react-router-dom';
import React, { useEffect, useState} from 'react';

export default function Header(){
  const [sticky, setSticky] = useState("");

  // on render, set listener\

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 0 ? "is-sticky" : "";
    setSticky(stickyClass);
    console.log(stickyClass);
  };

  useEffect(() => {
    isSticky();
  }, []);

  

  const classes = `header-section d-none d-xl-block ${sticky}`;

    return (
    <header className={classes}>
      <h1 className = "Header">
      
        <Link to = "/Home" className = "Home">
            Home  
        </Link>
        <Link to = "/About" className = "Home">
            About
        </Link>
        <Link to = "/Contact" className = "Home">
            Contact
        </Link>
        <p className="Header-text">
          ETHAN &nbsp;&nbsp;GUO
        </p>
        
        <a className = "Linkin"
          href = "https://www.linkedin.com/in/ethan-guo-178b85215/"
          target = "_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        </h1>
    </header>
    )
} 

