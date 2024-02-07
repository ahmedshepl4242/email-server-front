// store.js
import { createStore } from "vuex";

export default createStore({
  state: {
    isLogged: false,
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLogged = status;
    },
  },
});
