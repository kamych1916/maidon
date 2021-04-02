import axios from "axios";
const API_BASE_URL = 'https://mirllex.site/server/api/v1';

export default class Api {
    instance = null;


    static getInstance() {
        if (Api.instance == null) {
            Api.instance = new Api;
        }
        return Api.instance;
    }

    lang = {
        async GetLanguage(lang) {
            return axios.get(`${API_BASE_URL}/get_language?language=${lang}`, )
        },
    }

    auth = {
      async login (userData) {
          return axios.post(`${API_BASE_URL}/signin`, userData)
        },
        async logout() {
          return axios.delete(`${API_BASE_URL}/logout`)
        },
        async register (userData) {
          return axios.post(`${API_BASE_URL}/signup`, userData)
        },
        async forgot_password(email) {
            return axios.get(`${API_BASE_URL}/reset_password/?email=${email}`)
        },
        async reset_password(code, password, email) {
            return axios.post(`${API_BASE_URL}/change_password?code=${code}&new_password=${password}&email=${email}`)
        },
        async send_activate_code(token) {
          return axios.post(`${API_BASE_URL}/activ_user`, {
            token: token
          })
        },
        async is_login(){
            return axios.get(`${API_BASE_URL}/is_login`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('st')}`
                    }
                }
            )
        },
        async check_is_admin() {
            return axios.get(`${API_BASE_URL}/is_admin`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('st')}`
                    }
                }
            )
        },
    }
}
