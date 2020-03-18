import React, { Component } from 'react';
import '../App.css';
import '../styles/Room.css';
import { Form, FormControl, Col, Row, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import WebPlayer from './WebPlayer';
import { domain } from '../Environment';
import * as signalR from '@microsoft/signalr';
import User from '../models/User';


class Room extends Component {
  constructor(props) {
    super();
    this.state = {
      data: JSON.parse(props.data),
      user: props.user,
      connection: undefined,
      connected: false
    }

    this.hostGuard = this.hostGuard.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);
    this.upsertData = this.upsertData.bind(this);
  }

  hostGuard(func, ...params) {
    if (this.state.user.toLowerCase() === this.state.data.Host.toLowerCase()) {
      func(...params);
    }
    else {
      alert(`Only the host (${this.data.Host}) can perform this action.`);
    }
  }

  upsertData(data) {
    this.setState({ data: JSON.parse(data) });
    this.setState({ connected: true });
  }

  componentDidMount() {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(domain + "roomsHub")
      .build();

    newConnection.on("SetState", this.upsertData);

    this.setState({ connection: newConnection }, async () => {
      await this.state.connection.start();
      console.log("connected");
      this.state.connection.invoke("AddUser", parseInt(this.state.data.Id), this.state.user, "abcd");
    });
  }

  render() {
    console.log(this.state.data)
    // // Toggle chevrons for accordian
    // // function toggleChevron(e) {
    //   $(e.target)
    //   .prev('.panel-heading')
    //   .find("i.indicator")
    //   .toggleClass('glyphicon-chevron-down-custom glyphicon-chevron-up-custom');
    // }
    // $('#accordion').on('hidden.bs.collapse', toggleChevron);
    // $('#accordion').on('shown.bs.collapse', toggleChevron);
    return (
      <Container fluid>
        <>{/* <Col className="text-left lg">
            <h1>
              Room
              <span style={{ color: "#6C2EB9" }}> #</span>
              <span className="bold">4434</span>
            </h1>
            <hr className="hr-line"></hr>
            <div className="row">
                <h3 className="bold">Users</h3>
                <p className="hint">
                  List of users currently in the room
                      </p>
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
            <div className="row">
                <h3 className="bold">Preferences</h3>
                <p className="hint">
                  select preferences you'd like the playlist generator to prioritize
                </p>
                <Accordion className="accordion" defaultActiveKey="0">
                  <Card className="card">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Setting
                              </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body className="cardBody">
                        <p className="hint">
                          Pick from the setting selection below:
                                  </p>
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
                      <Card.Body className="cardBody">
                        <p className="hint">
                          Pick from the genre selection below:
                                  </p>
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
            <div className="row">
                <button type="button" class="btn App-link">
                  Generate
                </button>
            </div>
          </Col> */}</>
        {
          !this.state.connected
            ? <p>Loading...</p>
            : <Row>
              <Col lg={10}>
                <div className="text-left">
                  <h1>
                    Room
                    <span style={{ color: "#6C2EB9" }}> #</span>
                    <span className="bold">{this.state.data.Id}</span>
                  </h1>
                </div>
                <WebPlayer token="abcd"></WebPlayer>
              </Col>
              <Col>
                <h3 className="bold">Users</h3>
                <p className="hint">
                  List of users currently in the room
                </p>
                <table class="table table-clear">
                  <tbody>
                    {
                      Object.values(this.state.data.Users).map((user) => (
                        <tr>
                          <td class="table-column">
                            <a className="w-100 d-block font-weight-bold" style={{ color: "#6C2EB9" }} href={`https://open.spotify.com/user/${user.Username}`} rel="noopener noreferrer" target="_blank">
                              {user.Username}
                            </a>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </Col>
            </Row>
        }
      </Container>
    );
  }
}

export default Room;
