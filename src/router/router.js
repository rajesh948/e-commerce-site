import { createRouter, createWebHistory } from "vue-router";
import {
  subCategoryPageGard,
  productListPageGard,
  productDetailGard,
  loginPageGard,
} from "@/router/routerGard.js";
import loginPage from "@/pages/loginPage.vue";
import homePage from "@/pages/homePage.vue";
import subCategoryPage from "@/pages/subCategoryPage.vue";
import productListPage from "@/pages/productListPage.vue";
import productDetail from "@/pages/productDetail.vue";
import checkoutProductHistory from "@/pages/checkoutProductHistory.vue";
import pageNotFound from "@/pages/pageNotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "login",
      path: "/login",
      component: loginPage,
      beforeEnter: loginPageGard,
    },
    {
      name: "homePage",
      path: "/",
      component: homePage,
    },
    {
      name: "subCategoryPage",
      path: "/:categoryName",

      component: subCategoryPage,
      beforeEnter: subCategoryPageGard,
    },
    {
      name: "productListPage",
      path: "/:categoryName/:subCategoryName",
      component: productListPage,
      beforeEnter: productListPageGard,
    },
    {
      name: "productDetail",
      path: "/product/:productId",
      component: productDetail,
      beforeEnter: productDetailGard,
    },
    {
      name: "checkoutHistory",
      path: "/checkout-product-history",
      component: checkoutProductHistory,
    },
    {
      name: "pageNotFound",
      path: "/:pageNotFound(.*)*",
      redirect: { name: "404Page" },
    },
    {
      name: "404Page",
      path: "/404",
      component: pageNotFound,
    },
  ],
});

export default router;
