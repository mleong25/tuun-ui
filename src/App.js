import React from 'react';
import Menu from './components/Menu'
import logo from './logo.svg';
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
      <Menu></Menu>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Connect
      </a>
    </div>
  );
}

export default App