import { getPayment, getPaymentType, getPaymentMeta } from 'services/payments/es5';
import { getAccount, getAccountDeals } from 'services/accounts/es5';


const getPaymentDetailsCallback = (paymentId, callback = () => {}) => {
  getPayment(paymentId, (paymentDetails) => {
    // fromAccountDetails
    getAccount(paymentDetails.fromAccountId, (fromAccountDetails) => {
      Object.assign(paymentDetails, { fromAccountDetails });

      // fromAccountDeals
      getAccountDeals(paymentDetails.fromAccountId, (fromAccountDeals) => {
        Object.assign(paymentDetails, { fromAccountDeals });

        // toAccountDetails
        getAccount(paymentDetails.toAccountId, (toAccountDetails) => {
          Object.assign(paymentDetails, { toAccountDetails });

          // chargeAccountDetails
          getAccount(paymentDetails.chargeAccountId, (chargeAccountDetails) => {
            Object.assign(paymentDetails, { chargeAccountDetails });

            // paymentTypeDetails
            getPaymentType(paymentDetails.paymentType, (paymentTypeDetails) => {
              Object.assign(paymentDetails, { paymentTypeDetails });

              // paymentMetaData
              getPaymentMeta(paymentId, paymentDetails.paymentType, (paymentMetaData) => {
                Object.assign(paymentDetails, { paymentMetaData });

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
