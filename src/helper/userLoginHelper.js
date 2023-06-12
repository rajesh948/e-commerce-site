export const userLoginCredential = JSON.parse(
  localStorage.getItem("userLoginCredential")
);

export const findLoginUser = (loginUser) => {
  return userLoginCredential.find(
    (user) =>
      user.username === loginUser.username &&
      user.password === loginUser.password
  );
};

export const saveUserCredential = (userCredential) => {
  localStorage.setItem("userLoginCredential", JSON.stringify(userCredential));
};

export const loginUserData = () => {
  return userLoginCredential.find((user) => user.active === true);
};
