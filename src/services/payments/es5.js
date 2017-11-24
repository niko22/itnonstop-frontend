import { es5Get } from 'services/provider';

const defaultGet = ({ url, callback }) => es5Get(url, callback);

const getPayments = defaultGet;

const getPayment = ({ paymentId, callback }) => {
  callback({
    'paymentTypeDetails': {},
    'fromAccountsDetails': {},
    'toAccountDetails': {},
    'chargeAccountDetails': {},
    'paymentMetaData': {},
    'fromAccountDeals': []
  });
};

export {
  getPayments,
  getPayment
};
