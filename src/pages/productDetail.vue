<template>
  <ul>
    <commonCart mode="display-full">
      <template v-slot:header>
        <img :src="product.img" />
      </template>
      <template v-slot:content>
        <div class="product-detail">
          <strong>{{ product.name }}</strong>
          <p><strong>Rating : </strong>{{ product.rating }}</p>
          <p><strong>Price : </strong>{{ product.price }} &#8377;</p>
          <p><strong>Details : </strong>{{ product.description }}</p>
          <p v-if="product.sell" class="sell-product">
            <strong>Sell List Product </strong>
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
  },
  computed: {
    ...mapGetters("siteDatabase", ["getECommerceData"]),
    product() {
      return this.getECommerceData.productList.find(
        (product) => product.id === +this.$route.params.productId
      );
    },
  },
};
</script>

<style scoped>
img {
  width: 450px;
  padding: 10px;
  border: 1px solid rgb(185, 185, 185);
}
.product-detail {
  line-height: 30px;
  text-align: left;
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
