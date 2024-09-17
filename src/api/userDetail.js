export default {
  GET_USER_DETAIL: (id) => `/userdetails/${id}`,
  UPDATE_USER_DETAIL: (id) => `/userdetails/${id}`,
  GET_SUBSCRIBED_CUSTOMERS: (search) => `/users/subscription${search ? '?search=' + search : ''}`,

};
