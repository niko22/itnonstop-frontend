import React, { Component } from 'react';
import getDataWithCallbacks from './async/callbacks';
import getDataWithPromises from './async/promises';
import getDataWithAsyncAwait from './async/async-await';

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      progressLabel: 'Loading',
      payments: [],
    };
  }

  componentWillMount() {
    const {paymentId, asyncStyle} = this.props.params;
    if (asyncStyle === 'callbacks') {
      getDataWithCallbacks(paymentId);
    } else if (asyncStyle === 'promises') {
      getDataWithPromises(paymentId);
    } else {
      getDataWithAsyncAwait(paymentId);
    }
  }

  render() {
    return (
      <h2>Payment Details</h2>
    );
  }
}
