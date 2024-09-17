export default {
  GET_MY_TOY_REVIEWS: () => `/productreview/me`,
  GET_TOY_REVIEW_DETAIL: (id) => `/productreview/me/${id}`,
  UPDATE_TOY_REVIEW: () => `/productreview`,
  CREATE_TOY_REVIEW: () => `/productreview`,
  GET_TOYS: (search) => `/products${search ? '?search=' + search : ''}`,
  GET_TOY_BY_ID: (id) => `/products/${id}`,

};