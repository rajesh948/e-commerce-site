<template>
  <appHeader />
  <navBar />
  <router-view></router-view>
  <appFooter />
</template>

<script>
import appHeader from "@/components/appHeader";
import navBar from "@/components/navBar";
import appFooter from "@/components/appFooter";
import {
  userLoginCredential,
  productList,
  subCategoryList,
  categoryList,
} from "@/database/database";
export default {
  name: "App",
  components: {
    appHeader,
    appFooter,
    navBar,
  },
  created() {
    if (!localStorage.getItem("userLoginCredential")) {
      localStorage.setItem(
        "userLoginCredential",
        JSON.stringify(userLoginCredential)
      );
    }
    this.$store.dispatch(
      "setUserLogin",
      JSON.parse(localStorage.getItem("userLoginCredential")).find(
        (user) => user.active === true
      )
    );
    if (!localStorage.getItem("e_commerce_data")) {
      localStorage.setItem(
        "e_commerce_data",
        JSON.stringify({
          categoryList: categoryList,
          subCategoryList: subCategoryList,
          productList: productList,
        })
      );
    }
  },
};
</script>
