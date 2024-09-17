export default {
  GET_USER_PAYMENT_DETAIL: () => `/stripe/accountDetail`,
  UPDATE_USER_PAYMENT_DETAIL: (id) => `/paymentdetails/${id}`,
  CONNECT: () => `/stripe/connect`,

};
