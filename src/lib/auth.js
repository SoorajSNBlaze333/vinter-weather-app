import dayjs from '../lib/day';
import { getStorage, setStorage } from "./storage"

const login = () => {
  return fetch("https://login.meteomatics.com/api/v1/token", {
    method: 'GET',
    headers: { 
      'Authorization': `Basic ${window.btoa(process.env.NEXT_PUBLIC_API_USERNAME + ":" + process.env.NEXT_PUBLIC_API_PASSWORD)}`,
      'Content-Type': 'application/json',
    },
    mode: 'cors'
  })
}

const setAndReturnAccessToken = async() => {
  const response = await login();
  const { access_token } = await response.json();
  setStorage('auth', JSON.stringify({ createdAt: dayjs().valueOf(), token: access_token }));
  return access_token;
}

export const checkAccessTokenValidity = async() => {
  let auth = getStorage("auth") ?? null;
  if (auth) {
    auth = JSON.parse(auth);
    if (dayjs().isAfter(dayjs(auth.createdAt).add(2, 'hours'))) {
      return setAndReturnAccessToken();
    }
    return auth.token;
  }
  return setAndReturnAccessToken();
}



