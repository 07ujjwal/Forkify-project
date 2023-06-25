import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY, API_URL_2 } from "./config";
import { getJSON, sentJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    // state.search.query = query;

    state.recipe = createRecipeObject(data);

    // console.log(state.recipe);

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    //
  } catch (err) {
    console.log(err);
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1;

    console.log(state.search.results);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

////

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

/////

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((element) => {
    element.quantity = (element.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const PersistBookMark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookMark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipie as book marked....
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  PersistBookMark();
};

export const deleteBookMark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.slice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  PersistBookMark();
};

const init1 = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init1();

const clearBookMark = function () {
  loadRecipe.clear("bookmarks");
};

export const uplodeRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient fromat! Please use the correct format :)"
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await sentJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};

//bb60d4ef-809b-43d0-a7d3-35dea4c7b4e0
