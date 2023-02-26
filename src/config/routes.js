export const METEOMATICS_TOKEN = "https://login.meteomatics.com/api/v1/token";
export const METEOMATICS_WEATHER = "https://api.meteomatics.com/";

export const DEVELOPEMENT_SERVER = "http://localhost:3000/api";
export const PRODUCTION_SERVER = "https://main.d1euh075gobjok.amplifyapp.com/api";

export const LOGIN_URL = PRODUCTION_SERVER + "/login";
export const WEATHER_URL = (parameters) => PRODUCTION_SERVER + `weather/${parameters}`;