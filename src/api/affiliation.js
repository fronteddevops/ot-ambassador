export default {
  GET_AFFILIATION: (dateFrom, dateTo, limit, page) => `/affiliation?${dateFrom ? 'dateFrom=' + dateFrom + '&' : ''}${dateTo ? 'dateTo=' + dateTo + '&' : ''}${limit ? 'limit=' + limit + '&' : ''}${page ? 'page=' + page : ''}`
};