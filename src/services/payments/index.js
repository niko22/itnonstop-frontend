import _ from 'underscore';
import * as es5payments from 'services/payments/es5';

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
  const url = `${PATH}/${paymentId}`;
  const paramsObj = { url, callback };
  let provider;
  switch (paramsObj) {
    case 'es5': provider = es5payments; break;
    // case 'es6': provider = es6payments; break;
    // case 'es7': provider = es7payments; break;
  }
  _.partial(provider, paramsObj);
};

export {
  getPayments,
  getPayment
};
