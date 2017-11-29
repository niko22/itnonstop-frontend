import _ from 'underscore';
import { getPayment, getPaymentType, getPaymentMeta } from 'services/payments/promise';
import { getAccount, getAccountDeals } from 'services/accounts/promise';


const _getMeta = async (paymentId, paymentType, accountType) => (
  paymentType === 'DOMESTIC' && accountType === 'BUSINESS ACCOUNT'
    ? getPaymentMeta(paymentId, paymentType)
    : {}
);

const getPaymentDetailsAsync = async (paymentId, callback = () => {}) => {
  try {
    const details = await getPayment(paymentId);
    const [fromAccountDetails, toAccountDetails, chargeAccountDetails, paymentTypeDetails] = await Promise.all([
      getAccount(details.fromAccountId),
      getAccount(details.toAccountId),
      getAccount(details.chargeAccountId),
      getPaymentType(details.paymentType)
    ]);
    const fromAccountDeals = fromAccountDetails.superAccount ? await getAccountDeals(details.fromAccountId) : {};
    const paymentMetaData = await _getMeta(paymentId, details.paymentType, fromAccountDetails.accountType);

    callback(_.extend(details, {
      fromAccountDetails,
      fromAccountDeals,
      toAccountDetails,
      chargeAccountDetails,
      paymentTypeDetails,
      paymentMetaData
    }));
  } catch (err) {
    console.error(err);
  }
};

export default getPaymentDetailsAsync;



// console.log(_getMeta(10, 'DOMESTIC', 'BUSINESS ACCOUNT'));
// console.log(_getMeta(10, 'INTERNATIONAL', 'BUSINESS ACCOUNT'));
