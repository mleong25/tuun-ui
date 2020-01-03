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
    fetch('https://localhost:5001/db/dbtrackList')
    .then(res => res.text())
    .then(json => {
      console.log(json)
      this.setState({loading: false, res: json})
    });
  }

  render() {
    return (
      this.state.loading ? <i>Loading...</i>
                         : <p>{this.state.res.toString()}</p>
    )
  }

}