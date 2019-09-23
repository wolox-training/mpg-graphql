exports.orderArrayByField = (array, orderBy) => array.sort((a, b) => (a[orderBy] >= b[orderBy] ? 1 : -1));

exports.filterArrayByField = (array, field, query) =>
  array.filter(item => item[field].toLowerCase().indexOf(query.toLowerCase()) !== -1);
