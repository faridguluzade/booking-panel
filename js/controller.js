import staffView from "./view/staffView.js";
import serviceView from "./view/serviceView.js";
import calendarView from "./view/calendarView.js";
import timeView from "./view/timeView.js";
import noteView from "./view/noteView.js";
import headerView from "./view/headerView.js";

import {
  aviableDays,
  renderWarning,
  renderNextTab,
  formatDate,
  getInputVal,
  openModal,
  renderPevTab,
  reset,
  getFormObject,
} from "./helper.js";

import {
  staffEl,
  serviceEl,
  daysEl,
  dateHeader,
  timeContainer,
  btnNext,
  btnBack,
} from "./selectors.js";

import { staff, time, services } from "./constants/index.js";
import { state, noteState } from "./model.js";

const controlStaff = function () {
  // set view
  staffView(staff);

  // set header view
  headerView("Select staff");

  const staffCards = document.querySelectorAll(".staff__card");

  // select staff
  staffEl.addEventListener("click", function (e) {
    const clicked = e.target.closest(".staff__card");

    if (!clicked) return;

    if (state.staff_id) {
      state.service_id = null;
      state.date = "";
      state.time = "";
      state.customer = {
        name: "",
        surname: "",
        email: "",
        phone: "",
      };
    }

    // Remove active class;
    staffCards.forEach((s) => s.classList.remove("selected"));

    // add active class to the
    clicked.classList.add("selected");

    // get the staff name
    const staffName = clicked.querySelector(".staff__name").textContent;
    noteState.staffName = staffName;

    // push the staff id to the state
    const staffId = clicked.dataset.id;
    state.staff_id = staffId;

    // step to the next page by clicking the card
    renderNextTab();
  });
};

const controlService = function () {
  // set view
  serviceView(services);

  const serviceCards = document.querySelectorAll(".service__card");

  serviceEl.addEventListener("click", function (e) {
    const clicked = e.target.closest(".service__card");

    if (!clicked) return;

    if (state.service_id) {
      state.date = "";
      state.time = "";
      state.customer = {
        name: "",
        surname: "",
        email: "",
        phone: "",
      };
    }

    // Remove active class;
    serviceCards.forEach((s) => s.classList.remove("selected"));

    // add selected to the element
    clicked.classList.add("selected");

    const price = clicked
      .querySelector(".service__price")
      .textContent.trim()
      .split("$")
      .join("");

    // get the service name
    const serviceName = clicked.querySelector(".service__title").textContent;
    noteState.serviceName = serviceName;
    noteState.total = price;

    const serviceId = clicked.dataset.id;
    // push the staff id to the state
    state.service_id = serviceId;

    // step to the next page by clicking the card
    renderNextTab();
  });
};

export const controlCalendar = function () {
  // set view
  calendarView(aviableDays);

  const aviableDaysEl = document.querySelectorAll(".aviable");

  daysEl.addEventListener("click", function (e) {
    const clicked = e.target.closest(".aviable");

    if (!clicked) return;

    if (state.date) {
      state.customer = {
        name: "",
        surname: "",
        email: "",
        phone: "",
      };
    }

    // Remove active class;
    aviableDaysEl.forEach((d) => d.classList.remove("selected"));

    // Add selected class to the clicked element
    clicked.classList.add("selected");

    // Show the list of the time
    timeContainer.classList.add("active");

    const day = clicked.textContent;
    const formattedDate = formatDate(day);

    // add the date to the noteState
    noteState.date = formattedDate;

    dateHeader.textContent = formattedDate;
    // push the date to the state
    state.date = formattedDate;
  });
};

const controlTime = function () {
  // set view
  timeView(time);

  const timeList = document.querySelectorAll(".times");

  timeContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".times");

    if (!clicked) return;

    if (state.date) {
      state.customer = {
        name: "",
        surname: "",
        email: "",
        phone: "",
      };
    }

    timeList.forEach((t) => t.classList.remove("selected"));

    // add selected to the element
    clicked.classList.add("selected");

    const startTime = clicked.querySelector(".time__start").textContent;
    const endTime = clicked.querySelector(".time__end").textContent;

    // add the time to the noteState
    noteState.date += ` / ${startTime} ${endTime}`;

    // push the time to the state
    state.time = startTime;

    // step to the next page by clicking the card
    renderNextTab();

    // make note view
    controlConfirmation();
  });
};

function controlConfirmation() {
  // set view
  noteView(noteState);
  btnNext.textContent = "Confirm Booking";
}

const controlNext = function () {
  btnNext.addEventListener("click", function () {
    const tabItem = document.querySelector(".sidebar__link--active");
    const tabNum = +tabItem.dataset.tab;

    if (tabNum === 1) {
      if (!state.staff_id) {
        renderWarning("staff");
        return;
      }
      // render next tab
      renderNextTab();
    }

    if (tabNum === 2) {
      if (!state.service_id) {
        renderWarning("service");
        return;
      }
      // render next tab
      renderNextTab();
    }

    if (tabNum === 3) {
      if (!state.date || !state.time) {
        renderWarning("date & time");
        return;
      }

      // render next tab
      renderNextTab();

      controlConfirmation();
    }

    if (tabNum === 4) {
      const { name, surname, email, phone } = getFormObject();

      if (!name || !surname || !email) {
        openModal("Please, fill the all required fields!", false);
        return;
      }

      state.customer = { name, surname, email, phone };

      openModal("Confirmation successfully completed!", true);

      const bookingState = { ...state };

      console.log(bookingState);

      // reset all data
      reset();
    }
  });
};

const controlBack = function () {
  btnBack.addEventListener("click", function () {
    const tabItem = document.querySelector(".sidebar__link--active");
    const tabNum = +tabItem.dataset.tab;

    if (tabNum === 2) {
      headerView("Select staff");
    }

    if (tabNum === 3) {
      // set header view
      headerView("Select service");
    }

    if (tabNum === 4) {
      btnNext.textContent = "Next";
      // set header view
      headerView("Date & time");
    }

    renderPevTab();
  });
};

const init = function () {
  controlStaff();
  controlService();
  controlCalendar();
  controlTime();
  controlNext();
  controlBack();
};

init();
