import logo from './logo.svg';
import './App.css';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  // Other configuration options
});

// Use 'api' to make API requests
api.get('/api/endpoint')
  .then(response => {
    // Handle the response
  })
  .catch(error => {
    // Handle errors
  });


function App() {
  return (
    <div
  className='flex justify-center mt-10 items-center'
>
  <h1 className='text-xl md:text-4xl'>
    Hello
  </h1>
  <button
    className='bg-red-300 p-2 rounded mx-20 hover:bg-red-600 hover:text-white'
  >
    Click me!
  </button>
  <a
    href='https://google.com'
    className='underline font-bold'
  >
    Google
  </a>
</div>
  );
}

export default App;
