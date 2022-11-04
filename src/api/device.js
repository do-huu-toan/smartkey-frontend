import utils from "../utils";
import { BaseApi } from "./base-api";

const ApiUrl = "/device";
const getDeviceByUserId = async () => {
  try {
    const res = await BaseApi.get(`${ApiUrl}/${utils.getUserId()}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const addNewDevice = async (data) => {
  try {
    const res = await BaseApi.post(`${ApiUrl}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export default {
  getDeviceByUserId,
  addNewDevice,
};
