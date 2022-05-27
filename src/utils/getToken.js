export const token =
  localStorage.getItem("token") !== "undefined"
    ? localStorage.getItem("token")
    : null;
