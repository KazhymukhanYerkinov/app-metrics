import { instance } from "./api"

export const authAPI = {

  login(email, password) {
    return instance.post('auth/login/', { email, password }).then(response => response.data);
  },

  register(username, email, password1, password2) {
    return instance.post('auth/registration/', { username, email, password1, password2 }).then(response => response.data);
  },

  user() {
    return instance.get('auth/user/').then(response => response.data);
  },

  logout() {
    return instance.post('auth/logout/').then(response => response.data);
  }
}