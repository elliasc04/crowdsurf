import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from './dialog';

const Dialogapi = () => {
  const [Link, setLink] = useState('');

  const [Data, setData] = useState({
    key1: 'value1',
    key2: 'value2',
  });

  useEffect(() => {
    // Only make the API call if Link is not an empty string
    if (Link.trim() !== '') {
      axios
        .get("http://127.0.0.1:8000/scraper/getlivebusyness/" + Link)
        .then(response => {
            setData(response.data); // Update state with API response data
          })
        .catch(error => console.log(error));
    }
  }, [Link]);

  return (
    <div>
      <h1>Edit Profile</h1>
      <Dialog onLinkChange={setLink} />
      <p>Link: {Link}</p>
      <p>Return data: {JSON.stringify(Data)}</p>
    </div>
  );
};

export default Dialogapi;
