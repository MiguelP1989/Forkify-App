import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

export const highlightedSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach(el => {
    el.classList.remove("results__link--active");
  });
  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add("results__link--active");
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

// type: "prev" or "next"
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
</button>`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    //button to go to the next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // display both buttons
    button = `
    ${createButton(page, "prev")}
    ${createButton(page, "next")}`;
  } else if (page === pages && pages > 1) {
    // only button to go to prev page
    button = createButton(page, "prev");
  }
  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  // console.log("recipesssss", recipes);
  recipes.slice(start, end).forEach(el => renderRecipe(el));

  // render the pagination renderButtons
  renderButtons(page, recipes.length, resPerPage);
};
