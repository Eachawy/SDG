import axios, { AxiosRequestConfig } from 'axios';
import { Storage } from 'react-jhipster';
import { IsJsonString } from 'app/shared/util/utils';
import { APP_PARAMETERS } from 'app/config/constants';

export const getVerifiedRequest = async (url, data) => {
  const response = await axios.get(url, data);
  return response;
}

export const postVerifiedRequest = async (url, data) => {
  const response = await axios.post(url, data);
  return response;
}

// export function getParameterByKey(key: string) {
//   const data = new Map(getSessionStorage(APP_PARAMETERS)).get(key);
//   if (data) {
//     return data;
//   } else {
//     return undefined;
//   }
// }

// export function getSessionStorage(key) {
//   const data = Storage.session.get(key);
//   if (data !== undefined && data !== null && Object.keys(data).length > 0) {
//     if (IsJsonString(data)) {
//       return JSON.parse(data);
//     } else {
//       return data;
//     }
//   } else {
//     return null;
//   }
// }
