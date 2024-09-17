import Axios from "axios";
import constant from "../../constant";
import api from "../api";
/* eslint-disable */
export default {
    GET_PUBLISHING_TOOLS: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Axios.get(
                    constant.BASE_URL + api.Publishing.GET_PUBLISHING_TOOLS()
                )
                resolve(response)
            } catch (err) {
                reject(err)
            }
        })
    },
}