import { instance } from "./api"

export const authAPI = {
  login(email, password) {
    return instance.post('auth/login/', { email, password }).then(response => response.data);
  }
}