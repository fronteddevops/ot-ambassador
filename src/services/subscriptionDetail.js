import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
    GEt_SUBSCRIPTION_DETAIL: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.SubscriptionDetail.GET_SUBSRIPTION_DETAIL()
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_SUBSCRIPTION_DETAIL: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
          constant.BASE_URL + api.SubscriptionDetail.UPDATE_SUBSCRIPTION_DETAIL(),data
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

};
