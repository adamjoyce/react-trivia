import slugify from 'slugify';

import {sortByProp} from '../utils/helpers';

function formatCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    // Truncate unecessary identfier if present.
    const truncatedName = categories[i].name.split(/:\s/, 2)[1];
    if (truncatedName) {
      categories[i].name = truncatedName.charAt(0).toUpperCase()
        + truncatedName.slice(1);
    }

    // Give all categories a slug for url identification.
    categories[i].slug = slugify(categories[i].name, {lower: true});
  }

  // For presentation purposes.
  return sortByProp(categories, 'slug');
}

export async function getCategories() {
  const response = await fetch('https://opentdb.com/api_category.php');
  const categories = await response.json();
  return formatCategories(categories.trivia_categories);
}
