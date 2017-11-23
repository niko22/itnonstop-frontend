import { es5Get } from 'services/provider';

const defaultGet = ({ url, callback }) => es5Get(url, callback);

const getPayments = defaultGet;

const getPayment = defaultGet;

export {
  getPayments,
  getPayment
};
