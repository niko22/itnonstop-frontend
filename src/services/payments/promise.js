import _ from 'underscore';
import { es6Get as get } from 'services/provider';

const PATH_ACCOUNT_DETAILS = 'api/accounts/{accountId}';
const PATH_ACCOUNT_DEALS = 'api/accounts/{accountId}/deals';
const PATH_PAYMENT_DETAILS = 'api/payments/{paymentId}';
const PATH_PAYMENT_TYPES_DETAILS = 'api/payments/type/{type}';
const PATH_PAYMENT_META = 'api/payments/{paymentId}/headers/{type}';

const getPaymentDetails = paymentId => get(PATH_PAYMENT_DETAILS.replace('{paymentId}', paymentId));
const getAccountDetails = accountId => get(PATH_ACCOUNT_DETAILS.replace('{accountId}', data.fromAccountId));
const getTypeDetails = type => get(PATH_PAYMENT_TYPES_DETAILS.replace('{type}', data.paymentType));
const getDeals = accountId => get(PATH_ACCOUNT_DEALS.replace('{accountId}', data.fromAccountId));
const getMeta = (paymentId, type) => get(PATH_PAYMENT_META.replace('{paymentId}', data.paymentId).replace('{type}', data.paymentType));

export function getPayment({ paymentId, callback }) {
  getPaymentDetails(paymentId)
  .then( details => {
    callback(_.extend(details, {
      'paymentTypeDetails': {},
      'fromAccountsDetails': {},
      'toAccountDetails': {},
      'chargeAccountDetails': {},
      'paymentMetaData': {},
      'fromAccountDeals': []
    }));
  })
  .catch( err => {
    console.error(err);
  });
}
