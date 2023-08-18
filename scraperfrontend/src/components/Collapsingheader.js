import './components.css';
import {Link} from 'react-router-dom';
import useScroll from '../hooks/Headerhook.js';

export default function Header(){
//   const [sticky, setSticky] = useState("");

//   // on render, set listener\

//   const isSticky = () => {
//     /* Method that will fix header after a specific scrollable */
//     const scrollTop = window.scrollY;
//     const stickyClass = scrollTop >= 0 ? "is-sticky" : "";
//     setSticky(stickyClass);
//     console.log(stickyClass);
//   };

  const Shrink = useScroll();
    return (
    <header className = 'Headermod'>
      
      <header className = {`Header ${Shrink && 'Headershrink'}`}>
      
        <Link to = "/Home" className = {`Home ${Shrink && 'Homeshrink'}`}>
            Home  
        </Link>
        <Link to = "/About" className = {`Home ${Shrink && 'Homeshrink'}`}>
            About
        </Link>
        <Link to = "/Contact" className = {`Home ${Shrink && 'Homeshrink'}`}>
            Contact
        </Link>
        <p className={`Header-text ${Shrink && 'Header-textshrink'}`}>
          ETHAN &nbsp;&nbsp;GUO
        </p>
        
        <a className = {`Home ${Shrink && 'Homeshrink'}`}
          href = "https://www.linkedin.com/in/ethan-guo-178b85215/"
          target = "_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </header>
      <div className = {`Bar ${Shrink && 'Barshrink'}`}>
      </div>
    </header>
    )
} 

