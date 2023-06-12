import { userLoginCredential } from "@/helper/userLoginHelper.js";
export const productIndexInCart = (cartData, id) => {
  return cartData.addProducts.findIndex((item) => item.product.id === id);
};
export const saveCartData = (data, storageName) => {
  localStorage.setItem(storageName, JSON.stringify(data));
};

export const currentCartDB = (cartData, usersCartData) => {
  const loginUserData = userLoginCredential.find(
    (user) => user.active === true
  );
  let userIndex = null;
  let currentCartDB = cartData;
  let currentCartDBName = "cartData";
  if (loginUserData) {
    currentCartDBName = "usersCartData";
    usersCartData.userId = loginUserData.id;
    userIndex = usersCartData.findIndex(
      (userCart) => userCart.userId === loginUserData.id
    );
    if (userIndex === -1) {
      userIndex =
        usersCartData.push({
          addProducts: [],
          total: 0,
          userId: loginUserData.id,
        }) - 1;
    }
    currentCartDB = usersCartData;
  }

  return {
    currentCartDB: currentCartDB,
    userIndex: userIndex,
    currentCartDBName: currentCartDBName,
  };
};
