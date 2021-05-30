import { instance } from "./api"

export const authAPI = {

  login(email, password) {
    return instance.post('auth/login/', { email, password }).then(response => response.data);
  },

  register(username, email, password1, password2) {
    const body = JSON.stringify({ username, email, password1, password2 })
    console.log(body)
    return instance.post('auth/registration/', body).then(response => response.data);
  },
}