import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from './dialog';

const Dialogapi = () => {
  const [Link, setLink] = useState('');
  const [Data, setData] = useState({
    key1: 'value1',
    key2: 'value2',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null); // Specify the type as 'Error | null'

  useEffect(() => {
    if (Link.trim() !== '') {
      setIsLoading(true);
      setError(null);

      axios.get(`http://127.0.0.1:8000/scraper/getlivebusyness/${Link.trim()}`)
        .then(response => {
          setData(response.data);
        })
        .catch((error: Error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [Link]);

  return (
    <div>
      <h1>Edit Profile</h1>
      <Dialog onLinkChange={setLink} />
      <p>Link: {Link}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Return data: {JSON.stringify(Data)}</p>
      )}
    </div>
  );
};

export default Dialogapi;
