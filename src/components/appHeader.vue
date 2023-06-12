<template>
  <header>
    <div class="container header-box">
      <div class="web-logo">
        <a @click="goTOHomePage"
          ><img src="../assets/header/web_logo.svg" alt="logo"
        /></a>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="search bar .." />
        <button><img src="../assets/header/search_icon.svg" /></button>
      </div>
      <div v-if="getSellTimer" class="product-sell">
        Current Sell On !!! <strong>{{ getSellTimer }}</strong>
      </div>
      <div class="left-icons">
        <div v-if="getLoginUserDetail" class="user-Name">
          {{ getLoginUserDetail.username }}
        </div>
        <div>
          <img src="https://eptummers.nl/media/icoon_account_wit.svg" />
        </div>
        <div @click="showCart">
          <img src="https://eptummers.nl/media/wagentje_wit.svg" />
        </div>
      </div>
    </div>
  </header>
  <cartItem v-if="isCartShow" @closeCart="closeCart" />
</template>

<script>
import cartItem from "@/components/cartItem";
import { mapGetters } from "vuex";

export default {
  name: "appHeader",

  components: {
    cartItem,
  },
  data() {
    return {
      isCartShow: false,
    };
  },

  methods: {
    showCart() {
      this.isCartShow = true;
    },
    closeCart() {
      this.isCartShow = false;
    },
    goTOHomePage() {
      this.$router.push({
        name: "homePage",
      });
    },
  },
  computed: {
    ...mapGetters("sellProduct", ["getSellTimer"]),
    ...mapGetters({ getLoginUserDetail: "getLoginUserDetail" }),
  },
};
</script>

<style scoped>
header {
  background-color: rgb(66, 65, 65);
}
.header-box {
  padding: 15px 0;
  display: flex;
  align-items: center;
}
.web-logo {
  width: 30%;
}
.web-logo a img {
  height: 40px;
}
.search-bar {
  margin-left: 20px;
  display: flex;
  width: 30%;
}
.search-bar input {
  border-radius: 15px;
  border: none;
  width: 100%;
  padding: 10px;
}
.search-bar button {
  border: none;
  border-radius: 15px;
  width: 40px;
}
.search-bar button img {
  padding: 5px;
}
.left-icons {
  display: flex;
  flex-flow: wrap;
  justify-content: right;
  align-items: center;
  width: 30%;
}
.left-icons div {
  width: 50px;
  margin: 0 10px;
}
.product-sell {
  color: white;
  width: 30%;
  text-align: center;
  font-size: 1.2rem;
}
.user-Name {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
