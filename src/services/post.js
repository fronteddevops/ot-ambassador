import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
  ADD_POST: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Post.ADD_POST(),data
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_POST: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.Post.GET_POST()
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_POST: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(
          constant.BASE_URL + api.Post.DELETE_POST(id)
        );

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}