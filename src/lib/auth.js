import dayjs from '../lib/day';
import { getStorage, setStorage } from "./storage";

const setAndReturnAccessToken = async() => {
  const response = await fetch("https://main.d1euh075gobjok.amplifyapp.com/api/login", { method: 'GET' });
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



