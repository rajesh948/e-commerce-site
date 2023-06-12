<template>
  <div class="back">
    <button class="back-btn" @click="goBackCategoryPage">Home</button>
    <div>></div>
    <button class="back-btn" @click="goBackSubCategoryPage">
      {{ this.$route.params.categoryName }}
    </button>
    <div>></div>
    <div class="back-btn">{{ subCategoryName }}</div>
  </div>
  <ul>
    <commonCart v-for="product in productList" :key="product.id">
      <template v-slot:header>
        <img @click="goToProductDetailPage(product.id)" :src="product.img" />
      </template>
      <template v-slot:content>
        <div class="product-detail">
          <strong>{{ product.name }}</strong>
          <p><strong>Rating : </strong>{{ product.rating }}</p>
          <p><strong>Price : </strong>{{ product.price }} &#8377;</p>
          <p><strong>Details : </strong>{{ product.description }}</p>
          <p class="sell-product">
            <strong v-if="product.sell">Sell List Product </strong>
          </p>
          <div
            title="add product to cart"
            @click="addProductToCart(product)"
            class="add-to-cart"
          >
            <img src="../assets/addtocart.svg" />
          </div>
        </div>
      </template>
    </commonCart>
  </ul>
</template>

<script>
import commonCart from "@/components/commonCart";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    commonCart,
  },

  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    goToProductDetailPage(productId) {
      this.$router.push({
        name: "productDetail",
        params: { productId: productId },
      });
    },
    goBackSubCategoryPage() {
      this.$router.push({
        name: "subCategoryPage",
        params: { categoryName: this.$route.params.categoryName },
      });
    },
    goBackCategoryPage() {
      this.$router.push({ name: "homePage" });
    },
  },
  computed: {
    ...mapGetters("siteDatabase", ["getECommerceData"]),
    productList() {
      return this.getECommerceData.productList.filter(
        (product) =>
          product.subCatId ===
          this.getECommerceData.subCategoryList.find(
            (subCat) => subCat.name === this.$route.params.subCategoryName
          ).id
      );
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  align-items: center;
}
img {
  width: 150px;
}
.product-detail {
  border-top: 2px solid rgb(192, 192, 192);
}

.back {
  display: flex;
  align-items: center;
}
.add-to-cart img {
  width: 50px;
}
.add-to-cart {
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  border-radius: 3px;
  background-color: green;
  border: 1px solid green;
}
</style>
