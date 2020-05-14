import { elements } from "./base";

export const toggleLiked = isLiked => {
  // const iconString = isLiked ? "icon-heart" : "icon-heart-outline";
  // document
  //   .querySelector(".recipe__love use")
  //   .setAttribute("href", `img/icons.svg#${iconString}`);
  const colorChange = isLiked
    ? document.querySelector(".header__likes").classList.add("white")
    : document.querySelector(".header__likes").classList.remove("white");
};

export const toggleLikeLogo = numLikes => {
  const showchange =
    numLikes > 0
      ? document.querySelector(".likes__field").classList.add("show")
      : document.querySelector(".likes__field").classList.remove("show");
};

export const renderLikes = like => {
  console.log("like", like.likes[0].id);
  const markup = `
    <li>
        <a class="likes__link" href="#${like.likes[0].id}">
            <figure class="likes__fig">
                <img src="${like.likes[0].img}" alt="${like.likes[0].title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.likes[0].title}</h4>
                <p class="likes__author">${like.likes[0].author}</p>
            </div>
        </a>
    </li>
    `;
  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href="#${id}"]`)
    .parentElement;
  if (el) el.parentElement.removeChild(el);
};
