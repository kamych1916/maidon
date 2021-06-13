import axios from "axios";
const API_BASE_URL = "https://mirllex.site/server/api/v1";
const API_SERVICES_URL = "https://mirllex.site/services/api/v1";
import NTFS from "~/utils/notifications";

export default class Api {
  instance = null;

  static getInstance() {
    if (Api.instance == null) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  static getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (let i in ca) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length).split('"')[1];
      }
    }
    return "";
  }

  static setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  static sendNTFS(title, message, type) {
    NTFS.getInstance().NTFS(title, message, type);
  }

  static typicalNTFS(status, successData) {
    if (status) {
      if (status == 500) {
        Api.sendNTFS("Ошибка", "Сервер не доступен :(", "error");
      } else if (status == 422) {
        Api.sendNTFS("Ошибка", "Сервер отправил неверные данные :(", "error");
      } else if (status == 481) {
        Api.sendNTFS(
          "Ошибка",
          "Вы не можете отправить самому себе сообщение :(",
          "error"
        );
      } else if (status == 401) {
        Api.sendNTFS("Ошибка", "Вы не авторизованы", "warning");
        localStorage.removeItem("ui");
        Api.setCookie("session_token", "", null);
        setTimeout(() => {
          window.location.href = "/account/login";
        }, 1000);
      } else if (status == 482) {
        Api.sendNTFS(
          "Ошибка",
          "Срок действия вашей сессии истёк, авторизуйтесь заново",
          "warning"
        );
        localStorage.removeItem("ui");
        Api.setCookie("session_token", "", null);
        setTimeout(() => {
          window.location.href = "/account/login";
        }, 1000);
      } else if (status == 409) {
        Api.sendNTFS("Ошибка", "Данные получены неверно", "warning");
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 1000);
      } else if (status == 403) {
        Api.sendNTFS(
          "Ошибка",
          "У вас нет доступа к данной странице",
          "warning"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else if (status == 404) {
        Api.sendNTFS("Ошибка", "Данный запрос не найден", "warning");
      } else if (status == 426) {
        Api.sendNTFS(
          "Ошибка",
          "Ваш аккаунт не активирован! Введите код из СМС ",
          "warning"
        );
      }
    } else {
      this.sendNTFS("Отлично!", successData, "success");
    }
  }

  clients = {
    //Получение списка всех аккаунтов - риелторов и агентств
    async get_accounts(data) {
      return axios.post(`${API_BASE_URL}/get_accounts`, data);
    },
    async get_info_account(data) {
      return axios.get(`${API_BASE_URL}/get_info_account/${data}`);
    },
    async add_review(data) {
      return axios.post(`${API_BASE_URL}/add_review`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async list_services(specialization, type) {
      return axios.get(
        `${API_BASE_URL}/list_services?specialization=${specialization}&type=${type}`
      );
    }
  };

  offer = {
    async open_chat(data) {
      return axios.post(`${API_BASE_URL}/open_chat`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async add_complaint(data) {
      return axios.post(`${API_BASE_URL}/add_complaint`, data);
    },
    async get_filter_offers(data) {
      return axios.post(`${API_BASE_URL}/get_filter_offers`, data);
    },
    async get_offer(data) {
      return axios.get(`${API_BASE_URL}/get_offer/${data}`);
    },
    async get_map_offer(data) {
      return axios.get(`${API_BASE_URL}/get_map_offer/${data}`);
    },
    async get_address(userData) {
      return axios.post(`${API_BASE_URL}/get_address`, userData);
    },
    async get_marker(userData) {
      return axios.post(`${API_BASE_URL}/get_marker`, userData);
    },
    async get_markers() {
      return axios.get(`${API_BASE_URL}/get_markers`);
    },
    async get_list_specialization() {
      return axios.get(`${API_BASE_URL}/get_list_specialization`);
    },
    async get_list_city() {
      return axios.get(`${API_BASE_URL}/get_list_city`);
    },
    async view_tel(id) {
      return axios.post(`${API_BASE_URL}/view_tel`, id);
    },
    async create_offer(offerData) {
      return axios.post(`${API_BASE_URL}/create_offer`, offerData, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async patch_services(offerData) {
      return axios.patch(`${API_BASE_URL}/patch_services`, offerData, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },

    async offer_uplodfile(formData) {
      return axios.post(`${API_BASE_URL}/offer_uploadfile`, formData, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`,
          "Content-Type": "multipart/form-data"
        }
      });
    },
    async offer_uploadfile_services(formData) {
      return axios.post(`${API_BASE_URL}/offer_uploadfile_services`, formData, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`,
          "Content-Type": "multipart/form-data"
        }
      });
    }
  };

  account = {
    async delete_chat(data) {
      return axios.post(`${API_BASE_URL}/delete_chat`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async get_user_chats() {
      return axios.get(`${API_BASE_URL}/get_user_chats`, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async get_messages(data) {
      return axios.post(`${API_BASE_URL}/get_messages`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async get_user_offers() {
      return axios.get(`${API_BASE_URL}/get_user_offers`, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async get_user_services() {
      return axios.get(`${API_BASE_URL}/get_user_services`, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async get_moder_offer() {
      return axios.get(`${API_BASE_URL}/get_moder_offer`, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async get_moder_services() {
      return axios.get(`${API_BASE_URL}/get_moder_services`, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async active_offer(data) {
      return axios.post(`${API_BASE_URL}/active_offer`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async active_services(data) {
      return axios.post(`${API_BASE_URL}/active_services`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },

    async patch_info(data) {
      return axios.post(`${API_BASE_URL}/patch_info`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async patch_pass(data) {
      return axios.post(`${API_BASE_URL}/patch_pass`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async change_offer(data) {
      return axios.post(`${API_BASE_URL}/change_offer`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async delete_avatar() {
      return axios.delete(`${API_BASE_URL}/delete_avatar`, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async delete_offer(data) {
      return axios.post(`${API_BASE_URL}/delete_offer`, data);
    },
    async delete_services(data) {
      return axios.post(`${API_BASE_URL}/delete_services`, data, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`
        }
      });
    },
    async reset_pass(data) {
      return axios.post(`${API_BASE_URL}/reset_pass`, data);
    },
    async restore_pass(data) {
      return axios.post(`${API_BASE_URL}/restore_pass`, data);
    },
    async upload_avatar(formData) {
      return axios.post(`${API_BASE_URL}/upload_avatar`, formData, {
        headers: {
          Authorization: `Bearer ${Api.getCookie("session_token")}`,
          "Content-Type": "multipart/form-data"
        }
      });
    }
  };

  auth = {
    async signin(userData) {
      return axios.post(`${API_BASE_URL}/signin`, userData);
    },
    async signup(userData) {
      return axios.post(`${API_BASE_URL}/signup`, userData);
    },
    async forgot_password(email) {
      return axios.get(`${API_BASE_URL}/reset_password/?email=${email}`);
    },
    async reset_password(code, password, email) {
      return axios.post(
        `${API_BASE_URL}/change_password?code=${code}&new_password=${password}&email=${email}`
      );
    },
    async send_activate_code(data) {
      return axios.post(`${API_BASE_URL}/send_activate_code`, data);
    },
    async check_access() {
      return axios.get(`${API_BASE_URL}/check_access`);
    },
    async check_is_admin() {
      return axios.get(`${API_BASE_URL}/is_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("st")}`
        }
      });
    }
  };
}
