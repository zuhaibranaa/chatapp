import api from "../api";

export default {
  loginAction(data) {
    let token = null;
    api.post("user/login", data).then((res) => {
      token = res.data.token;
    });
    return token;
  },
};
