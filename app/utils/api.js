var axios = require('axios');

function getCategories() {
  return axios.get('https://opentdb.com/api_category.php')
    .then(function(response) {
      return response.data.trivia_categories;
    });
}

module.exports = {
  getCategories: getCategories
}
