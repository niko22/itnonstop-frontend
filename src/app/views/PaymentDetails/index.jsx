import React, { Component } from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import { Grid, Col, Panel, Row, Tabs, Tab } from 'react-bootstrap';
import getPaymentDetailsCallback from 'app/views/PaymentDetails/callback';
import getPaymentDetailsPromise from 'app/views/PaymentDetails/promise';
import getPaymentDetailsAsync from 'app/views/PaymentDetails/async-await';
import { getMetaData, getDealsBox } from 'app/views/PaymentDetails/helpers';


export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      progressLabel: 'Loading',
      data: {},
    };

    _.bindAll(this, 'callback', 'onSelect');
  }

  componentWillMount() {
    getPaymentDetailsCallback(this.props.params.paymentId, this.callback);
  }

  onSelect(selectedKey) {
    this.setState(({ key }) => (selectedKey !== key ? { key: selectedKey, data: {} } : null), () => {
      switch (selectedKey) {
        case 'callback': getPaymentDetailsCallback(this.props.params.paymentId, this.callback); break;
        case 'promise': getPaymentDetailsPromise(this.props.params.paymentId, this.callback); break;
        case 'async-await': getPaymentDetailsAsync(this.props.params.paymentId, this.callback); break;
      }
    });
  }

  callback(data) {
    this.setState({ data });
  }

  renderDetails() {
    const { data } = this.state;
    if (_.isEmpty(data)) return (<center className="blink_me">Loading, please wait...</center>);
    return (
      <Row className="show-grid">
        <Col md={6}>
          <Panel header="Payment Details" bsStyle="primary">
            <h3>Overview</h3>
            Payment Id: {data.paymentId || '-'}<br />
            Amount: <b>{data.amount || '-'}</b><br />
            Description: {data.description || '-'}<br />
            Beneficiary: {data.beneficiaryBankName || '-'}, {data.beneficiaryAddress || '-'}<br />
            Type: {data.paymentTypeDetails.displayName || '-'}

            <h3>From</h3>
            Name: {data.fromAccountDetails.holderName || '-'}<br />
            Address: {data.fromAccountDetails.holderAddress || '-'}<br />
            Type: {data.fromAccountDetails.accountType || '-'}<br />

            <h3>To</h3>
            Name: {data.toAccountDetails.holderName || '-'}<br />
            Address: {data.toAccountDetails.holderAddress || '-'}<br />

            <h3>Charges</h3>
            Name: {data.chargeAccountDetails.holderName || '-'}<br />
            Address: {data.chargeAccountDetails.holderAddress || '-'}<br />
            Change amount: {data.paymentTypeDetails.chargeValue || 0}<br />

            {getMetaData(data.paymentMetaData)}
          </Panel>
        </Col>

        <Col md={5}>
          {getDealsBox(data.fromAccountDetails.holderName, data.fromAccountDeals)}
        </Col>
      </Row>
    );
  }

  render() {
    const details = this.renderDetails();

    return (
      <Grid>
        <Row style={{ paddingBottom: 10 }}>
          <h2>Payment Details #{this.props.params.paymentId}</h2>
          <Tabs activeKey={this.state.key} onSelect={this.onSelect} id="controlled-tab-example">
            <Tab eventKey={'callback'} title="ES5 - callback functions" />
            <Tab eventKey={'promise'} title="Promises" />
            <Tab eventKey={'async-await'} title="Async/Await" />
          </Tabs>
        </Row>
        {details}
      </Grid>
    );
  }
}

PaymentDetails.defaultProps = {
  params: {
    paymentId: 0
  }
};

PaymentDetails.propTypes = {
  params: PropTypes.shape({
    paymentId: PropTypes.string
  })
};
