import _ from 'underscore';
import * as es5payments from 'services/payments/es5';
import * as es6payments from 'services/payments/promise';
import * as es7payments from 'services/payments/async-await';

const PATH = 'api/payments';

const getPayments = ({ callback = () => {} }) => {
  es5payments.getPayments({
    url: PATH,
    callback
  });
};

const getPayment = ({
  ecmaStandard = 'es5',
  paymentId,
  callback = () => {}
}) => {
  let s;
  switch (ecmaStandard) {
    case 'es5': s = es5payments; break;
    case 'es6': s = es6payments; break;
    case 'es7': s = es7payments; break;
  }
  s.getPayment({ paymentId, callback });
};

export {
  getPayments,
  getPayment
};
