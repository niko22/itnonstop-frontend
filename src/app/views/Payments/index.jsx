import React, { Component } from 'react';
import _ from 'underscore';
import { getPayments } from 'services/payments/es5';
import { getAccount } from 'services/accounts/es5';
import { Table, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router';

const renderRow = function (rowData, key) {
  return (
    <tr key={key}>
      <td><Link to={`/payments/${rowData.paymentId}/details`}>{rowData.paymentId}</Link></td>
      <td>{rowData.paymentType}</td>
      <td style={{ textAlign: 'right' }}>${rowData.amount.toFixed(2)}</td>
      <td>{rowData.fromAccount}</td>
      <td>{rowData.toAccount}</td>
      <td>{rowData.description}</td>
      <td>{rowData.beneficiaryBankName}</td>
      <td>{rowData.beneficiaryAddress}</td>
    </tr>
  );
};

export default class Payments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      progressLabel: 'Loading',
      payments: [],
    };

    _.bindAll(this, 'callback');
  }

  componentWillMount() {
    getPayments(this.callback);
  }

  callback(payments) {
    const me  = this;
    me.setState({ progress: 50, progressLabel: 'Payments loaded' });

    let requestCnt = 0;
    const accounts = [];
    const accountIds = _.chain(payments)
      .map(payment => ([payment.chargeAccountId, payment.fromAccountId, payment.toAccountId])).flatten().uniq()
      .value();
    const totalCnt = accountIds.length;
    const progressStep = ((1 / totalCnt) * 50);

    accountIds.forEach(function (id) {
      getAccount(id, function (response) {
        me.setState({ progress: (me.state.progress + progressStep), progressLabel: 'Loading accounts' }, () => {
          accounts[response.accountId] = response;
          requestCnt += 1;
          if (requestCnt === totalCnt) {
            me.setState({
              payments: payments.map(payment => _.extend(payment, {
                toAccount: accounts[payment.toAccountId].holderName,
                fromAccount: accounts[payment.fromAccountId].holderName,
                fromaAccount: accounts[payment.fromAccountId].holderName,
              }))
            });
          }
          // console.info(`Render function called ${requestCnt}`);
        });
      });
    });
  }


  render() {
    const { payments, progress, progressLabel } = this.state;
    if (!payments.length) {
      return (
        <ProgressBar
          now={progress}
          label={`${progressLabel} - total progress ${progress}%`}
        />
      );
    }
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Description</th>
            <th>Bank name</th>
            <th>Bank address</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(renderRow)}
        </tbody>
      </Table>
    );
  }
}
