import { es6Get as get } from 'services/provider';

const PATH_ACCOUNT_DETAILS = 'api/accounts/{accountId}';
const PATH_ACCOUNT_DEALS = 'api/accounts/{accountId}/deals';
const PATH_PAYMENT_DETAILS = 'api/payments/{paymentId}';
const PATH_PAYMENT_TYPES_DETAILS = 'api/payments/types/{type}';
const PATH_PAYMENT_META = 'api/payments/{paymentId}/headers/{type}';

const getPaymentDetails = paymentId => get(PATH_PAYMENT_DETAILS.replace('{paymentId}', paymentId));
const getAccountDetails = accountId => get(PATH_ACCOUNT_DETAILS.replace('{accountId}', accountId));
const getTypeDetails = paymentType => get(PATH_PAYMENT_TYPES_DETAILS.replace('{type}', paymentType));
const getDeals = accountId => get(PATH_ACCOUNT_DEALS.replace('{accountId}', accountId));
const getMeta = (paymentId, paymentType) => get(PATH_PAYMENT_META.replace('{paymentId}', paymentId).replace('{type}', paymentType));

export async function getPayment({ paymentId, callback }) {
  try {
    const details = await getPaymentDetails(paymentId);
    details.fromAccountsDetails = await getAccountDetails(details.fromAccountId);
    details.toAccountDetails = await getAccountDetails(details.toAccountId);
    details.chargeAccountDetails = await getAccountDetails(details.chargeAccountId);
    details.fromAccountDeals = await getDeals(details.fromAccountId);
    details.paymentTypeDetails = await getTypeDetails(details.paymentType);
    details.paymentMetaData = await getMeta(details.paymentId, details.paymentType);
    callback(details);
  } catch(err) {
    console.error(err);
  }
}
