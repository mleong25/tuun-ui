import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

import '../styles/Create.css';
 
class Create extends Component {
  render() {
    return (
      <div>
        <Accordion className="accordion" defaultActiveKey="0">
            <Card className="card">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Setting
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body className="cardBody">Pick from the setting selection below:</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Genre
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body className="cardBody">Pick from the genre selection below:</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
      </div>
    );
  }
}
 
export default Create;