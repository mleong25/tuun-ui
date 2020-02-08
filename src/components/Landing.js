import React, { Component } from 'react';
import '../App.css';
import '../styles/Landing.css';

class Landing extends Component {
    render() {
        return(
            <>
                <span className="Title">
                    <h1 className="App-header">
                        Tuun
                    </h1>
                    <p>
                      A better way to <span style={{ color: "#6C2EB9" }}>connect</span> with music
                    </p>
                </span>
                <div className="containerLand">
                <a
                    className="App-link btn btn-primary"
                    href="/connect"
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
