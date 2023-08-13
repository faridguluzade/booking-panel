import { date } from "./constants/index.js";

export const aviableDays = date.map((d) => {
  return new Date(d).getDate();
});

export const renderWarning = function (message) {
  const warningEl = document.querySelector(".warning-message");

  if (warningEl.classList.contains("warning-message--active")) return;

  const markup = `<p>select ${message}</p>`;

  warningEl.insertAdjacentHTML("beforeend", markup);

  warningEl.classList.add("warning-message--active");

  // setTimeout(() => {
  //   warningEl.classList.remove("warning-message--active");
  // }, 1000);
};
