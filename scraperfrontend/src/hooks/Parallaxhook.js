import React, { useEffect, useState} from 'react';
export default function parallax(){
    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        const parallaxImage = document.querySelector('.parallax-image');
        parallaxImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      };
      
    window.addEventListener('scroll', handleScroll);
    const MyComponent = () => {
        useEffect(() => {
          // Cleanup function to remove the event listener
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);
      
        return (
          <div className="parallax-container">
            <div className="parallax-content">
              {/* Content for the first part of the site */}
            </div>
            <div className="parallax-image"></div>
          </div>
        );
    };
    return MyComponent();
}