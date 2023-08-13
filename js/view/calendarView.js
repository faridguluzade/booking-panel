const calendarView = (days) => {
  const daysEl = document.querySelectorAll(".date__days li");

  daysEl.forEach((day) => {
    if (days.includes(Number(day.textContent))) {
      day.classList.add("aviable");
    }
  });
};

export default calendarView;
