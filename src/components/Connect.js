import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';
import '../styles/Connect.css';
import RoomCreate from './RoomCreate';
import RoomJoin from './RoomJoin';
import Room from './Room';

let spotify = require('spotify-web-api-js');
let spotifyApi = new spotify();

class Connect extends Component {
  constructor(props) {
      super(props);

      this.state = {
          join: false,
          create: false,
          username: ''
      };

      this.createPage = this.createPage.bind(this);
      this.joinPage = this.joinPage.bind(this);
      this.onBackClick = this.onBackClick.bind(this);
      this.resetStateOnJoined = this.resetStateOnJoined.bind(this);
  }

  componentDidMount() {
      let token = window.localStorage.getItem('token');
      spotifyApi.setAccessToken(token);
      spotifyApi.getMe().then(data => {
          this.setState({ username: data.id });
      });
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

  resetStateOnJoined() {
      if (this.props.joined && (this.state.join || this.state.create)) {
          this.setState({ join: false, create: false });
      }
  }

  render() {
    this.resetStateOnJoined();
    return (
        <>
            {!this.state.join && !this.state.create && !this.props.joined ? (
                <div className='col-sm-4 offset-sm-4'>
                    <div className='d-flex flex-column'>
                        <Button className='m-1 purple-btn' onClick={this.joinPage}>
                            Join Room
                        </Button>
                        <Button className='m-1 purple-btn' onClick={this.createPage}>
                            New Room
                        </Button>
                    </div>
                </div>
            ) : null}
            {this.state.join && !this.props.joined ? <RoomJoin joined={this.props.joined} setRoomData={this.props.setRoomData} toggleJoined={this.props.toggleJoined} onBackClick={this.onBackClick} roomData={this.props.roomData} connection={this.props.connection} setUsername={this.props.setUsername} username={this.state.username}></RoomJoin> : null}
            {this.state.create && !this.props.joined ? <RoomCreate joined={this.props.joined} setRoomData={this.props.setRoomData} toggleJoined={this.props.toggleJoined} onBackClick={this.onBackClick} roomData={this.props.roomData} connection={this.props.connection} setUsername={this.props.setUsername} username={this.state.username}></RoomCreate> : null}
            {this.props.joined ? <Room setRoomData={this.props.setRoomData} user={this.props.username} data={this.props.roomData} connection={this.props.connection} toggleJoined={this.props.toggleJoined} leaveRoom={this.props.leaveRoom} token={this.props.token}></Room> : null}
        </>
    );
  }
}

export default Connect;
