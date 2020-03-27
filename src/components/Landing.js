import React, { Component } from 'react';
import '../App.css';
import '../styles/Landing.css';
import Connect from './Connect';

class Landing extends Component {
  constructor(props) {
    super();

    this.state = {
      showTitle: true,
      joined: props.joined,
      roomData: null
    }

    this.toggleTitle = this.toggleTitle.bind(this);
  }

  toggleTitle() {
    this.setState({ showTitle: !this.state.showTitle });
  }

  render() {
    return (
      <>
        {
          this.state.showTitle
            ? <span className="Title">
              <h1 className="App-header">Tuun</h1>
              <p>
                A better way to <span style={{ color: "#6C2EB9" }}>connect</span> with music
              </p>
            </span>
            : null
        }

        <Connect 
          toggle={this.toggleTitle} 
          toggleJoined={this.props.toggleJoined} 
          joined={this.state.joined} 
          roomData={this.props.roomData}
          connection={this.props.connection}></Connect>
      </>
    );
  }
}
export default Landing
