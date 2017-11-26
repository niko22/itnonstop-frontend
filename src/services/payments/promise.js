import { promiseGet } from 'services/provider';

const PATH = 'api/payments';
const PATH_PAYMENTS = `${PATH}`;
const PATH_PAYMENT_DETAILS = `${PATH}/{paymentId}`;
const PATH_PAYMENT_TYPES = `${PATH}/types`;
const PATH_PAYMENT_TYPE_DETAILS = `${PATH}/types/{paymentType}`;
const PATH_PAYMENT_META = `${PATH}/{paymentId}/headers/{type}`;

const getPayments = () => promiseGet(PATH_PAYMENTS);

const getPayment = paymentId => promiseGet(PATH_PAYMENT_DETAILS.replace('{paymentId}', paymentId));

const getPaymentTypes = () => promiseGet(PATH_PAYMENT_TYPES);

const getPaymentType = paymentType => promiseGet(PATH_PAYMENT_TYPE_DETAILS.replace('{paymentType}', paymentType));

const getPaymentMeta = (paymentId, type) => promiseGet(
  PATH_PAYMENT_META
    .replace('{paymentId}', paymentId)
    .replace('{type}', type)
);

export {
  getPayments,
  getPayment,
  getPaymentTypes,
  getPaymentType,
  getPaymentMeta,
};
