import React, { Component } from "react";
import '../App.css';
import { Button, Form, } from 'react-bootstrap';
import { domain } from '../Environment';



class RoomCreate extends Component {
  constructor(props) {
    super()

    this.state = {
      username: "",
      genres: [],
      connected: false,
      roomId: null,
      error: false,
    }

    this.createRoom = this.createRoom.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.getRoom = this.getRoom.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleGenreClick = this.handleGenreClick.bind(this);
  }

  async createRoom() {
    const user = {
      username: this.state.username,
    }
    const options = {
      Genres: this.state.genres
    }

    let code = await fetch(domain + 'room/genCode')
    code = await code.text();
    this.setState({ roomId: code });

    try {
      await fetch(
        domain + `room/create/${this.state.roomId}/${user.username}`,
        {
          method: 'POST',
          body: JSON.stringify(options),
          headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
      alert(err);
      this.setState({ error: true });
      return;
    }

    try {
      let data = await this.getRoom();
      this.setState({ roomData: data });
    }
    catch (err) {
      alert(err);
      return;
    }
  }

  async getRoom() {
    let data = await fetch(domain + `room/get/${this.state.roomId}`);
    data = await data.text();
    return JSON.stringify(JSON.parse(data), null, '\t');
  }

  onCreateClick() {
    this.setState({ error: false, connected: false });
    this.createRoom()
      .then(() => {
        this.setState({ connected: true });
      })
  }

  handleUserChange(event) {
    this.setState({ username: event.target.value });
  }

  handleGenreClick(event) {
    if (event.target.checked) {
      const genres = this.state.genres;
      genres.push(event.target.parentNode.innerText.toLowerCase())
      this.setState({ genres: genres });
      console.log(this.state.genres);
    }
    else {
      const genres = this.state.genres;
      genres.splice(genres.indexOf(event.target.parentNode.innerText.toLowerCase()), 1);
      this.setState({ genres: genres });
      console.log(this.state.genres);
    }
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const genres = ["Rock", "Hip-hop", "Indie", "Ambient", "Electronic"]
    return (
      <div className="d-flex flex-column text-left">
        <h1 className="mb-5">Create a Room</h1> 
        <Form>
          <Form.Label className="col-form-label-sm">
            Spotify User
          </Form.Label>
          <Form.Control as="input" placeholder="Username" value={this.state.username} onChange={this.handleUserChange} />
          <Form.Label className="col-form-label-sm">
            Genres
          </Form.Label>
          {genres.map(genre => (
            <Form.Check label={genre} key={genre} onClick={this.handleGenreClick}></Form.Check>
          ))}
        </Form>
        <Button className="m-1 purple-btn" onClick={this.onCreateClick}>Create</Button>
        {
          this.state.error
            ? <p className="hint">Room creation failed.</p>
            : null
        }
        {
          this.state.connected
            ? <p>{this.state.roomData}</p>
            : null
        }
        <Button className="m-1 purple-btn" onClick={this.props.onBackClick}>Back</Button>
      </div>
    );
  }
}

export default RoomCreate;
