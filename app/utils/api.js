let sessionToken = '';

// Simple error reporting.
function handleError(error) {
  console.warn(error);
  return null;
}

// Formats the categories object by editing redundant naming convention.
function formatCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    // Truncate unecessary identfier if present.
    const truncatedName = categories[i].name.split(/:\s/, 2)[1];
    if (truncatedName) {
      categories[i].name = truncatedName.charAt(0).toUpperCase()
        + truncatedName.slice(1);
    }
  }

  return categories;
}

// Divides the question count between a number of categories.
function divideQuestions(categories, questionCount) {
  const categoriesPerPlayer = categories.length;
  const questionsPerCategory = Math.floor(questionCount / categoriesPerPlayer);
  const remainder = questionCount % categoriesPerPlayer;
  console.log(questionsPerCategory);
  console.log(remainder);

  // Give each category a question count.
  const dividedCategories = categories.map((category) => {
    category.questionCount = questionsPerCategory;
    return category;
  });
  console.log('DivCat: ', dividedCategories);

  // Deal with any remainder questions.
  if (remainder !== 0) {
    for (let i = 0; i < remainder; ++i) {
      dividedCategories[i].questionCount++;
    }
  }
}

// Returns a session token used by the api to track previous fetched questions.
async function getSessionToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await response.json();
  return token.token;
}

// Returns an array of of questions dependant on topic and question count.
async function getQuestions(categoryId, questionCount) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${questionCount}&category=${categoryId}`);
  const questions = await response.json();
  return questions;
}

// Returns the complete formatted array of categories.
export async function getCategories() {
  const response = await fetch('https://opentdb.com/api_category.php').catch(handleError);
  const categories = await response.json();
  return formatCategories(categories.trivia_categories);
}

//
export async function getPlayerQuestions(playerCategories, questionCount) {
  if (sessionToken === '') {
    sessionToken = await getSessionToken().catch(handleError);
  }

  // Divide questions between the categories for each player.
  playerCategories = playerCategories.map(
    (categories) => divideQuestions(categories, questionCount)
  );

  // const results = await Promise.all(playerCategories.map((players) => {
  //   return players.map((category) => getQuestions(category.id, category.questionCount));
  // })).catch(handleError);
  // console.log(playerCategories);
  //
  // return results;
}
