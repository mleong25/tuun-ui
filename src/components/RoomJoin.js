import React, { Component } from "react";
import '../App.css';
import { Button, Form, Col } from 'react-bootstrap';


class RoomJoin extends Component {
  constructor(props) {
    super()

    this.state = {
      username: "",
      clicked: false,
      roomId: "",
      error: false,
    }

    this.onJoinClick = this.onJoinClick.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleCodeChange(event) {
    this.setState({ roomId: event.target.value });
  }

  onJoinClick(event) {
    let roomId;
    if (this.username === "") {
      alert("Username cannot be empty.")
      return;
    }

    try {
      roomId = parseInt(this.state.roomId);
    }
    catch {
      alert("Room code must be a number.");
      return;
    }

    if (0 <= roomId && roomId <= 10000) {
      this.props.setRoomData(JSON.stringify({ Id: this.state.roomId }));
      this.props.setUsername(this.state.username);
      this.props.toggleJoined();

    }
    else {
      alert("Room code must be less than 5 digits.")
      return;
    }
  }

  handleUserChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div className="col-sm-4 offset-sm-4">
        <div className="d-flex flex-column text-left">
          <h1 className="mb-5">Join a Room</h1>
          <Form>
            <Form.Row>
              <Col>
                <Form.Label className="col-form-label-sm">
                  Spotify User
                    </Form.Label>
                <Form.Control as="input" placeholder="Username" value={this.state.username} onChange={this.handleUserChange} />
                <Form.Label className="col-form-label-sm">
                  Room Code
                </Form.Label>
                <Form.Control as="input" placeholder="Code" value={this.state.roomId} onChange={this.handleCodeChange} />
              </Col>
            </Form.Row>
          </Form>
          <p className="hint">Enter a valid room code to join a room</p>
          <div className="d-flex flex-column">
            <Button className="m-1 purple-btn" onClick={this.onJoinClick}>
              Join
            </Button>
            <Button className="m-1 purple-btn" onClick={this.props.onBackClick}>Back</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomJoin;
