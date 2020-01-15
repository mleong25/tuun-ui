import React, { Component } from 'react';
import '../styles/Menu.css';
import { join } from 'path';

class Menu extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Create</li>
          <li>Playlists</li>
          <li>Join</li>
        </ul>
      </div>
    );
  }
}

export default Menu