const headerView = function (title) {
  const headerEl = document.querySelector(".header__box");

  const markup = `<h2 class="header__heading">${title}</h2>`;

  headerEl.innerHTML = markup;
};

export default headerView;
