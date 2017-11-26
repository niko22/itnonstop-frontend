import _ from 'underscore';
import { getPayment, getPaymentType, getPaymentMeta } from 'services/payments/promise';
import { getAccount, getAccountDeals } from 'services/accounts/promise';


const getPaymentDetailsPromise = (paymentId, callback = () => {}) => {
  getPayment(paymentId)
    .then((paymentDetails) => {
      Promise.all([
        getAccount(paymentDetails.fromAccountId),               // fromAccountDetails
        getAccountDeals(paymentDetails.fromAccountId),          // fromAccountDeals
        getAccount(paymentDetails.fromAccountId),               // toAccountDetails
        getAccount(paymentDetails.fromAccountId),               // chargeAccountDetails
        getPaymentType(paymentDetails.paymentType),             // paymentTypeDetails
        getPaymentMeta(paymentId, paymentDetails.paymentType),  // paymentMetaData
      ])
        .then(([
          fromAccountDetails,
          fromAccountDeals,
          toAccountDetails,
          chargeAccountDetails,
          paymentTypeDetails,
          paymentMetaData,
        ]) => callback(_.extend(paymentDetails, {
          fromAccountDetails,
          fromAccountDeals,
          toAccountDetails,
          chargeAccountDetails,
          paymentTypeDetails,
          paymentMetaData,
        }))
        );
    });
};

export default getPaymentDetailsPromise;
