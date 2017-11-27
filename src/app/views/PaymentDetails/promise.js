import _ from 'underscore';
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
      _.extend(paymentDetails, payment);

      return Promise.all([
        getAccount(payment.fromAccountId),               // fromAccountDetails
        getAccount(payment.fromAccountId),               // toAccountDetails
        getAccount(payment.fromAccountId),               // chargeAccountDetails
        getPaymentType(payment.paymentType),             // paymentTypeDetails
      ]);
    })
    .then(([fromAccountDetails, toAccountDetails, chargeAccountDetails, paymentTypeDetails]) => {
      _.extend(paymentDetails, { fromAccountDetails, toAccountDetails, chargeAccountDetails, paymentTypeDetails });

      return Promise.all([
        fromAccountDetails.superAccount ? getAccountDeals(paymentDetails.fromAccountId) : {}, // fromAccountDeals
        getMeta(paymentId, paymentDetails.paymentType, fromAccountDetails.accountType),       // paymentMetaData
      ]);
    })
    .then(([fromAccountDeals, paymentMetaData]) => callback(
      _.extend(paymentDetails, { fromAccountDeals, paymentMetaData }))
    );
};

export default getPaymentDetailsPromise;
