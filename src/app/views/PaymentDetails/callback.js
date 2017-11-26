import _ from 'underscore';
import { getPayment, getPaymentType, getPaymentMeta } from 'services/payments/es5';
import { getAccount, getAccountDeals } from 'services/accounts/es5';


const getPaymentDetailsCallback = (paymentId, callback = () => {}) => {
  getPayment(paymentId, (paymentDetails) => {
    // fromAccountsDetails
    getAccount(paymentDetails.fromAccountId, (fromAccountsDetails) => {
      _.extend(paymentDetails, { fromAccountsDetails });

      // fromAccountDeals
      getAccountDeals(paymentDetails.fromAccountId, (fromAccountDeals) => {
        _.extend(paymentDetails, { fromAccountDeals });

        // toAccountDetails
        getAccount(paymentDetails.fromAccountId, (toAccountDetails) => {
          _.extend(paymentDetails, { toAccountDetails });

          // chargeAccountDetails
          getAccount(paymentDetails.fromAccountId, (chargeAccountDetails) => {
            _.extend(paymentDetails, { chargeAccountDetails });

            // paymentTypeDetails
            getPaymentType(paymentDetails.paymentType, (paymentTypeDetails) => {
              _.extend(paymentDetails, { paymentTypeDetails });

              // paymentMetaData
              getPaymentMeta(paymentId, paymentDetails.paymentType, (paymentMetaData) => {
                _.extend(paymentDetails, { paymentMetaData });

                callback(paymentDetails);
              });
            });
          });
        });
      });
    });
  });
};

export default getPaymentDetailsCallback;
