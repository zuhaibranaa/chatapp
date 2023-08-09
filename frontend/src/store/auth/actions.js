import api from "../api";

export default {
  loginAction(context, data) {
    return api.post("user/login", data);
    //   .then((res) => {
    //     context.commit("setAuth", res.data);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Login Success",
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // return context.state.auth;
  },
};
