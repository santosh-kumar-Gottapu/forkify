import * as model from './model.js';
import recipeview from './view/recipeview.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarksView from './view/bookmarksview.js';
import addRecipeView from './view/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './view/config.js';

import paginationView from './view/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('test');

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    // update resuts view to mark selected search
    resultsView.update(model.getSearchResult());
    // updateing bookmarks
    bookmarksView.update(model.state.bookmarks);

    if (!id) return;
    recipeview.renderSpinner();

    // loading recipe

    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // rendering recipe
    recipeview.render(model.state.recipe);
  } catch (err) {
    // console.log(err);
    recipeview.renderError();
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    // render result
    // resultsView.render(model.state.search.result);
    resultsView.render(model.getSearchResult());

    // render pagination

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// paginationclick

const controlPagination = function (goToPage) {
  // render new result

  resultsView.render(model.getSearchResult(goToPage));

  // render pagination

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe
  model.updateServings(newServings);

  // update recipe view
  // recipeview.render(model.state.recipe);
  recipeview.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. add and remove bookmarks

  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // model.addBookmark(model.state.recipe);
  // console.log(model.state.recipe);

  // 2. update recipe view

  recipeview.update(model.state.recipe);

  // 3. render bookmarks
  bookmarksView.render(model.state.bookmarks);

  console.log(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
  console.log(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);

  try {
    // show loading spinner

    addRecipeView.renderSpinner();
    // upload the new Recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // render recipe
    recipeview.render(model.state.recipe);

    // render bookmark

    addRecipeView.render(model.state.bookmarks.bookmarks);

    // change ID in url

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // sucess method
    addRecipeView.renderMessage();
    // close from window

    setTimeout(
      function () {
        addRecipeView.toggleWindow();
      }.MODEL_CLOSE_SEC * 1000
    );
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const note = function () {
  console.log('welcome');
};

// controlSearchResult();
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeview.addHandlerRender(controlRecipes);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeview.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  note();
};

init();
// controlRecipes();
// ['hashchange', 'load'].forEach(el =>
//   window.addEventListener(el, controlRecipes)
// );
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
