import Cookies from "js-cookie";
const userStore = {
  state: {
    token: "",
  },
  mutations: {
    setToken(state, payload) {
      Cookies.set("accessToken", payload);
      state.token = payload;
    },
  },
  actions: {
    setToken({ commit }, payload) {
      commit("setToken", payload);
    },
  },
};
export default userStore;
