import {
  productIndexInCart,
  saveCartData,
  currentCartDB,
} from "@/helper/cartHelper.js";
import { loginUserData } from "@/helper/userLoginHelper";

export const cart = {
  namespaced: true,

  state() {
    return {
      cartData: JSON.parse(localStorage.getItem("cartData")) || {
        addProducts: [],
        total: 0,
        userId: null,
      },
      checkoutData: JSON.parse(localStorage.getItem("checkoutData")) ?? [],
      usersCartData: JSON.parse(localStorage.getItem("usersCartData")) ?? [],
    };
  },

  getters: {
    getCartData(state) {
      return state.cartData;
    },
    getUsersCartData(state) {
      if (loginUserData()) {
        const currentCartInfo = currentCartDB(
          state.cartData,
          state.usersCartData
        );
        state.usersCartData = currentCartInfo.currentCartDB;

        return state.usersCartData[currentCartInfo.userIndex];
      }
    },
    getCheckoutData(state) {
      return state.checkoutData;
    },
  },
  mutations: {
    SET_CART_DATA(state, cartData) {
      state.cartData = cartData;
      saveCartData(state.cartData, "cartData");
    },

    SET_USER_CART_DATA(state, userCartData) {
      const index = state.usersCartData.findIndex(
        (cartData) => cartData.userId === userCartData.userId
      );

      if (index === -1) {
        state.usersCartData.push(userCartData);
      } else {
        state.usersCartData.splice(index, 1, userCartData);
      }
      saveCartData(state.usersCartData, "usersCartData");
    },
    ADD_PRODUCT_TO_CART(state, product) {
      const currentCartInfo = currentCartDB(
        state.cartData,
        state.usersCartData
      );
      const currentCartDBName = currentCartInfo.currentCartDBName;
      let currentCart = currentCartInfo.currentCartDB;
      if (currentCartDBName === "usersCartData") {
        state.usersCartData = currentCartInfo.currentCartDB;
        currentCart = state.usersCartData[currentCartInfo.userIndex];
      }

      const productIndex = productIndexInCart(currentCart, product.id);
      product.quantity--;
      if (product.quantity < 0) {
        return alert("out of stock");
      }
      if (productIndex === -1) {
        currentCart.addProducts.push({ product: product, quantity: 1 });
      } else {
        currentCart.addProducts[productIndex].quantity++;
      }
      currentCart.total += product.price;

      saveCartData(state[currentCartDBName], currentCartDBName);
    },
    INCREASE_QUANTITY(state, product) {
      const currentCartInfo = currentCartDB(
        state.cartData,
        state.usersCartData
      );
      const currentCartDBName = currentCartInfo.currentCartDBName;
      let currentCart = currentCartInfo.currentCartDB;
      if (currentCartDBName === "usersCartData") {
        state.usersCartData = currentCartInfo.currentCartDB;
        currentCart = state.usersCartData[currentCartInfo.userIndex];
      }

      const productIndex = productIndexInCart(currentCart, product.id);

      if (currentCart.addProducts[productIndex].product.quantity < 1) {
        return alert("out of stock");
      }

      currentCart.addProducts[productIndex].product.quantity--;
      currentCart.addProducts[productIndex].quantity++;
      currentCart.total += product.price;

      saveCartData(state[currentCartDBName], currentCartDBName);
    },
    DECREASE_QUANTITY(state, product) {
      const currentCartInfo = currentCartDB(
        state.cartData,
        state.usersCartData
      );
      const currentCartDBName = currentCartInfo.currentCartDBName;
      let currentCart = currentCartInfo.currentCartDB;
      if (currentCartDBName === "usersCartData") {
        state.usersCartData = currentCartInfo.currentCartDB;
        currentCart = state.usersCartData[currentCartInfo.userIndex];
      }

      let productIndex = productIndexInCart(currentCart, product.id);

      currentCart.addProducts[productIndex].product.quantity++;
      if (currentCart.addProducts[productIndex].quantity === 1) {
        return 0;
      }

      currentCart.addProducts[productIndex].quantity--;
      currentCart.total -= product.price;

      saveCartData(state[currentCartDBName], currentCartDBName);
    },
    REMOVE_PRODUCT(state, payload) {
      const currentCartInfo = currentCartDB(
        state.cartData,
        state.usersCartData
      );
      let currentCartDBName = currentCartInfo.currentCartDBName;
      let currentCart = currentCartInfo.currentCartDB;
      if (currentCartDBName === "usersCartData") {
        state.usersCartData = currentCartInfo.currentCartDB;
        currentCart = currentCartInfo.currentCartDB[currentCartInfo.userIndex];
      }

      const product = payload.product;
      const quantity = payload.quantity;
      const productIndex = productIndexInCart(currentCart, product.id);

      currentCart.total -= product.price * quantity;

      currentCart.addProducts.splice(productIndex, 1);
      saveCartData(state[currentCartDBName], currentCartDBName);
    },
    CHECKOUT_PRODUCT(state, cartData) {
      const currentCartInfo = currentCartDB(
        state.cartData,
        state.usersCartData
      );

      if (!loginUserData()) {
        return alert("After Login You Can Checkout Product  !!!");
      }

      state.checkoutData.push({
        userId: loginUserData().id,
        checkoutItem: cartData,
        time: new Date().toUTCString(),
      });

      saveCartData(state.checkoutData, "checkoutData");
      state.cartData.total = 0;
      state.cartData.addProducts = [];
      state.usersCartData[currentCartInfo.userIndex].addProducts = [];
      state.usersCartData[currentCartInfo.userIndex].total = 0;
      saveCartData(state.cartData, "cartData");
      saveCartData(state.usersCartData, "usersCartData");
    },
  },
  actions: {
    addCartData({ commit }, cartData) {
      commit("SET_CART_DATA", cartData);
    },
    addUserCartData({ commit }, userCartData) {
      commit("SET_USER_CART_DATA", userCartData);
    },
    addProductToCart({ commit }, product) {
      commit("ADD_PRODUCT_TO_CART", product);
    },
    decreaseQuantity({ commit }, product) {
      commit("DECREASE_QUANTITY", product);
    },
    increaseQuantity({ commit }, product) {
      commit("INCREASE_QUANTITY", product);
    },
    removeProduct({ commit }, payload) {
      commit("REMOVE_PRODUCT", payload);
    },
    checkOut(context, payload) {
      context.commit("CHECKOUT_PRODUCT", payload);
    },
  },
};
