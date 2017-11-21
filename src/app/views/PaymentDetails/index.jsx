import React, { Component } from 'react';

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      progressLabel: 'Loading',
      payments: [],
    };
  }

  render() {
    return (
      <h2>Payment Details</h2>
    );
  }
}
