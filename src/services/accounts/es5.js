import { es5Get } from 'services/provider';

const PATH = 'api/accounts';
const PATH_ACCOUNT_DETAILS = `${PATH}/{accountId}`;
const PATH_ACCOUNT_DEALS = `${PATH}/{accountId}/deals`;


const getAccounts = (callback) => {
  es5Get(PATH, callback);
};

const getAccount = (accountId, callback) => {
  es5Get(PATH_ACCOUNT_DETAILS.replace('{accountId}', accountId), callback);
};

const getAccountDeals = (accountId, callback) => {
  es5Get(PATH_ACCOUNT_DEALS.replace('{accountId}', accountId), callback);
};

export {
  getAccount,
  getAccounts,
  getAccountDeals,
};
