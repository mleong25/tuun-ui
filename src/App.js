import React from 'react';
import Menu from './components/Menu'
import { Call } from './components/ApiCall';
import './App.css';

function App() {
  return (
    <div className="App">
      <span className="Title">
        <h1 className="App-header">T<span style={{color:"#6C2EB9"}}>u</span>un</h1>
        <p>
          A better way to connect with music
        </p>
      </span>
      <div className="better-logo"/>
      <Menu></Menu>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Connect
      </a>
      <Call className="" />
    </div>
  );
}

export default App