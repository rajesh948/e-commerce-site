<template>
  <div class="back">
    <button class="back-btn" @click="goBackCategoryPage">Home</button>
    <div>></div>
    <div class="back-btn">{{ categoryName }}</div>
  </div>
  <ul>
    <commonCart
      v-for="subCategory in subCategoryList"
      :key="subCategory.id"
      @click="goToProductListPage(subCategory.name)"
    >
      <template v-slot:header>
        <img :src="subCategory.img" />
      </template>
      <template v-slot:content>
        {{ subCategory.name }}
      </template>
    </commonCart>
  </ul>
</template>

<script>
import commonCart from "@/components/commonCart";
import { mapGetters } from "vuex";
export default {
  components: {
    commonCart,
  },

  methods: {
    goToProductListPage(subCatName) {
      this.$router.push({
        name: "productListPage",
        params: {
          categoryName: this.$route.params.categoryName,
          subCategoryName: subCatName,
        },
      });
    },
    goBackCategoryPage() {
      this.$router.push({ name: "homePage" });
    },
  },
  computed: {
    ...mapGetters("siteDatabase", ["getECommerceData"]),
    subCategoryList() {
      console.log(this.getECommerceData, "getECommerceData");
      return this.getECommerceData.subCategoryList.filter(
        (subCat) =>
          subCat.catId ===
          this.getECommerceData.categoryList.find(
            (cat) => cat.name === this.$route.params.categoryName
          ).id
      );
    },
  },
};
</script>

<style scoped>
ul {
  margin: 10px 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
img {
  width: 150px;
}
.back {
  display: flex;
  align-items: center;
}
</style>
