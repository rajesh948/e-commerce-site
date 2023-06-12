import { createStore } from "vuex";

import { cart } from "./modules/cart";
import { sellProduct } from "./modules/sellProduct";
import { siteDatabase } from "./modules/siteDatabase";

const store = createStore({
  modules: {
    cart,
    sellProduct,
    siteDatabase,
  },

  state() {
    return {
      loginUserDetail: null,
    };
  },
  getters: {
    getLoginUserDetail(state) {
      return state.loginUserDetail;
    },
  },
  mutations: {
    SET_USER_LOGIN(state, setLogin) {
      state.loginUserDetail = setLogin;
    },
  },
  actions: {
    setUserLogin(context, userLogin) {
      context.commit("SET_USER_LOGIN", userLogin);
    },
  },
});
export default store;
