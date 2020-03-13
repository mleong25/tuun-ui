import React, { Component } from "react";
import '../App.css';
import { Button, Form, Col } from 'react-bootstrap';
import { domain } from '../Environment';



class RoomJoin extends Component {
  constructor(props) {
    super()

    this.state = {
      connected: false,
      roomId: null,
      error: false,
    }

  }

  render() {
    return (
      <div className="d-flex flex-column text-left">
        <h1 className="mb-5">Join a Room</h1>
        <Form>
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
        <div className="d-flex flex-column">
          <Button className="purple-btn" onClick={this.props.onBackClick}>Back</Button>
        </div>
      </div>
    );
  }
}

export default RoomJoin;
