import Axios from 'axios'
// import router from '../router.js'
// import Vue from 'vue'
const initialiseInterceptor = () => {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

  // Add a request interceptor
  Axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // Add a response interceptor
  Axios.interceptors.response.use(
    (response) => {

      return response
    },
    (error) => {

      if (error.response && error.response.status == 401) {
        localStorage.clear()
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
        return Promise.reject(error);
      } else {
        return Promise.reject(error)
      }
    }
  )
}

export default initialiseInterceptor
