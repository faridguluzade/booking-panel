const serviceView = (services) => {
  const serviceEl = document.querySelector(".service");

  const markup = services
    .map((service) => {
      return `
            <div class="service__card" data-service-id=${service.id}>
            <div class="service__wrapper">
                <figure>
                    <img class="service__img" src="./assets/images/${service.image}" alt="service image">
                </figure>
                <div class="service__content-box">
                    <h3 class="service__title">${service.name}</h3>
                    <time class="service__time">${service.duration}</time>
                </div>
            </div>
            <span class="service__price">
               ${service.price}$
            </span>
        </div>
    `;
    })
    .join("");

  serviceEl.insertAdjacentHTML("afterbegin", markup);
};

export default serviceView;
