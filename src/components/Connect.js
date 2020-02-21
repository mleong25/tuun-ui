import React, { Component } from "react";
import { Form, Col, Button } from 'react-bootstrap';
import '../App.css';
import '../styles/Connect.css';

class Connect extends Component {
  render() {
    return (
      <div className="connect">
        <div className="col-sm-4 offset-sm-4">
          <Form>
            <Form.Row>
              <Col>
                <Form.Control placeholder="4-digit code"/>
              </Col>
              <Button className="App-link form-button">
                Submit
              </Button>
            </Form.Row>
          </Form>
          <p className="hint">Enter a valid room code to join a room</p>
        </div>
      </div>
    );
  }
}

export default Connect;
