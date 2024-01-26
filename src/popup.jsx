// popup.jsx
import React from "react";
import { render } from "react-dom";

const popupStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '5px 20px',
  width: '400px',
};

const headingStyle = {
  color: '#4CAF50',
  textAlign: 'center',
};

const textStyle = {
    color: '#ffffff',
  };

function Popup() {
  return (
    <div style={popupStyle}>
      <h1 style={headingStyle}>GPT CLI</h1>
      <p style={textStyle}>Manage chat GPT custom instructions easily</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Popup />
    </div>
  );
}

render(<App />, document.getElementById("react-target"));
