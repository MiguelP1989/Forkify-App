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

const search = new Search("pizza");
console.log(search);
search.getResults();
