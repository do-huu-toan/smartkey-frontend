import utils from "../utils";
import { BaseApi } from "./base-api";

const ApiUrl = "/log";
const getLogByUserId = async () => {
  try {
    const res = await BaseApi.get(`${ApiUrl}/${utils.getUserId()}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export default {
    getLogByUserId,
};
