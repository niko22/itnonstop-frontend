import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/views/App';
import Home from 'app/views/Home';
import Payments from 'app/views/Payments';
import PaymentDetails from 'app/views/PaymentDetails';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="payments" component={Payments} />
      <Route path="payment/:paymentId/details" component={PaymentDetails} />
    </Route>
  </Router>,
  document.getElementById('app')
);
