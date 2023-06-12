<template>
  <ul>
    <commonCart
      v-for="category in categoryList"
      :key="category.id"
      @click="goToSubcategoryList(category.name)"
    >
      <template v-slot:header>
        <img :src="category.img" />
      </template>
      <template v-slot:content>
        {{ category.name }}
      </template>
    </commonCart>
  </ul>
  <trendingProductList />
  <sellProductList
    v-if="getSellProductList.length"
    :sellProductList="getSellProductList"
    :sellTimer="getSellTimer"
  />
</template>

<script>
import commonCart from "@/components/commonCart";
import trendingProductList from "@/components/trendingProductList";
import sellProductList from "@/components/sellProductList";
import {
  productList,
  subCategoryList,
  categoryList,
} from "@/database/database";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    commonCart,
    trendingProductList,
    sellProductList,
  },
  data() {
    return {
      eCommerceDatabase: JSON.parse(localStorage.getItem("e_commerce_data")),
      categoryList: JSON.parse(localStorage.getItem("e_commerce_data"))
        .categoryList,
    };
  },
  created() {
    this.addSellProductList(
      JSON.parse(localStorage.getItem("sellProductList"))
    );

    const sellProductList = [];
    if (!localStorage.getItem("sellTimer")) {
      localStorage.setItem("sellTimer", Date.now() + 15 * 60 * 1000);

      for (let x = 0; x < 4; x++) {
        const randomIndex = Math.floor(
          Math.random() * this.eCommerceDatabase.productList.length
        );
        this.eCommerceDatabase.productList[randomIndex].sell = true;
        sellProductList.push(this.eCommerceDatabase.productList[randomIndex]);
      }
      localStorage.setItem(
        "e_commerce_data",
        JSON.stringify(this.eCommerceDatabase)
      );
      this.addSellProductList(sellProductList);
      localStorage.setItem("sellProductList", JSON.stringify(sellProductList));
    }

    this.timerCount();
    this.addECommerceData(this.eCommerceDatabase);
  },

  methods: {
    ...mapActions("sellProduct", ["addSellTimer", "addSellProductList"]),
    ...mapActions("siteDatabase", ["addECommerceData"]),
    goToSubcategoryList(catName) {
      this.$router.push({
        name: "subCategoryPage",
        params: { categoryName: catName },
      });
    },

    timerCount() {
      const time = localStorage.getItem("sellTimer");
      if (time) {
        const countDownDate = new Date(+time).getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        if (distance > 0) {
          setTimeout(() => {
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.addSellTimer(minutes + "m " + seconds + "s ");
            this.timerCount();
          }, 1000);
        } else {
          this.addSellTimer(null);
          this.addSellProductList(null);
          localStorage.removeItem("sellTimer");
          localStorage.removeItem("sellProductList");
          this.eCommerceDatabase = JSON.parse(
            JSON.stringify({
              categoryList: categoryList,
              subCategoryList: subCategoryList,
              productList: productList,
            })
          );

          this.addECommerceData(this.eCommerceDatabase);
          localStorage.setItem(
            "e_commerce_data",
            JSON.stringify(this.eCommerceDatabase)
          );
        }
      }
    },
  },
  computed: {
    ...mapGetters("sellProduct", ["getSellTimer", "getSellProductList"]),
  },
};
</script>

<style scoped>
ul {
  width: 350px;
  margin: 50px;
}
</style>
