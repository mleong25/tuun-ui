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

  handleCreateSubmit() {

  }

  render() {
    return (
      <>
        <div className="col-sm-4 offset-sm-4">
          {
            !this.state.join && !this.state.create
              ? <div className="d-flex flex-column">
                <Button className='m-1 purple-btn' onClick={this.joinPage}>Join Room</Button>
                <Button className='m-1 purple-btn' onClick={this.createPage}>New Room</Button>
              </div>
              : null
          }
          {
            this.state.join
              ? <RoomJoin onBackClick={this.onBackClick}></RoomJoin>
              : null
          }
          {
            this.state.create
              ? <RoomCreate onBackClick={this.onBackClick}></RoomCreate>
              : null
          }
        </div>
      </>
    );
  }
}

export default Connect;
