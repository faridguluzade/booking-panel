import { date } from "./constants/index.js";
import { state } from "./model.js";
import {
  warningEl,
  warningText,
  modal,
  overlay,
  btnCloseModal,
} from "./selectors.js";

export const aviableDays = date.map((d) => new Date(d).getDate());

export const renderWarning = function (message) {
  warningText.textContent = `select ${message}`;

  warningEl.classList.add("warning--active");
};

export const closeWarning = function () {
  warningEl.classList.remove("warning--active");
};

export const renderNextTab = function (tabItem, tabNum) {
  // remove warning message
  closeWarning();

  // remove active class from sidebar
  tabItem.classList.remove("sidebar__link--active");
  tabItem.classList.add("sidebar__link--confirmed");

  // add active class to the sidebar
  document
    .querySelector(`[data-tab="${tabNum + 1}"]`)
    .classList.add("sidebar__link--active");

  // remove active class from tab
  document
    .querySelector(`.tab__content--${tabNum}`)
    .classList.remove("tab--active");

  // activate active class to the tab
  document
    .querySelector(`.tab__content--${tabNum + 1}`)
    .classList.add("tab--active");
};

export const renderPevTab = function (tabItem, tabNum) {
  // remove warning message
  closeWarning();

  // remove active class from sidebar
  tabItem.classList.remove("sidebar__link--active");

  document
    .querySelector(`[data-tab="${tabNum - 1}"]`)
    .classList.remove("sidebar__link--confirmed");

  // add active class to the sidebar
  document
    .querySelector(`[data-tab="${tabNum - 1}"]`)
    .classList.add("sidebar__link--active");

  // remove active class from tab
  document
    .querySelector(`.tab__content--${tabNum}`)
    .classList.remove("tab--active");

  // activate active class to the tab
  document
    .querySelector(`.tab__content--${tabNum - 1}`)
    .classList.add("tab--active");
};

export const formatDate = function (day) {
  const getDate = document.querySelector(".date__current");

  const [monthName, year] = getDate.textContent.split(" ");

  // Convert month name to a numeric value (0-indexed)
  const month = new Date(`${monthName} 1, ${year}`).getMonth() + 1;

  // Pad day and month with leading zeros if necessary
  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  // Form the final date string
  return `${year}-${paddedMonth}-${paddedDay}`;
};

export const getInputVal = function (id) {
  return document.querySelector(`#${id}`).value;
};

export const resetInputVal = function () {
  document.querySelectorAll("input").forEach((i) => (i.value = ""));
};

export const reset = function () {
  const sidebarItems = document.querySelectorAll(".sidebar__link");

  // remove active and confirm class from sidebar item
  sidebarItems.forEach((s) => {
    s.classList.remove("sidebar__link--active");
    s.classList.remove("sidebar__link--confirmed");
  });

  // add active class to the sidebar
  document
    .querySelector(`[data-tab="1"]`)
    .classList.add("sidebar__link--active");

  // remove active class from tab
  document.querySelector(".tab__content--4").classList.remove("tab--active");

  // activate active class to the tab
  document.querySelector(".tab__content--1").classList.add("tab--active");

  // remove selected class from items
  document
    .querySelectorAll(".selected")
    .forEach((el) => el.classList.remove("selected"));

  // remove active class from time schedule list
  document.querySelector(".time__schedules").classList.remove("active");

  // reset title from time header
  document.querySelector(".time__date").textContent = "Select date";

  // reset next button
  document.querySelector(".btn--next").textContent = "Next";

  // reset back button
  document.querySelector(".btn--back").classList.remove("btn--active");

  // reset input value
  resetInputVal();

  // reset state
  state.service_id = null;
  state.staff_id = null;
  state.date = "";
  state.time = "";
  state.customer = {
    name: "",
    surname: "",
    email: "",
    phone: "",
  };
};

// OPEN MODAL
export const openModal = function (message, isSuccess) {
  const modalText = modal.querySelector(".modal__text");

  if (isSuccess) modalText.classList.add("modal__text--success");
  else modalText.classList.add("modal__text--warning");

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  modalText.textContent = message;
};

// CLOSE MODAL
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
