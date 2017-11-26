import React, { Component } from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import { Grid, Col, Panel, Row, Tabs, Tab } from 'react-bootstrap';
import getPaymentDetailsCallback from 'app/views/PaymentDetails/callback';
import getPaymentDetailsPromise from 'app/views/PaymentDetails/promise';

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
        case 'async-await': break;
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
            Name: {data.fromAccountsDetails.holderName || '-'}<br />
            Address: {data.fromAccountsDetails.holderAddress || '-'}<br />
            Type: {data.fromAccountsDetails.accountType || '-'}<br />

            <h3>To</h3>
            Name: {data.toAccountDetails.holderName || '-'}<br />
            Address: {data.toAccountDetails.holderAddress || '-'}<br />

            <h3>Charges</h3>
            Name: {data.chargeAccountDetails.holderName || '-'}<br />
            Address: {data.chargeAccountDetails.holderAddress || '-'}<br />
            Change amount: {data.paymentTypeDetails.chargeValue || 0}<br />

            <h3>Meta data</h3>
            K1: {data.paymentMetaData.K1 || '-'}<br />
            K2: {data.paymentMetaData.K2 || '-'}<br />
            K3: {data.paymentMetaData.K3 || '-'}<br />
            K4: {data.paymentMetaData.K4 || '-'}<br />
            K5: {data.paymentMetaData.K5 || '-'}<br />
            K6: {data.paymentMetaData.K6 || '-'}<br />
            K7: {data.paymentMetaData.K7 || '-'}<br />
          </Panel>
        </Col>

        <Col md={5}>
          <Panel header="Your super offers" bsStyle="warning">
            <h3>Hey {data.fromAccountsDetails.holderName} check out what we have for you</h3><br />
            {_.map(data.fromAccountDeals, (o, i) => (
              <div key={`deals_key_${i}`}>
                <h4>{o.name}</h4>
                {o.description}<br />
                Expiring: {o.expirationDate}<br />
              </div>
            ))}
          </Panel>
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
            <Tab eventKey={'async-await'} title="Asyn/Await" />
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
