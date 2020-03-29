import React, { Component } from 'react';
import '../App.css';
import '../styles/Landing.css';
import Connect from './Connect';

class Landing extends Component {
  render() {
    return (
      <>
        {
          this.props.showTitle
            ? <span className="Title">
              <h1 className="App-header">Tuun</h1>
              <p>
                A better way to <span style={{ color: "#6C2EB9" }}>connect</span> with music
              </p>
            </span>
            : null
        }

        <Connect 
          toggle={this.props.toggleTitle} 
          toggleJoined={this.props.toggleJoined} 
          joined={this.props.joined} 
          roomData={this.props.roomData}
          setRoomData={this.props.setRoomData}
          connection={this.props.connection}
          setUsername={this.props.setUsername}
          username={this.props.username}
          leaveRoom={this.props.leaveRoom}
          token={this.props.token}>
        </Connect>  
      </>
    );
  }
}
export default Landing
