import React, { Component } from "react";
import '../App.css';
import '../styles/Create.css';
import { Button} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'


class Create extends Component {
  render() {
    return (
      <>
        <div className="move-items-up align-center">
          <h1>
            <Button className="create-button">
              Create a <span className="bold">room</span>
            </Button>
          </h1>
          <p></p>
        </div>
      </>
    );
  }
}

export default Create;
