import React from 'react';
import { Redirect } from "react-router-dom";
import { domain } from '../Environment';
const fetch = require('node-fetch');

export class Call extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: true,
      res: null
    }
  }

  componentDidMount() {
    fetch(domain + 'db/tracklist')
    .then(res => res.text())
    .then(json => {
      console.log(json)
      this.setState({loading: false, res: json})
    });
  }

  getDataFromJson() {
    let songArr = JSON.parse(this.state.res);
    let res = [];
    for (let i = 0; i < songArr.length; i++) {
      res.push(<p>{songArr[i]}</p>)
    }

    console.log(songArr);
    return res;
  }

  render() {
    return (
      <div>
        {this.state.loading ? <i>Loading...</i>
                         : <div>{this.getDataFromJson()}</div>}
      </div>
    )
  }

}
export default Call