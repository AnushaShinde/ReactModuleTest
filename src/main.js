import React from 'react';
import { Link } from 'react-router-dom';
import image from './images/img.png';

const Main = ({ selectedGroup }) => {
  return (
    <div className="main-container">
      <div className="content">
      <img src={image} alt="Sample" className="centered-image" />
        <h1>Pocket Notes</h1>
        <p>Send and receive messages without keeping your phone online.
          <br />Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      </div>
    </div>
  );
};

export default Main;
