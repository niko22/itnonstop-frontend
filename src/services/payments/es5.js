import { es5Get } from 'services/provider';

const PATH = 'api/payments';
const PATH_PAYMENTS = `${PATH}`;
const PATH_PAYMENT_DETAILS = `${PATH}/{paymentId}`;
const PATH_PAYMENT_TYPES = `${PATH}/types`;
const PATH_PAYMENT_TYPE_DETAILS = `${PATH}/types/{paymentType}`;
const PATH_PAYMENT_META = `${PATH}/{paymentId}/headers/{type}`;

const getPayments = callback => es5Get(PATH_PAYMENTS, callback);

const getPayment = (paymentId, callback) => {
  es5Get(PATH_PAYMENT_DETAILS.replace('{paymentId}', paymentId), callback);
};

const getPaymentTypes = (callback) => {
  es5Get(PATH_PAYMENT_TYPES, callback);
};

const getPaymentType = (paymentType, callback) => {
  es5Get(PATH_PAYMENT_TYPE_DETAILS.replace('{paymentType}', paymentType), callback);
};

const getPaymentMeta = (paymentId, type, callback) => {
  es5Get(
    PATH_PAYMENT_META
      .replace('{paymentId}', paymentId)
      .replace('{type}', type),
    callback
  );
};

export {
  getPayments,
  getPayment,
  getPaymentTypes,
  getPaymentType,
  getPaymentMeta,
};
