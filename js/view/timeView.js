const timeView = (timeArr) => {
  const timeEl = document.querySelector(".time__schedules");

  const markup = timeArr
    .map((t) => {
      return ` 
          <div class="times">
            <p class="time__start">${t.start_time}</p>
            <p class="time__end">${t.end_time}</p>
         </div>
    `;
    })
    .join("");

  timeEl.insertAdjacentHTML("afterbegin", markup);
};

export default timeView;
