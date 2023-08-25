import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {Dialog} from './components/dialog'
import Dialogapi from './components/dialogapi'
import './App.css';

const ParentComponent = () => {
  return (
    <Dialogapi/>
  );
};

export default ParentComponent;
