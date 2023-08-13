import staffView from "./view/staffView.js";
import serviceView from "./view/serviceView.js";
import calendarView from "./view/calendarView.js";
import timeView from "./view/timeView.js";

import { staff } from "./constants/index.js";
import { services } from "./constants/index.js";
import { time } from "./constants/index.js";

import { aviableDays, renderWarning } from "./helper.js";

import { state } from "./model.js";

const controlStaff = function () {
  // set view
  staffView(staff);

  const staffEl = document.querySelector(".staff");
  const staffCards = document.querySelectorAll(".staff__card");

  // select staff
  staffEl.addEventListener("click", function (e) {
    const clicked = e.target.closest(".staff__card");

    if (!clicked) return;

    // Remove active class;
    staffCards.forEach((s) => s.classList.remove("selected"));

    clicked.classList.add("selected");
    const staffId = clicked.dataset.id;

    // push the staff id to the state
    state.staff_id = staffId;
  });
};

const controlService = function () {
  // set view
  serviceView(services);
};

export const controlCalendar = function () {
  calendarView(aviableDays);
};

const controlTime = function () {
  timeView(time);
};

const controlNext = function () {
  const nextBtn = document.querySelector(".btn--next");
  const tabItem = document.querySelector(".sidebar__link--active");
  const tabNum = +tabItem.dataset.tab;
  const tabActive = document.querySelector(`.tab__content--${tabNum}`);

  nextBtn.addEventListener("click", function (e) {
    if (tabNum === 1) {
      if (!state.staff_id) {
        renderWarning("staff");
        return;
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
    }
  });
};

const init = function () {
  controlStaff();
  controlService();
  controlCalendar();
  controlTime();
  controlNext();
};

init();
