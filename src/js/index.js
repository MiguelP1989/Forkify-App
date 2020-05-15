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
import Recipe from "./modules/Recipe";
import List from "./modules/List";
import Likes from "./modules/Likes";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import { elements, reducerLoader, clearLoader } from "./views/base";
// Global state of the app
// - search object
// -current recipes object
// -shoping list object
// -liked Recipes

const state = {};
window.state = state; // to test

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

// const r = new Recipe(47746);
// console.log("riiiiii", r);
// r.getRecipe();

const controlRecipe = async () => {
  //GET id from url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // Prepar ui for changes
    recipeView.clearRecipe();
    reducerLoader(elements.recipe);

    // highlightedSelected search item
    if (state.search) {
      searchView.highlightedSelected(id);
    }

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
      clearLoader();
      recipeView.renderRecipe(state.recipe);
      if (state.likes.isLiked(id)) {
        likesView.toggleLiked(true);
      }

      // likesView.toggleLiked(true);
    } catch (err) {
      console.log("error processing recipe", err);
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// handling recipe button clicks
elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-increase, .btn-increase *")) {
    // increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingIngredients(state.recipe);
  } else if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingIngredients(state.recipe);
    }
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    //like CONTROLER

    controlLike();
  }
  // console.log("state.recipe......", state.recipe);
});

/////////////////////////////////////////////////////////////

/* LIST CONTROLER */

// window.l = new List();

const controlList = () => {
  // Create a new List of there is none yet
  if (!state.list) state.list = new List();

  // add each ingredients to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });

  //handle delete and update list item events
  elements.shopping.addEventListener("click", e => {
    const id = e.target.closest(".shopping__item").dataset.itemid;

    // handle the delete button
    if (e.target.matches(".shopping__delete, .shopping__delete *")) {
      // delete from state
      state.list.deleteItem(id);

      /// DElete from UI
      listView.deleteItem(id);

      /// handle the count update
    } else if (e.target.matches(".shopping__count-value")) {
      const val = parseFloat(e.target.value);
      state.list.updateCount(id, val);
    }
  });
};

//// LIKE CONTROLLER ///
// just testing -testing
// state.likes = new Likes();

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;

  //USER HAS NOT YET LIKED CURRENT RECIPE
  if (!state.likes.isLiked(currentId)) {
    //ADD LIKE TO THE state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    console.log("newLike", newLike);
    //TOGGLE THE LIKE button
    likesView.toggleLiked(true);
    // ADD LIKE TO UI LIST
    likesView.renderLikes(newLike);
    // console.log("state.likes", state.likes);
    // USER HAS LIKED CURRENT RECIPE
  } else {
    //REMOVE LIKE TO THE state
    state.likes.deleteLike(currentId);
    //TOGGLE THE LIKE button
    likesView.toggleLiked(false);
    // REMOVE LIKE TO UI LIST
    likesView.deleteLike(currentId);
    console.log("state removed", state.likes);
  }
  likesView.toggleLikeLogo(state.likes.getNumLikes());
};

///restore liked recipes on page load

window.addEventListener("load", () => {
  state.likes = new Likes();
  //restore likes
  state.likes.readStorage();
  //toggle like menu button
  likesView.toggleLikeLogo(state.likes.getNumLikes());
  // Render the existing likes
  state.likes.likes.forEach(like => {
    likesView.renderLikes(like);
  });
});

// const search = new Search("pizza");
// console.log("search", search);
// search.getResults();
