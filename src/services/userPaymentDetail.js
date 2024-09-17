import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
  GEt_USER_PAYMENT_DETAIL: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL +
          api.UserPaymentDetail.GET_USER_PAYMENT_DETAIL()
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  CONNECT: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL +
          api.UserPaymentDetail.CONNECT()
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_USER_PAYMENT_DETAIL: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
          constant.BASE_URL +
          api.UserPaymentDetail.UPDATE_USER_PAYMENT_DETAIL(userId),
          data
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
