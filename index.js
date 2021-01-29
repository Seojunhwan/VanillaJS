const title = document.querySelector("#title"),
  clock = document.querySelector(".js-title");

const CLICKED_CLASS = "clicked",
  CHANGE_CLASS = "first_color";

function handleClick() {
  title.classList.toggle(CLICKED_CLASS);
}

function changeColor() {
  title.classList.toggle(CHANGE_CLASS);
  clock.classList.toggle(CHANGE_CLASS);
}

function init() {
  title.addEventListener("click", handleClick);
  setInterval(changeColor, 2000);
}

init();
