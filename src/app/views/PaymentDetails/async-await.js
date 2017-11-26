import _ from 'underscore';
import { getPayment, getPaymentType, getPaymentMeta } from 'services/payments/promise';
import { getAccount, getAccountDeals } from 'services/accounts/promise';


const _getAccountDetails = async (fromAccountId, toAccountId, chargeAccountId) => Promise.all([
  getAccount(fromAccountId),
  getAccount(toAccountId),
  getAccount(chargeAccountId)
]);

const _getMeta = async (paymentId, paymentType, accountType) =>
      paymentType==='DOMESTIC' && accountType==='BUSINESS ACCOUNT'
      ? getPaymentMeta(paymentId, paymentType)
      : {};
      // console.log(_getMeta(10, 'DOMESTIC', 'BUSINESS ACCOUNT')); console.log(_getMeta(10, 'INTERNATIONAL', 'BUSINESS ACCOUNT'));

const getPaymentDetailsAsync = async (paymentId, callback = () => {}) => {
  try {
    const details = await getPayment(paymentId);
    const [fromAccountDetails, toAccountDetails, chargeAccountDetails] = await _getAccountDetails(details.fromAccountId, details.toAccountId, details.chargeAccountId);
    const fromAccountDeals = fromAccountDetails.superAccount ? await getAccountDeals(details.fromAccountId) : {};
    const paymentTypeDetails = await getPaymentType(details.paymentType);
    const paymentMetaData = await _getMeta(paymentId, details.paymentType, fromAccountDetails.accountType);
    callback(_.extend(details, {
      fromAccountDetails,
      fromAccountDeals,
      toAccountDetails,
      chargeAccountDetails,
      paymentTypeDetails,
      paymentMetaData}));
  } catch(err) {
    console.error(err);
  }
}

export default getPaymentDetailsAsync;
