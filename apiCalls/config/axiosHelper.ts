import axios from 'axios';
import {
  isDev,
  isLocalhost,
  isProd,
  isSandbox,
  RUNNING_API_LOCALLY,
} from './envHelpers';
import API_KEYS from './api-keys';

import queryString from 'query-string';
import {
  getBrandCodeFromHost,
  getFormattedLevels,
} from '../../config/configJson';

export const API_KEY_HEADER_KEY = 'X-API-KEY';

export const selectApiUrl = (originUrl?: string) => {
  const hostLevels = getFormattedLevels(originUrl);

  const localhostApi = 'http://127.0.0.1:8000/api/v1';

  const devApi = 'https://dev-api.simplenight.com/api/v1';
  const prodApi = 'https://api.simplenight.com/api/v1';
  const prodApiSandbox = 'https://api.demo.simplenight.com/api/v1';

  if (RUNNING_API_LOCALLY && isLocalhost(hostLevels)) return localhostApi;
  if (isDev(hostLevels)) return devApi;
  if (isProd(hostLevels)) {
    if (isSandbox(hostLevels)) return prodApiSandbox;
    return prodApi;
  }
  return devApi;
};

export const getApiKey = (originUrl?: string): string => {
  const brandCode = getBrandCodeFromHost(originUrl);
  const hostLevels = getFormattedLevels(originUrl);
  if (isProd(hostLevels)) {
    if (isSandbox(hostLevels)) return API_KEYS.DEV;
    return API_KEYS.PROD;
  }
  return API_KEYS[brandCode] || API_KEYS.DEV;
};

const headers = {
  [API_KEY_HEADER_KEY]: '',
} as any;

export const setAuthHeaders = () => {
  const queryParams = queryString.parse(window.location.search);
  const oldKey = localStorage?.getItem('SIMPLENIGHT-X-API-KEY') as string;
  let newKey: string;
  if (queryParams.apiKey) {
    newKey = queryParams.apiKey as string;
  } else if (oldKey) {
    newKey = oldKey;
  } else {
    newKey = getApiKey();
  }
  headers[API_KEY_HEADER_KEY] = newKey;
  localStorage.setItem('SIMPLENIGHT-X-API-KEY', newKey);
};

const setServerAuthHeaders = (originUrl: string, apiKey?: string) => {
  if (apiKey) {
    headers[API_KEY_HEADER_KEY] = apiKey;
    return headers;
  }

  headers[API_KEY_HEADER_KEY] = getApiKey(originUrl);
  return headers;
};

export const createServerAxiosInstance = (
  originUrl: string,
  apiKey?: string,
) => {
  const requestHeaders = setServerAuthHeaders(originUrl, apiKey);
  const apiUrl = selectApiUrl(originUrl);

  return axios.create({
    baseURL: apiUrl,
    headers: requestHeaders,
  });
};

export default (() => {
  return axios.create({
    baseURL: 'api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
})();
