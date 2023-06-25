import * as model from "./model.js";
//import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./recipeView.js";
import SearchView from "./searchView.js";
import resultsView from "./resultsView.js";
import paginationView from "./paginationView.js";
import bookmarkView from "./bookmarkView.js";
import addRecipieView from "./addRecipieView.js";

import { async } from "regenerator-runtime";
import View from "./view.js";

//property of parcel Hotmodule reloding...

//if (model.hot) {
//  model.hot.accept();
//}

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

// suscriber....................

const controleRecipie = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // render spinner......

    recipeView.renderSpinner();

    //0 update results view to mark selected result.....

    //resultsView.update(model.getSearchResultPage());

    // update the book mark....

    bookmarkView.update(model.state.bookmarks);

    //loding recipie....

    await model.loadRecipe(id);

    // render recipies...

    recipeView.render(model.state.recipe);

    //
  } catch (err) {
    console.log(err);
    recipeView.renderError("We could not find the recpie please try other one");
  }
};

const controleSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1/ get search result...
    const query = SearchView.getQuery();

    console.log(query);

    if (!query) return;

    // 2. load search result....

    await model.loadSearchResults(query);

    // console.log(model.state.search.results.id);
    //3. render search results...

    resultsView.render(model.getSearchResultPage(1));

    //4. render initial pagination btns...

    paginationView.render(model.state.search);

    //
  } catch (error) {
    console.log(error);
  }
};

const controlePagination = function (goToPage) {
  //1.render search results...
  resultsView.render(model.getSearchResultPage(goToPage));
  //2.render initial pagination btns...
  paginationView.render(model.state.search);
};

const controleServings = function (newServings) {
  //update the recipies servings....

  model.updateServings(newServings);

  //update the recipie view.....

  //recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
};

const controleAddBookMark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookMark(model.state.recipe.id);
  }

  //
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // render the bookmarks...

  bookmarkView.render(model.state.bookmarks);
};

const controleBookMarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controleAddRecipie = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipieView.renderSpinner();

    // Upload the new recipe data
    await model.uplodeRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipieView.renderMessage();

    setTimeout(function () {
      addRecipieView.listnerFunction();
    }, 2.5 * 1000);

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipieView.renderError(err);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controleBookMarks);
  recipeView.addHandlerRender(controleRecipie);
  recipeView.addHandlerUpdateServings(controleServings);
  recipeView.addHandlerBookmark(controleAddBookMark);
  SearchView.addHandlerSearch(controleSearchResults);
  paginationView.addHandlerClick(controlePagination);
  addRecipieView.addHandlerUplode(controleAddRecipie);
};

init();
