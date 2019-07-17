exports.orderArrayByField = (array, field) =>
  array.sort((a, b) => {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  });

exports.filterArrayByField = (array, field, query) =>
  array.filter(item => item[field].toLowerCase().indexOf(query.toLowerCase()) !== -1);
