import React from 'react';
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
    fetch('https://localhost:44301/db/tracklist')
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
      this.state.loading ? <i>Loading...</i>
                         : this.getDataFromJson()
    )
  }

}