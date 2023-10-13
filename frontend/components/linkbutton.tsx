import { clsx } from "clsx";
import * as ButtonPrimitive from "./primitives/Button";
import React, { useState, useEffect, useRef } from 'react';
import {useButtonPress} from '../hooks/buttonpress';
import axios from 'axios';


interface LinkButtonProps {
  Link: string;
  onDataReceived: (data: any) => void;
  children: React.ReactNode;
}

export const Linkbutton = ({ onDataReceived, Link, children }: LinkButtonProps) => {
  const buttonRef = useRef(null);
  const buttonPressed = useButtonPress(buttonRef);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (buttonPressed) {
      setIsLoading(true);
      setError(null);

      axios
        .get(`https://api.crowdsurf.nu/getpopulartimes/${Link}/`, {
          maxRedirects: 0,
        })
        .then((response) => {
          onDataReceived(response.data.populartimes);
        })
        .catch((error: Error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [buttonPressed, onDataReceived, Link]);

  return (
    <div>
      <ButtonPrimitive.Button ref={buttonRef} shade="primitive" className = "mr-[30px] ml-[30px]">
        {isLoading ? 'Loading...' : children}
      </ButtonPrimitive.Button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};
