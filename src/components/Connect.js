import React, { Component } from "react";
import { Form, Col, Button } from 'react-bootstrap';
import '../styles/Connect.css';
 
class Connect extends Component {
  render() {
    return (
      <div className="connect">
        <Form className="connectInput">
          <Form.Row>
            <Col>
              <Form.Control placeholder="4-digit code"/>
            </Col>
            <Button>
              Submit
            </Button>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
 
export default Connect;