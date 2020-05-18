const UserName = "UserName";

const setUser = user => {
  window.sessionStorage.setItem(UserName, JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(window.sessionStorage.getItem(UserName) || "{}");
};

const remUser = () => {
  window.sessionStorage.removeItem(UserName);
};

export default { setUser, getUser, remUser };
