import React, { Component } from "react";
import '../App.css';
import { Button } from 'react-bootstrap';
import { domain } from '../Environment';



class RoomCreate extends Component {
  constructor(props) {
    super()

    this.state = {
      createOptions: {
        // Capitalized to allow easy mapping on backend
        Genres: [],
        User: {
          Token: null,
          Username: null
        }
      },
      connected: false,
      roomId: null,
      error: false,
    }

    this.createRoom = this.createRoom.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.getRoom = this.getRoom.bind(this);
  }

  async createRoom() {
    const user = {
      username: 'asdff01',
    }
    const options = {
      Genres: ['hip-hop']
    }

    let code = await fetch(domain + 'room/genCode')
    code = await code.text();
    this.setState({ roomId: code });

    try {
      await fetch(
        domain + `room/create/${this.state.roomId}/${user.username}`,
        {
          method: 'POST',
          body: JSON.stringify(options),
          headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
      alert(err);
      this.setState({ error: true });
      return;
    }

    try {
      let data = await this.getRoom();
      this.setState({ roomData: data });
    }
    catch (err) {
      alert(err);
      return;
    }
  }

  async getRoom() {
    let data = await fetch(domain + `room/get/${this.state.roomId}`);
    data = await data.text();
    return JSON.stringify(JSON.parse(data), null, '\t');
  }

  onCreateClick() {
    this.setState({ error: false, connected: false });
    this.createRoom()
      .then(() => {
        this.setState({ connected: true });
      })
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <Button className="m-1 purple-btn" onClick={this.onCreateClick}>Create Room</Button>
        {this.state.error ? <p className="hint">Room creation failed.</p> : null}
        {this.state.connected ? <p>{this.state.roomData}</p> : null}
        <Button className="m-1 purple-btn" onClick={this.props.onBackClick}>Back</Button>
      </div>
    );
  }
}

export default RoomCreate;
