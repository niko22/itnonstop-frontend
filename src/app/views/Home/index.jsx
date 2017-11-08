import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: true,
    };
  }

  render() {
    return (
      <Jumbotron>
        <h1>IT NonStop</h1>
        <p>FINTECH HARDCORE</p>
        <p>Asynchronous processing (r)evolution in JavaScript</p>
      </Jumbotron>
    );
  }
}
