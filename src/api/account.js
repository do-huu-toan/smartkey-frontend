import { BaseApi } from "./base-api";
const ApiUrl = "/auth/login";
const login = async (account) => {
  try {
    const res = await BaseApi.post(ApiUrl, {
      username: account.username,
      password: account.password,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export default {
  login,
};
