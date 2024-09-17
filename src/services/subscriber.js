import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
  GET_SUBSCRIBER_DETAIL: (search, limit, page) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.Subscriber.GET_SUBSCRIBER_DETAIL(search, limit, page)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_SUBSCRIPTION_LIST: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.Subscriber.GET_SUBSCRIPTION_LIST()
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
};