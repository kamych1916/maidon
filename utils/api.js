import axios from "axios";
const API_BASE_URL = "https://mirllex.site/server/api/v1";

export default class Api {
  instance = null;

  static getInstance() {
    if (Api.instance == null) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  // lang = {
  //   async GetLanguage(lang) {
  //       return axios.get(`${API_BASE_URL}/get_language?language=${lang}`, )
  //   },
  // }

  offer = {
    async get_offers(data) {
      return axios.post(`${API_BASE_URL}/get_filter_offers`, data);
      // for (let prop in data) {
      // console.log(Object.keys(data[prop]) ? "kek" : "lol");
      // if (data[prop] == null) {
      // delete data[prop];
      // }
      // delete prop.options;
      // }
      // return "";
    },
    // async get_sales_offers (deal, kind, type, object, repair) {
    //   return axios.get(`${API_BASE_URL}/get_sales_offers?deal=${deal}&kind=${kind}&type=${type}&object=${object}&repair=${repair}`)
    // },
    async get_address(userData) {
      return axios.post(`${API_BASE_URL}/offer_geocoder_reverse`, userData);
    },
    async get_marker(userData) {
      return axios.post(`${API_BASE_URL}/offer_geocoder_geocode`, userData);
    },
    async send_offer_data(offerData) {
      return axios.post(`${API_BASE_URL}/offer_place_an_ad`, offerData);
    },
    async upload_file(formData) {
      return axios.post(`${API_BASE_URL}/offer_uploadfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  };

  auth = {
    async login(userData) {
      return axios.post(`${API_BASE_URL}/auth_signin`, userData);
    },
    async logout() {
      return axios.delete(`${API_BASE_URL}/auth_logout`);
    },
    async register(userData) {
      return axios.post(`${API_BASE_URL}/auth_signup`, userData);
    },
    async forgot_password(email) {
      return axios.get(`${API_BASE_URL}/auth_reset_password/?email=${email}`);
    },
    async reset_password(code, password, email) {
      return axios.post(
        `${API_BASE_URL}/auth_change_password?code=${code}&new_password=${password}&email=${email}`
      );
    },
    async send_activate_code(token) {
      return axios.post(`${API_BASE_URL}/auth_activ_user`, {
        token: token
      });
    },
    async checkAccess() {
      return axios.get(`${API_BASE_URL}/auth_is_login`);
    },
    async check_is_admin() {
      return axios.get(`${API_BASE_URL}/auth_is_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("st")}`
        }
      });
    }
  };
}
