import React, { Component } from 'react';
import '../styles/Menu.css';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import Create from './Create';
import Connect from './Connect';
import Playlists from './Playlists';

class Menu extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li><NavLink to='/create'>Create</NavLink></li>
            <li><NavLink to='/playlists'>Playlists</NavLink></li>
            <li><NavLink to='/Connect'>Connect</NavLink></li>
          </ul>
          <div className="menuContent">
            <Route path='/create' component={Create}/>
            <Route path='/playlists' component={Playlists}/>
            <Route path='/Connect' component={Connect}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Menu