<template>
  <nav>
    <router-link :to="{ name: 'homePage' }">Home</router-link>
    <router-link :to="{ name: 'checkoutHistory' }"
      >Checkout History</router-link
    >
    <router-link v-if="isLoginBtnShow" :to="{ name: 'login' }"
      >Login</router-link
    >
    <a v-else @click="logout">Logout</a>
  </nav>
</template>

<script>
import {
  userLoginCredential,
  findLoginUser,
  saveUserCredential,
} from "@/helper/userLoginHelper.js";
import { mapGetters } from "vuex";

export default {
  methods: {
    logout() {
      const user = findLoginUser(this.getLoginUserDetail);
      user.active = false;
      saveUserCredential(userLoginCredential);
      this.$store.dispatch("setUserLogin", null);
      this.$router.push({ name: "homePage" });
    },
  },
  computed: {
    ...mapGetters({ getLoginUserDetail: "getLoginUserDetail" }),
    isLoginBtnShow() {
      return this.getLoginUserDetail ? false : true;
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  background-color: #7cbb5e;
}
a {
  cursor: pointer;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
}
a:hover {
  background-color: #aac49d;
}
</style>
