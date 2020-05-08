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

import Search from "./modules/Search";

// Global state of the app
// - search object
// -current recipes object
// -shoping list object
// -liked Recipes

const state = {};

const constrolSearch = async () => {
  //1 -get salary from view
  const query = "pizza"; //// TODO:

  if (query) {
    // 2 - New serch objt and add to state
    state.search = new Search(query);

    //3 -prepare UI for results

    // 4 - search for recipes
    await state.search.getResults();

    // 5 - render results on UI

    console.log("state.search.result", state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  constrolSearch();
});

// const search = new Search("pizza");
// console.log("search", search);
// search.getResults();
