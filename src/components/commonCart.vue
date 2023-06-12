<template>
  <li>
    <div :class="mode" class="items-box">
      <div class="section-one">
        <slot name="header">
          <img src="../assets/category_list/asset10.png" alt="img not found"
        /></slot>
      </div>
      <div class="section-two">
        <slot name="content">content</slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "no",
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
.items-box {
  background-color: white;
  text-align: center;
  padding: 20px;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.display-full {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: none;
}
.cart-style {
  display: flex;
  border: 1px solid;
  align-items: center;
  box-shadow: none;
}
.cart-style-second {
  display: flex;
  border-radius: 3px;
  background-color: #e1f7d9;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.trending-style {
  width: 300px;
}
.section-two {
  font-size: 1.2rem;
}
</style>
