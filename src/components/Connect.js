import React, { Component } from "react";
import { Form, Col, Button, Jumbotron } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import '../App.css';
import '../styles/Connect.css';
import RoomConnect from './RoomConnect'
import { domain } from '../Environment';
import RoomCreate from './RoomCreate';
import RoomJoin from "./RoomJoin";
const fetch = require('node-fetch');

class Connect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomData: null,
      join: false,
      create: false,
      joined: this.props.joined
    }

    this.createPage = this.createPage.bind(this);
    this.joinPage = this.joinPage.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  createPage() {
    this.props.toggle();
    this.setState({ create: true });
  }

  joinPage() {
    this.props.toggle();
    this.setState({ join: true });
  }

  onBackClick() {
    this.props.toggle();
    this.setState({ join: false, create: false });
  }

  render() {
    return (
      <>
        {
          !this.state.join && !this.state.create
            ? <div className="col-sm-4 offset-sm-4">
              <div className="d-flex flex-column">
                <Button className='m-1 purple-btn' onClick={this.joinPage}>Join Room</Button>
                <Button className='m-1 purple-btn' onClick={this.createPage}>New Room</Button>
              </div>
            </div>
            : null
        }
        {
          this.state.join
            ? <RoomJoin 
                joined={this.state.joined} 
                toggleJoined={this.props.toggleJoined} 
                onBackClick={this.onBackClick} 
                roomData={this.props.roomData}
                connection={this.props.connection}>
              </RoomJoin>
            : null
        }
        {
          this.state.create
            ? <RoomCreate 
                joined={this.state.joined} 
                toggleJoined={this.props.toggleJoined}
                onBackClick={this.onBackClick} 
                roomData={this.props.roomData}
                connection={this.props.connection}>
              </RoomCreate>
            : null
        }
      </>
    );
  }
}

export default Connect;
