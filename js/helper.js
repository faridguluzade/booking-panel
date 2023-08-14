import headerView from "./view/headerView.js";
import { date } from "./constants/index.js";
import { state } from "./model.js";
import {
  warningEl,
  warningText,
  modal,
  overlay,
  btnCloseModal,
  btnBack,
  dateHeader,
  timeContainer,
} from "./selectors.js";

export const aviableDays = date.map((d) => new Date(d).getDate());

export const renderWarning = function (message) {
  warningText.textContent = `select ${message}`;

  warningEl.classList.add("warning--active");
};

export const closeWarning = function () {
  warningEl.classList.remove("warning--active");
};

export const renderNextTab = function () {
  const tabItem = document.querySelector(".sidebar__link--active");
  const tabNum = +tabItem.dataset.tab;

  // remove warning message
  closeWarning();

  if (tabNum === 1) {
    // activate back button for anothers tab page
    btnBack.classList.add("btn--active");
    // set header view
    headerView("Select service");
  }

  if (tabNum === 2) {
    // set header view
    headerView("Date & time");
  }

  if (tabNum === 3) {
    // set header view
    headerView("Confirm detailes");
  }

  if (!state.date || !state.time) {
    const timeList = document.querySelectorAll(".times");
    const aviableDaysEl = document.querySelectorAll(".aviable");

    // Remove active class;
    timeList.forEach((t) => t.classList.remove("selected"));
    aviableDaysEl.forEach((d) => d.classList.remove("selected"));
    dateHeader.textContent = "Select date";
    timeContainer.classList.remove("active");
  }

  if (!state.service_id) {
    const serviceCards = document.querySelectorAll(".service__card");
    // Remove active class;
    serviceCards.forEach((s) => s.classList.remove("selected"));
  }

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

export const renderPevTab = function () {
  const tabItem = document.querySelector(".sidebar__link--active");
  const tabNum = +tabItem.dataset.tab;

  // remove warning message
  closeWarning();

  if (tabNum === 2) {
    btnBack.classList.remove("btn--active");
    // set header view
  }

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

export const getFormObject = function () {
  let name = getInputVal("firstname");
  let surname = getInputVal("lastname");
  let email = getInputVal("email");
  let phone = getInputVal("phone");

  return { name, surname, email, phone };
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
