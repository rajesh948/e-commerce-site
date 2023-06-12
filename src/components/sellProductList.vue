<template>
  <div class="trending-box">
    <div class="head">
      <div class="title">Sell Product</div>
      <div class="title timer">{{ sellTimer }}</div>
    </div>
    <ul>
      <commonCart
        mode="trending-style"
        v-for="product in sellProductList"
        :key="product.id"
      >
        <template v-slot:header>
          <img
            @click="goToProductDetailPage(product.id)"
            :src="product.img"
            alt="image not found"
          />
        </template>
        <template v-slot:content>
          <div class="product-detail">
            <strong>{{ product.name }}</strong>
            <p><strong>Rating : </strong>{{ product.rating }}</p>
            <p><strong>Price : </strong>{{ product.price }}</p>
            <p><strong>Details : </strong>{{ product.description }}</p>
            <p class="sell-product"><strong>Sell List Product </strong></p>
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
  </div>
</template>

<script>
import commonCart from "@/components/commonCart";
import { mapActions } from "vuex";
export default {
  components: {
    commonCart,
  },
  props: {
    sellProductList: {
      type: Array,
      required: true,
    },
    sellTimer: {
      type: String,
    },
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),

    goToProductDetailPage(product_id) {
      this.$router.push({
        name: "productDetail",
        params: { productId: product_id },
      });
    },
  },
};
</script>

<style scoped>
.trending-box {
  margin: 20px 10px;
}
.title {
  font-size: 1.6rem;
  font-weight: 700;
  font-family: "Segoe UI", Tahoma, Verdana, sans-serif;
  padding: 20px 40px;
}
ul {
  padding: 20px;
  overflow: auto;
  background-color: #d3d1d1;
  display: flex;
  align-items: center;
}
img {
  width: 150px;
}
.product-detail {
  border-top: 2px solid rgb(192, 192, 192);
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
.head {
  display: flex;
}
.timer {
  color: green;
}
</style>
