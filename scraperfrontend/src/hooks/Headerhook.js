import { useEffect, useState} from 'react';

export default function useScroll(){
const [isScrolled, setScrolled] = useState(false);
const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if(window.scrollY > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
    if (currentScrollY < prevScrollY) {
        setScrolled(false);
      }
  
      setPrevScrollY(currentScrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  });
  return isScrolled;
}