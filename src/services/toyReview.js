import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
  GET_MY_TOY_REVIEWS: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.ToyReview.GET_MY_TOY_REVIEWS()
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_TOY_REVIEW_DETAIL: (productId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.ToyReview.GET_TOY_REVIEW_DETAIL(productId)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_TOY_REVIEW: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
          constant.BASE_URL + api.ToyReview.UPDATE_TOY_REVIEW(), data
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  CREATE_TOY_REVIEW: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.ToyReview.CREATE_TOY_REVIEW(), data
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

  GET_TOYS: (search) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.ToyReview.GET_TOYS(search)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

  GET_TOY_BY_ID: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.ToyReview.GET_TOY_BY_ID(id)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

};
