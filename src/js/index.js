// import string from "./modules/Search";
//
// import { add as a, multiply as m, id } from "./views/searchView";
//
// import * as searchView from "./views/searchView";
//
// console.log(`using imported function! ${a(id, 2)} and ${m(3, 5)}, ${string} `);
//
// console.log(
//   `using imported function! ${searchView.add(id, 2)} and ${searchView.multiply(
//     3,
//     5
//   )}, ${string} `
// );
// import axios from "axios";
//
// async function getResults(query) {
//   try {
//     const result = await axios(
//       `https://forkify-api.herokuapp.com/api/search?q=${query}`
//     );
//     const recipes = result.data.recipes;
//     console.log(recipes);
//   } catch (err) {
//     console.log(err);
//   }
// }
//
// getResults("pizza");

///////////////////

// import Recipe from "./modules/Search";
import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import { elements, reducerLoader, clearLoader } from "./views/base";
// Global state of the app
// - search object
// -current recipes object
// -shoping list object
// -liked Recipes

const state = {};

/* SEARCH CONTROLER */
const constrolSearch = async () => {
  //1 -get inputs from view
  const query = searchView.getInput(); //// TODO:

  if (query) {
    // 2 - New serch objt and add to state
    state.search = new Search(query);

    //3 -prepare UI for results

    searchView.clearInput();
    searchView.clearResults();
    reducerLoader(elements.searchRes);

    try {
      // 4 - search for recipes
      await state.search.getResults();

      // 5 - render results on UI
      // console.log("state.search.result", state.search.result);
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      console.log("something wrong with the search");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  constrolSearch();
});

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  // console.log(btn);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    console.log(goToPage);
  }
});

////////////////////////////////////////////////

/* RECIPE CONTROLER */
import Recipe from "./modules/Recipe";

// const r = new Recipe(47746);
// console.log("riiiiii", r);
// r.getRecipe();

const controlRecipe = async () => {
  //GET id from url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // Prepar ui for changes

    // Creating new recipe obj

    state.recipe = new Recipe(id);
    //testing
    // window.r = state.recipe;

    try {
      // get recipe data and partse ingredients
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      // calculate serving and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //render recipe
      console.log(state.recipe);
    } catch (err) {
      console.log("error processing recipe");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "loader"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// const search = new Search("pizza");
// console.log("search", search);
// search.getResults();
