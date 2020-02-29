import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import '../App.css';
import '../styles/RoomConnect.css';
import * as signalR from '@microsoft/signalr';
import { domain } from '../Environment';

class RoomConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: undefined, 
      connectionId: undefined
     }

    this.connect = this.connect.bind(this);
  }

  onConnect(id) {
    alert("Connected with id: " + id);
  }

  onOtherDisconnect(id) {
    alert("User '" + id + "' disconnected.");
  }

  componentDidMount() {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(domain + "roomsHub")
      .build();

    newConnection.on("YouConnected", (id) => {
      this.setState({ connectionId: id });
      this.onConnect(this.state.connectionId);
    });

    this.setState({connection: newConnection});
  }

  connect() {
    this.state.connection.start()
      .then(function () {
        console.log("connected");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Button onClick={this.connect}>Connect To Hub</Button>
    );
  }
}
export default RoomConnect;
