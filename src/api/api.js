import axios from "axios";
import Cookie from "js-cookie";

export const oldKlikServer =
  "https://klikmetrics.ru/userTrack/";

export const instance = axios.create({
  baseURL: "https://klikmetrics-heroku.herokuapp.com/",
});

instance.interceptors.request.use((req) => {
  if (Cookie.get("access")) {
    req.headers["Authorization"] = `Bearer ${Cookie.get(
      "access"
    )}`;
    req.headers["Content-Type"] = "application/json";
    return req;
  } else {
    req.headers["Content-Type"] = "application/json";
    return req;
  }
});
