<template>
  <div class="trending-box">
    <div class="title">Trending Product</div>
    <ul>
      <commonCart
        mode="trending-style"
        v-for="trdProduct in treadingProductList"
        :key="trdProduct.product.id"
      >
        <template v-slot:header>
          <img
            @click="goToProductDetailPage(trdProduct.product.id)"
            :src="trdProduct.product.img"
          />
        </template>
        <template v-slot:content>
          <div class="product-detail">
            <strong>{{ trdProduct.product.name }}</strong>
            <p><strong>Rating : </strong>{{ trdProduct.product.rating }}</p>
            <p><strong>Price : </strong>{{ trdProduct.product.price }}</p>
            <p>
              <strong>Details : </strong>{{ trdProduct.product.description }}
            </p>
            <div
              title="add product to cart"
              @click="addProductToCart(trdProduct.product)"
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
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    commonCart,
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
  computed: {
    ...mapGetters("cart", ["getCheckoutData"]),
    treadingProductList() {
      const trendingList = {};

      if (this.getCheckoutData) {
        this.getCheckoutData.forEach((data) => {
          data.checkoutItem.addProducts.forEach((product) => {
            if (!trendingList["Id" + product.product.id]) {
              trendingList["Id" + product.product.id] = {
                product: product.product,
                quantity: product.quantity,
              };
            } else {
              trendingList["Id" + product.product.id].quantity++;
            }
          });
        });

        const treadingProducts = [];
        for (let x of Object.entries(trendingList)) {
          treadingProducts.push(x[1]);
        }

        return treadingProducts.sort((a, b) => b.quantity - a.quantity);
      }
      return [];
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
</style>
