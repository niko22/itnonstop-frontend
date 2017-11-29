import { getPayment, getPaymentType, getPaymentMeta } from 'services/payments/promise';
import { getAccount, getAccountDeals } from 'services/accounts/promise';

const getMeta = (paymentId, paymentType, accountType) => (
  paymentType === 'DOMESTIC' && accountType === 'BUSINESS ACCOUNT'
    ? getPaymentMeta(paymentId, paymentType)
    : {}
);

const getPaymentDetailsPromise = (paymentId, callback = () => {}) => {
  const paymentDetails = {};

  getPayment(paymentId)
    .then((payment) => {
      Object.assign(paymentDetails, payment);

      return Promise.all([
        getAccount(payment.fromAccountId),             // fromAccountDetails
        getAccount(payment.toAccountId),               // toAccountDetails
        getAccount(payment.chargeAccountId),           // chargeAccountDetails
        getPaymentType(payment.paymentType),           // paymentTypeDetails
      ]);
    })
    .then(([fromAccountDetails, toAccountDetails, chargeAccountDetails, paymentTypeDetails]) => {
      Object.assign(paymentDetails, { fromAccountDetails, toAccountDetails, chargeAccountDetails, paymentTypeDetails });

      return Promise.all([
        fromAccountDetails.superAccount ? getAccountDeals(paymentDetails.fromAccountId) : {}, // fromAccountDeals
        getMeta(paymentId, paymentDetails.paymentType, fromAccountDetails.accountType),       // paymentMetaData
      ]);
    })
    .then(([fromAccountDeals, paymentMetaData]) => callback(
      Object.assign(paymentDetails, { fromAccountDeals, paymentMetaData }))
    );
};

export default getPaymentDetailsPromise;
