import React, { Component } from 'react';

class Landing extends Component {
    render() {
        return(
            <>
                <span className="Title">
                    <h1 className="App-header">
                        T<span style={{ color: "#6C2EB9" }}>u</span>un
                    </h1>
                    <p>A better way to connect with music</p>
                </span>
                <div className="container">
                <a
                    className="App-link btn btn-primary"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Connect
                </a>
                </div>
            </>
        );
    }
}
export default Landing