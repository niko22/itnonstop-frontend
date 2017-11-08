import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/views/App';
import Home from 'app/views/Home';
import Payments from 'app/views/Payments';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="payments" component={Payments} />
    </Route>
  </Router>,
  document.getElementById('app')
);
