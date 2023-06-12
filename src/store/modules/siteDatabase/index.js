export const siteDatabase = {
  namespaced: true,

  state() {
    return {
      eCommerceData: JSON.parse(localStorage.getItem("e_commerce_data")) || {},
    };
  },

  getters: {
    getECommerceData(state) {
      return state.eCommerceData;
    },
  },
  mutations: {
    SET_E_COMMERCE_DATA(state, eCommerceData) {
      state.eCommerceData = eCommerceData;
    },
  },
  actions: {
    addECommerceData({ commit }, eCommerceData) {
      commit("SET_E_COMMERCE_DATA", eCommerceData);
    },
  },
};
