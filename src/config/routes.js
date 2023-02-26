export const METEOMATICS_TOKEN = "https://login.meteomatics.com/api/v1/token";
export const METEOMATICS_WEATHER = "https://api.meteomatics.com/";

export const DEVELOPEMENT_SERVER = "http://localhost:3000/api";
export const PRODUCTION_SERVER = "https://main.d1euh075gobjok.amplifyapp.com/api";

const BASE_URL = PRODUCTION_SERVER
export const LOGIN_URL = BASE_URL + "/login";
export const WEATHER_URL = (parameters) => BASE_URL + `/weather?${parameters}`;