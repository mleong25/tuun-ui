import React, { Component } from "react";
import '../App.css';
import '../styles/Playlists.css';
import '../styles/Room.css';

class Playlists extends Component {
  render() {
    return (
      <>
        <link href="https://fonts.googleapis.com/css?family=Poppins|Raleway|Montserrat&display=swap" rel="stylesheet"></link>
        <div className="room-container">
          <h1 className="bold">
            Your Playlists
          </h1>
        </div>
      </>
    );
  }
}

export default Playlists;
