<template>
  <div @click="$emit('closeCart')" class="outer"></div>
  <div class="main">
    <div @click="$emit('closeCart')" class="close">X</div>
    <div v-if="cartItem.total">
      <div class="total">
        <strong>Total : </strong>{{ cartItem.total }} &#8377;
      </div>
      <div class="cart-item">
        <commonCart
          mode="cart-style"
          v-for="cart in cartItem.addProducts"
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
              </div>
              <div class="quantity">
                <div
                  class="quantity-btn"
                  @click="decreaseQuantity(cart.product)"
                >
                  -
                </div>
                <strong>{{ cart.quantity }}</strong>
                <div
                  class="quantity-btn"
                  @click="increaseQuantity(cart.product)"
                >
                  +
                </div>
              </div>
              <div
                @click="
                  removeProduct({
                    product: cart.product,
                    quantity: cart.quantity,
                  })
                "
                class="close delete-item"
              >
                X
              </div>
            </div>
          </template>
        </commonCart>
      </div>
      <button @click="checkOut({ ...cartItem })" class="checkout">
        Checkout
      </button>
    </div>
    <div v-else>
      <h3 class="empty">Add Product To Cart</h3>
    </div>
  </div>
</template>

<script>
import commonCart from "@/components/commonCart";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    commonCart,
  },
  emits: ["closeCart"],

  methods: {
    ...mapActions("cart", [
      "decreaseQuantity",
      "increaseQuantity",
      "removeProduct",
      "checkOut",
    ]),
  },
  computed: {
    ...mapGetters("cart", ["getCartData", "getUsersCartData"]),
    ...mapGetters({ getLoginUserDetail: "getLoginUserDetail" }),
    cartItem() {
      if (this.getLoginUserDetail) {
        return this.getUsersCartData;
      } else {
        return this.getCartData;
      }
    },
  },
};
</script>

<style scoped>
.outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(46, 105, 34, 0.24);
}
img {
  width: 100px;
  margin-right: 20px;
  border: 1px solid;
}
.main {
  padding: 30px;
  background-color: rgb(234, 238, 234);
  width: 40%;
  position: absolute;
  top: 80px;
  right: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 100;
}

.cart-item {
  overflow: auto;
  height: 475px;
  margin: 20px 0;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #afd3ab;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(137, 219, 134);
  border-radius: 5px;
}

.close {
  text-align: right;
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
  font-family: sans-serif;
}
.content-box {
  display: flex;
  align-items: center;
}
.product-detail {
  width: 120px;
  text-align: left;
}
.quantity {
  width: 100px;
  padding: 5px;
  display: flex;
}
.delete-item {
  width: 70px;
}
.quantity strong {
  padding: 0 10px;
  font-size: 1.5rem;
}
.quantity-btn {
  cursor: pointer;
  border: 1px solid;
  width: 30px;
  font-size: 1.5rem;
  border-radius: 3px;
  background-color: white;
}
.quantity-btn:hover {
  background-color: rgb(151, 206, 145);
}
.total {
  text-align: center;
  font-size: 1.4rem;
}
.empty {
  margin: 40% 0;
  text-align: center;
  font-size: 2rem;
  color: grey;
}

.checkout {
  cursor: pointer;
  border: none;
  float: right;
  font-size: 1.2rem;
  margin: 0 20px;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  background-color: #2fb64c;
  padding: 10px 20px;
}
.checkout:hover {
  background-color: #67c07b;
}
</style>
