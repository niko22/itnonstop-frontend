import React from 'react';
import { Panel } from 'react-bootstrap';
import _ from 'underscore';

const getMetaData = paymentMetaData => (
  !_.isEmpty(paymentMetaData)
    ? (
      <span>
        <h3>Meta data</h3>
        K1: {paymentMetaData.K1 || '-'}<br />
        K2: {paymentMetaData.K2 || '-'}<br />
        K3: {paymentMetaData.K3 || '-'}<br />
        K4: {paymentMetaData.K4 || '-'}<br />
        K5: {paymentMetaData.K5 || '-'}<br />
        K6: {paymentMetaData.K6 || '-'}<br />
        K7: {paymentMetaData.K7 || '-'}<br />
      </span>
    )
    : null
);

const getDealsBox = (name, accountDeals) => (
  !_.isEmpty(accountDeals)
    ? (
      <Panel header="Your super offers" bsStyle="warning">
        <h3>Hey {name} check out what we have for you</h3><br />
        {_.map(accountDeals, (o, i) => (
          <div key={`deals_key_${i}`}>
            <h4>{o.name}</h4>
            {o.description}<br />
            Expiring: {o.expirationDate}<br />
          </div>
        ))}
      </Panel>
    )
    : null
);

export {
  getMetaData,
  getDealsBox,
};
