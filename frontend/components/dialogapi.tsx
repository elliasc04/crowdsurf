import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from './dialog';

interface DialogapiProps {
  onDataReceived: (data: any) => void; // Define the type of onDataReceived function
}


const Dialogapi = ({onDataReceived} : DialogapiProps) => {
  const [Link, setLink] = useState('');
  const [Data, setData] = useState({
    key1: 'value1',
    key2: 'value2',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleDataReceived = () => {
    onDataReceived(Data);
  }

  useEffect(() => {
    if (Link.trim() !== '') {
      setIsLoading(true);
      setError(null);

      // Encode the Link before sending it in the GET request
      const encodedLink = Link.trim();

      axios.get(`https://api.crowdsurf.nu/getpopulartimes/${Link}/`, {
        maxRedirects: 0,
      })
        .then(response => {
          setData(response.data.populartimes);
        })
        .catch((error: Error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [Link]);

  useEffect(() => {
    handleDataReceived();
  },[Data]
  )

  return (
    <div className = "flex flex-col justify-center mt-10 items-center">
      <Dialog onLinkChange={setLink}/>
      <p>Current Link: {`https://api.crowdsurf.nu/getpopulartimes/${Link}`}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Dialogapi;
