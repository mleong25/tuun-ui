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
                <Card.Body className="cardBody">
                    Pick from the setting selection below:
                    <div className="selectionContainer">
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Hangout</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Party</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Dinner</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Ambient</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Genre
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body className="cardBody">Pick from the genre selection below:
                    <div className="selectionContainer">
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Pop</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Rock</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Hip-Hop</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Jazz</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Classical</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Workout</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Study</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Country</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="selection">
                            <Card.Body>
                                <Card.Title>Gaming</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
      </div>
    );
  }
}
 
export default Create;
