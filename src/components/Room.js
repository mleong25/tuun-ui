import React, { Component } from 'react';
import '../App.css';
import '../styles/Room.css';
import '../styles/Create.css';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

class Room extends Component {
    render() {

      // Toggle chevrons for accordian
      // function toggleChevron(e) {
      //   $(e.target)
      //   .prev('.panel-heading')
      //   .find("i.indicator")
      //   .toggleClass('glyphicon-chevron-down-custom glyphicon-chevron-up-custom');
      // }
      // $('#accordion').on('hidden.bs.collapse', toggleChevron);
      // $('#accordion').on('shown.bs.collapse', toggleChevron);
      return (
          <>
            <link href="https://fonts.googleapis.com/css?family=Poppins|Raleway|Montserrat&display=swap" rel="stylesheet"></link>
            <div className="room-container">
              <h1>
                Room
                <span style={{ color: "#6C2EB9" }}> #</span>
                <span className="bold">4434</span>
              </h1>
              <hr className="hr-line"></hr>
              <div className="row">
                <div className="col-sm-6 room-block">
                  <h3 className="bold">Users</h3>
                  <table class="table table-clear">
                      <tbody>
                        <tr>
                            <td class="table-column">Cbeeb121</td>
                            <td class="table-column">(This can be a different data point)</td>
                        </tr>
                        <tr>
                            <td class="table-column">Awallace</td>
                            <td class="table-column">12 followers</td>
                        </tr>
                        <tr>
                            <td class="table-column">zBath</td>
                            <td class="table-column">35 followers</td>
                        </tr>
                        <tr>
                            <td class="table-column">Mleong25</td>
                            <td class="table-column">25 followers</td>
                        </tr>
                        <tr>
                            <td class="table-column">AWittywitt</td>
                            <td class="table-column">46 followers</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 room-block">
                  <h3 className="bold">
                    Preferences
                  </h3>
                  <p>
                    <span style={{ fontSize: "1rem" }}> select preferences you'd like the playlist generator to prioritize</span>
                  </p>
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
              </div>
              <div className="row">
                <div className="col-sm-6 text-center">
                  <button type="button" class="btn App-link">
                    Generate
                  </button>
                  </div>
              </div>
            </div>
          </>
      );
    }
}

export default Room;
