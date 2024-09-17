import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
  GEt_USER_DETAIL: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.UserDetail.GET_USER_DETAIL(userId)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_SUBSCRIBED_CUSTOMERS: (search) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.UserDetail.GET_SUBSCRIBED_CUSTOMERS(search)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_USER_DETAIL: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
          constant.BASE_URL + api.UserDetail.GET_USER_DETAIL(userId), data
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

};
