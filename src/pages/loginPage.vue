<template>
  <div class="container">
    <h1>Login Page</h1>
    <form @submit.prevent="userLogin">
      <input
        type="text"
        v-model="user.username"
        placeholder="enter username ..."
      />
      <input
        type="password"
        v-model="user.password"
        placeholder="enter password ..."
      />
      <p class="error">{{ error }}</p>
      <input type="submit" value="login" />
    </form>
  </div>
</template>

<script>
import {
  userLoginCredential,
  findLoginUser,
  saveUserCredential,
} from "@/helper/userLoginHelper.js";

export default {
  name: "loginPage",
  emits: ["hideLoginBtn"],
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
      error: null,
    };
  },
  methods: {
    userLogin() {
      const user = findLoginUser(this.user);
      if (user) {
        user.active = true;
        saveUserCredential(userLoginCredential);
        this.error = "";
        this.$store.dispatch("setUserLogin", user);
        this.setCartDataToUserCart(user);
        this.$router.push({ name: "homePage" });
      } else {
        this.error = "Invalided UserName or Password !!";
      }
    },
    setCartDataToUserCart(user) {
      const addProducts = [
        this.$store.getters["cart/getCartData"],
        this.$store.getters["cart/getUsersCartData"],
      ];
      if (!addProducts[1]) {
        return false;
      }

      const trendingList = {};
      let total = 0;
      addProducts.forEach((data) => {
        total += data.total;
        data.addProducts.forEach((product) => {
          if (!trendingList["Id" + product.product.id]) {
            trendingList["Id" + product.product.id] = {
              product: product.product,
              quantity: product.quantity,
            };
          } else {
            trendingList["Id" + product.product.id].quantity +=
              product.quantity;
          }
        });
      });
      const dataArray = [];
      for (let x of Object.entries(trendingList)) {
        dataArray.push(x[1]);
      }
      this.$store.dispatch("cart/addUserCartData", {
        addProducts: dataArray,
        total: total,
        userId: user.id,
      });
      this.$store.dispatch("cart/addCartData", {
        addProducts: [],
        total: 0,
        userId: null,
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 500px;
  margin: 50px auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(34, 65, 6, 0.24) 0px 5px 50px;
}

form {
  width: 300px;
  display: flex;
  flex-direction: column;
}

input {
  margin: 10px 0;
  padding: 5px;
  font-size: 1rem;
  font-weight: 600;
}
.error {
  color: red;
  font-size: 1rem;
  font-weight: 600;
}

input[type="submit"] {
  border: none;
  border-radius: 5px;
  background-color: #9fd69a;
  padding: 10px;
  font-size: 1.4rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: rgb(103, 104, 101);
}
input[type="submit"]:hover {
  background-color: #9ef796;
}
</style>
