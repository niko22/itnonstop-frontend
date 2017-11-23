import React, { Component } from 'react';
import _ from 'underscore';
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import { getPayment } from 'services/payments';

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      progressLabel: 'Loading',
      payments: [],
      data: {
        'paymentTypeDetails': {},
        'fromAccountsDetails': {},
        'toAccountDetails': {},
        'chargeAccountDetails': {},
        'paymentMetaData': {},
        'fromAccountDeals': []
      }
    };

    _.bindAll(this, 'callback');
  }

  callback(data) {
    this.setState({ data });
  }

  componentWillMount() {
    getPayment({
      paymentId: this.props.params.paymentId,
      ecmaStandard: 'es7',
      callback: this.callback
    });
  }

  render() {
    const { data } = this.state;
    console.log(data.paymentId);
    return (
      <Grid>
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
              {data.fromAccountDeals.map( (o,i) => (
                <div key={i}>
                  <h4>{o.name}</h4>
                  {o.description}<br />
                  Expiring: {o.expirationDate}<br />
                </div>
              ))}
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}
