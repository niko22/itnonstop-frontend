import { promiseGet } from 'services/provider';

const PATH = 'api/accounts';
const PATH_ACCOUNT_DETAILS = `${PATH}/{accountId}`;
const PATH_ACCOUNT_DEALS = `${PATH}/{accountId}/deals`;


const getAccounts = () => promiseGet(PATH);

const getAccount = accountId => promiseGet(PATH_ACCOUNT_DETAILS.replace('{accountId}', accountId));

const getAccountDeals = accountId => promiseGet(PATH_ACCOUNT_DEALS.replace('{accountId}', accountId));

export {
  getAccount,
  getAccounts,
  getAccountDeals,
};
