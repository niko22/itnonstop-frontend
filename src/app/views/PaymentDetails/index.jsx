import React, { Component } from 'react';
import { Grid, Col, Row, Panel } from 'react-bootstrap';

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
    this.setState({
      data: {
        "paymentId": 1,
        "fromAccountId": 1,
        // Data from details for fromAccountId
        "fromAccountsDetails": {
          "accountId": 1,
          "accountType": "BUSINESS ACCOUNT",
          "holderName": "Nice fella",
          "holderAddress": "Cool Ave 12/23",
          "superAccount": true
        },
        // Data from deals for fromAccountId
        "fromAccountDeals": [
          {
            "name": "Deal 1",
            "description": "This will make you rich",
            "refLink": "http://localhost/nowhere",
            "expirationDate": "2017-12-02"
          },
          {
            "name": "Deal 2",
            "description": "This will make you even richer",
            "refLink": "http://localhost/nowhere",
            "expirationDate": "2017-11-23"
          },
          {
            "name": "Deal 3",
            "description": "This will make you ... ",
            "refLink": "http://localhost/nowhere",
            "expirationDate": "2017-12-05"
          }
        ],
        "toAccountId": 4,
        // Data from details for toAccountId
        "toAccountDetails": {
            "accountId": 4,
            "accountType": "BUSINESS ACCOUNT",
            "holderName": "Nice fella",
            "holderAddress": "Cool Ave 12/23",
            "superAccount": true
        },
        "chargeAccountId": 1,
        // Data from details for chargeAccountId
        "chargeAccountDetails": {
          "accountId": 1,
          "accountType": "BUSINESS ACCOUNT",
          "holderName": "Nice fella",
          "holderAddress": "Cool Ave 12/23",
          "superAccount": true
        },
        "paymentType": "INTERNAL",
        // Data from details for paymentId and paymentType
        "paymentTypeDetails": {
          "type": "INTERNAL",
          "displayName": "Internal payment",
          "chargeValue": 1.0
        },
        "beneficiaryBankName": "MobileBank",
        "beneficiaryAddress": "Fab Street 16",
        "amount": 111.23,
        "description": "Take my money",
        // Additional payment headers for paymentId and paymentType
        "paymentMetaData": {
          "K1": "Value 1 for 1 in DOMESTIC",
          "K2": "Value 2 for 1 in DOMESTIC",
          "K3": "Value 3 for 1 in DOMESTIC",
          "K4": "Value 4 for 1 in DOMESTIC",
          "K5": "Value 5 for 1 in DOMESTIC",
          "K6": "Value 6 for 1 in DOMESTIC",
          "K7": "Value 7 for 1 in DOMESTIC"
        }
      }
    });
  }

  render() {
    const { data } = this.state;
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
