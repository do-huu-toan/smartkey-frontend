import Cookies from "js-cookie";
export default {
  isAuthenticated() {
    const token = Cookies.get("accessToken");
    if (token) {
      //Gọi API để check token
      return true;
    }
    return false;
  },
  getToken() {
    const token = Cookies.get("accessToken");
    if (token) return token;
    return null;
  },
  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  },
  getUserId() {
    const token = this.getToken();
    if (token) {
      return this.parseJwt(token).id
    }
    return null;
  },
};
