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

  componentDidMount() {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(domain + "roomsHub")
      .build();

    newConnection.on("SetState", (newData) => {
      this.setState({ data: newData });
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
