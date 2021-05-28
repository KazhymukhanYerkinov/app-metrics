import {
  instance
} from "./api"

export const authAPI = {
  login(email, password) {
    const body = JSON.stringify({email,password});
    return instance.post('auth/login/', body).then(response => response.data);
  }
}