const staffView = (staff) => {
  const staffEl = document.querySelector(".staff");

  const markup = staff
    .map((s) => {
      return `
     <div class="staff__card" data-id=${s.id}>
            <figure>
                <img class="staff__img" src="./assets/images/${s.image}" alt="doctor photo">
            </figure>
            <div class="staff__content-box">
                <h3 class="staff__name">${s.name}</h3>
                <p class="staff__mail">${s.email}</p>
            </div>
        </div>
    `;
    })
    .join("");

  staffEl.insertAdjacentHTML("afterbegin", markup);

  return markup;
};

export default staffView;
