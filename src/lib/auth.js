import dayjs from '../lib/day';
import { getStorage, setStorage } from "./storage"
import axios from "axios";

const login = () => {
  return axios.get("https://login.meteomatics.com/api/v1/token/", {
    headers: { 
      'Authorization': `Basic ${window.btoa(process.env.NEXT_PUBLIC_API_USERNAME + ":" + process.env.NEXT_PUBLIC_API_PASSWORD)}`,
      'Content-Type': 'application/json'
    }
  })
}

const setAndReturnAccessToken = async() => {
  const response = await login();
  const { access_token } = response.data;
  setStorage('auth', JSON.stringify({ createdAt: dayjs().valueOf(), token: access_token }));
  return access_token;
}

export const checkAccessTokenValidity = async() => {
  let auth = getStorage("auth") ?? null;
  if (auth) {
    auth = JSON.parse(auth);
    console.log(dayjs().isAfter(dayjs(auth.createdAt).add(2, 'hours')));
    if (dayjs().isAfter(dayjs(auth.createdAt).add(2, 'hours'))) {
      return setAndReturnAccessToken();
    }
    return auth.token;
  }
  return setAndReturnAccessToken();
}



