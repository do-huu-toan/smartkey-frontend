import Cookies from "js-cookie";
import utils from "../utils"
const userStore = {
  state: {
    token: "",
    userId: "",
  },
  mutations: {
    setToken(state, payload) {
      Cookies.set("accessToken", payload);
      state.token = payload;
    },
    loadStateUser(state){
      state.token = utils.getToken();
      state.userId =  utils.getUserId()
    }
  },
  actions: {
    setToken({ commit }, payload) {
      commit("setToken", payload);
    },
    loadDateForUser({ commit }, payload){
      commit("loadStateUser", payload);
    }
  },
};
export default userStore;
