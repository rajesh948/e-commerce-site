<template>
  <div v-if="checkoutData.length">
    <div v-for="item in checkoutData" :key="item" class="main">
      <div class="total">
        <div>
          <strong>Total : </strong>{{ item.checkoutItem.total }} &#8377;
        </div>
        <div><strong>Checkout Time : </strong>{{ item.time }}</div>
      </div>
      <div class="product-list">
        <commonCart
          mode="cart-style-second"
          v-for="cart in item.checkoutItem.addProducts"
          :key="cart.product.id"
        >
          <template v-slot:header>
            <img :src="cart.product.img" />
          </template>
          <template v-slot:content>
            <div class="content-box">
              <div class="product-detail">
                <strong>{{ cart.product.name }}</strong>
                <p><strong>Rating : </strong>{{ cart.product.rating }}</p>
                <p><strong>Price : </strong>{{ cart.product.price }} &#8377;</p>
                <p><strong>quantity : </strong>{{ cart.quantity }}</p>
              </div>
            </div>
          </template>
        </commonCart>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="empty-page">Please Checkout Cart Product</div>
  </div>
</template>

<script>
import commonCart from "@/components/commonCart";
import { mapGetters } from "vuex";

export default {
  components: {
    commonCart,
  },
  computed: {
    ...mapGetters({ getLoginUserDetail: "getLoginUserDetail" }),
    ...mapGetters("cart", ["getCheckoutData"]),
    checkoutData() {
      if (this.getLoginUserDetail && this.getCheckoutData) {
        return this.getCheckoutData.filter(
          (item) => +item.userId === this.getLoginUserDetail.id
        );
      }
      return [];
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  margin-right: 20px;
  border: 1px solid;
}
.total {
  font-size: 1.4rem;
}

.product-detail {
  width: 120px;
  text-align: left;
}
.main {
  border-radius: 5px;
  width: 70%;
  margin: 10px auto;
  padding: 30px;
  background-color: #d5f5ac;
}
</style>
