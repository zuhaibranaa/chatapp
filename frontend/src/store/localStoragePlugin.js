export default (store) => {
  store.subscribe((mutation, state) => {
    // Store the state in localStorage whenever a mutation occurs
    localStorage.setItem("vuexState", JSON.stringify(state));
  });
};
