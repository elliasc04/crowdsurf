import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import {Dialog} from './components/dialog'
import './App.css';

const ParentComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");

  return (
    <div>
      <h1>Edit Profile</h1>
      {/* Render the Dialog component and pass the handle functions as props */}
      <Dialog
        onFirstNameChange={setFirstName}
        onFamilyNameChange={setFamilyName}
      />
      <p>First Name: {firstName}</p>
      <p>Family Name: {familyName}</p>
    </div>
  );
};

export default ParentComponent;
