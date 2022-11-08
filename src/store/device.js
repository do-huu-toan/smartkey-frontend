const deviceStore = {
  state: {
    deviceOnline: []
  },
  mutations: {
    setDeviceOnline(state, payload) {
      state.deviceOnline = payload;
    },
    setStatusDeviceOnlineByKey(state, payload){
      var newArray = [...state.deviceOnline];
      var index = newArray.findIndex(item => item.key === payload.key);
      newArray[index].status.status = payload.status == "true" ? true : false;
      state.deviceOnline = newArray;
    }
  },
  actions: {
    setDeviceOnline({ commit }, payload) {
      commit("setDeviceOnline", payload);
    },
    setStatusDeviceOnlineByKey({ commit }, payload){
      commit("setStatusDeviceOnlineByKey", payload);
    }
  },
};
export default deviceStore;
