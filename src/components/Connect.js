import React, { Component } from "react";
import { Form, Col, Button, Jumbotron } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import '../App.css';
import '../styles/Connect.css';

class Connect extends Component {
  render() {
    return (
      <>
        <div className="move-items-up">
          <div className="col-sm-4 offset-sm-4">
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Col>
                  <Form.Control placeholder="4-digit code"/>
                </Col>
                <Button className="App-link form-button">
                  Join
                </Button>
              </Form.Row>
            </Form>
            <p className="hint">Enter a valid room code to join a room</p>
          </div>
        </div>
      </>
    );
  }
}

export default Connect;
