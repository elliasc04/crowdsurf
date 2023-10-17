import { clsx } from "clsx";
import * as ButtonPrimitive from "./primitives/Button";
import React, { useState, useEffect, useRef } from 'react';
import {useButtonPress} from '../hooks/buttonpress';
import axios from 'axios';
import Typewriter from 'typewriter-effect';


interface LinkButtonProps {
  Link: string;
  onPopDataReceived: (data: any) => void;
  onLiveDataReceived: (data: any) => void;
  children: React.ReactNode;
}

export const Linkbutton = ({ onPopDataReceived, onLiveDataReceived, Link, children }: LinkButtonProps) => {
  const buttonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleButtonClick = () => {
    setIsLoading(true);
    setError(null);

    axios
      .get(`https://api.crowdsurf.nu/getfullinfo/${Link}/`, {
        maxRedirects: 0,
      })
      .then((response) => {
        onPopDataReceived(response.data.populartimes);
        onLiveDataReceived(response.data.livebusyness);
      })
      .catch((error: Error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useButtonPress(buttonRef, handleButtonClick);
  return (
    <div>
      <ButtonPrimitive.Button ref={buttonRef} shade="primitive" className = "mr-10 ml-10">
        {isLoading ? "Loading..." : children}
      </ButtonPrimitive.Button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};
