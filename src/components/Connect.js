import React, { Component } from "react";
import { Form, Col, Button, Jumbotron } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import '../App.css';
import '../styles/Connect.css';
import RoomConnect from './RoomConnect'
import { domain } from '../Environment';
const fetch = require('node-fetch');

class Connect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      roomId: null,
      error: false,
      roomData: null
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
      <>
        <div className="move-items-up">
          <div className="col-sm-4 offset-sm-4">
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Col>
                  <Form.Control placeholder="4-digit code" />
                </Col>
                <Button className="App-link form-button">
                  Join
                </Button>
              </Form.Row>
            </Form>
            <p className="hint">Enter a valid room code to join a room</p>
            {/* <RoomConnect></RoomConnect> */}
            <Button onClick={this.onCreateClick}>Create Room</Button>
            {this.state.error ? <p className="hint">Room creation failed.</p> : null}
            {this.state.connected ? <p>{this.state.roomData}</p> : null}
          </div>
        </div>
      </>
    );
  }
}

export default Connect;
