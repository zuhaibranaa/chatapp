export default {
  setAuth(state, data) {
    let { user, token } = data;
    state.user = user;
    state.authToken = token;
  },
};
