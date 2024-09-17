export default {
  GET_SUBSCRIBER_DETAIL: (search, limit, page) => `/subscribers?${search ? 'search=' + search + '&' : ''}${limit ? 'limit=' + limit + '&' : ''}${page ? 'page=' + page : ''}`,
  GET_SUBSCRIPTION_LIST: () => '/stripe/subscriptionPayouts'
}