export const sellProduct = {
  namespaced: true,

  state() {
    return {
      sellTimer: null,
      sellProductList: null,
    };
  },

  getters: {
    getSellTimer(state) {
      return state.sellTimer;
    },
    getSellProductList(state) {
      return state.sellProductList;
    },
  },
  mutations: {
    SET_SELL_TIMER(state, sellTime) {
      state.sellTimer = sellTime;
    },
    SET_SELL_PRODUCT_LIST(state, productList) {
      state.sellProductList = productList;
    },
  },
  actions: {
    addSellTimer({ commit }, sellTime) {
      commit("SET_SELL_TIMER", sellTime);
    },
    addSellProductList({ commit }, productList) {
      commit("SET_SELL_PRODUCT_LIST", productList);
    },
  },
};
