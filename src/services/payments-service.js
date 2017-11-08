import { es5Get } from 'services/provider';

const PATH = 'api/payments';

const getPayments = function (callback) {
  es5Get(PATH, callback);
};

export default getPayments;
