import axios from "axios";
import Cookie from "js-cookie";

export const oldKlikServer =
  "https://klikmetrics.ru/userTrack/";

export const instance = axios.create({
  baseURL: "https://klikmetrics-heroku.herokuapp.com/",
});

instance.interceptors.request.use((req) => {
  if (Cookie.get("access")) { 
    req.headers["Authorization"] = `Bearer ${Cookie.get("access")}`;
    req.headers["Content-Type"] = "application/json";
    req.headers["withCredentials"] = true;
    req.headers["Access-Control-Allow-Origin"] = "*";
    return req;
  } else {
    req.headers["Content-Type"] = "application/json";
    req.headers["withCredentials"] = true;
    req.headers["Access-Control-Allow-Origin"] = "*";
    return req;
  }
});


instance.interceptors.response.use((res) => {
  return res;
}, async function (error) {

  let origin_request = error.config;

  if (error.response.status === 401 && !origin_request._retry) {

    origin_request._retry = true
    let body = JSON.stringify({ refresh: Cookie.get('refresh') });

    return await instance.post('auth/token/refresh/', body).then(response => {

      if (response.status === 200) {
        Cookie.set('access', response.data.access);
        instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`; 
        return instance(origin_request);
      }
    });
  }  
});
