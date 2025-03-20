import axios, { AxiosRequestConfig } from 'axios';
import { Storage } from 'react-jhipster';
import { IsJsonString } from 'app/shared/util/utils';
import {
  APP_PARAMETERS,
  AUTH_TOKEN_KEY,
  GATEWAY_SERVER_API_URL
} from 'app/config/constants';

const TIMEOUT = 10 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;

// export async function authenticate(nationalId, channelCode) {
//   const request = {
//     nationalId,
//     channelCode,
//   };
//   let response = await axios.post(GATEWAY_SERVER_API_URL + authentication, request);
//   if (response.data.access_token) {
//     return response.data.access_token;
//   } else {
//     return response;
//   }
// }

export async function getVerifiedRequest(url, config?: AxiosRequestConfig) {
  const token = getParameterByKey(AUTH_TOKEN_KEY);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let response = await axios.get(GATEWAY_SERVER_API_URL + url, config);
  if (response.data.id_token) {
    return response.data.id_token;
  } else {
    return response;
  }
}

export async function postVerifiedRequest(url, data) {
  const token = getParameterByKey(AUTH_TOKEN_KEY);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.post(GATEWAY_SERVER_API_URL + url, data);
  return response;
}

export function getParameterByKey(key: string) {
  const data = new Map(getSessionStorage(APP_PARAMETERS)).get(key);
  if (data) {
    return data;
  } else {
    return undefined;
  }
}

export function getSessionStorage(key) {
  let data = Storage.session.get(key);
  if (data !== undefined && data !== null && Object.keys(data).length > 0) {
    if (IsJsonString(data)) {
      return JSON.parse(data);
    } else {
      return data;
    }
  } else {
    return null;
  }
}
