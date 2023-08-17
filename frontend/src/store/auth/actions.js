import api from "../api";

export default {
  loginAction(context, data) {
    return api.post("user/login", data);
  },
  logoutAction(ctx) {
    return api.post(
      "user/logout",
      {},
      {
        headers: {
          "x-authorization": ctx.state.authToken,
        },
      }
    );
  },
};
