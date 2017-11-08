import { es5Get } from 'services/provider';

const PATH = 'api/accounts';

const getAccounts = function (callback) {
  es5Get(PATH, callback);
};

const getAccount = function (accountId, callback) {
  es5Get(`${PATH}/${accountId}`, callback);
};

export {
  getAccount,
  getAccounts
};
