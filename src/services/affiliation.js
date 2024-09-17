import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
  GEt_AFFILIATION: (dateFrom, dateTo, limit, page) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.Affiliation.GET_AFFILIATION(dateFrom, dateTo, limit, page)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}