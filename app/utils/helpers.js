function sortByProp(categories, prop) {
  return categories.sort(function(a, b) {
      var propA = a[prop].toUpperCase();
      var propB = b[prop].toUpperCase();
      return (propA < propB) ? -1 : (propA > propB) ? 1 : 0;
    });
}

module.exports = {
  sortByProp: sortByProp
}
