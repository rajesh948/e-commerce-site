import { loginUserData } from "@/helper/userLoginHelper";
const data = JSON.parse(localStorage.getItem("e_commerce_data"));

export const isCategoryExit = (to) => {
  return data.categoryList.some((cat) => cat.name === to.params.categoryName);
};

export const isSubCategoryExit = (to) => {
  return data.subCategoryList.some(
    (cat) => cat.name === to.params.subCategoryName
  );
};

export const loginPageGard = (_, __, next) => {
  loginUserData() ? next({ name: "pageNotFound" }) : next();
};

export const subCategoryPageGard = (to, from, next) => {
  isCategoryExit(to) ? next() : next({ name: "pageNotFound" });
};

export const productListPageGard = (to, from, next) => {
  isCategoryExit(to) && isSubCategoryExit(to)
    ? next()
    : next({ name: "pageNotFound" });
};

export const productDetailGard = (to, from, next) => {
  data.productList.some((product) => +product.id === +to.params.productId)
    ? next()
    : next({ name: "pageNotFound" });
};
