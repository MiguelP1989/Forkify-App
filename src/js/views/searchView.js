// export const add = (a, b) => a + b;
//
// export const multiply = (a, b) => a * b;
//
// export const id = 23;
import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
};

// "pasta with tomato and spinach"
// acc: 0 / acc + cur./length = 5 / newTitle = ["Pasta"]
// acc: 5 / acc + cur./length = 9 / newTitle = ["Pasta", "width"]
//acc: 9 / acc + cur./length = 15 / newTitle = ["Pasta", "width", "tomato"]
//acc: 15 / acc + cur./length = 18 / newTitle = ["Pasta", "width", "tomato"] // more than 17 and doesnt pass the test

const limitRecipieTitle = (title, limit = 17) => {
  let newTitle = [];

  if (title.length > limit) {
    title.split(" ").reduce((acc, current) => {
      if (acc + current.length <= limit) {
        newTitle.push(current);
      }
      return acc + current.length;
    }, 0);
    // return the result
    // console.log(newTitle);
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

// limitRecipieTitle("pasta with tomato and spinach");

const renderRecipe = recipe => {
  let markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt=${recipe.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipieTitle(
                  recipe.title
                )}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
        </li>
        `;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = recipes => {
  // console.log("recipesssss", recipes);
  recipes.forEach(el => renderRecipe(el));
};
