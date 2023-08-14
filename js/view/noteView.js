const noteView = (noteData) => {
  if (!noteData) return;

  const confirEl = document.querySelector(".confirmation__note");

  const markup = `
     
        <label>Note</label>
            <ul class="confirmation__list">
                <li class="confirmation__item">
                    <span>Staff: </span> <span>${noteData.staffName}</span>
                </li>
                <li class="confirmation__item">
                    <span>Service: </span> <span>${noteData.serviceName} </span>
                </li>
                <li class="confirmation__item">
                    <span>Date: </span> <span>${noteData.date}
                    </span>
                </li>
                <li class="confirmation__item">
                    <span>Total: </span> <span style="font-weight: 500; color: #53d56c;">$${noteData.total}</span>
                </li>
         </ul>
    `;

  confirEl.innerHTML = markup;
};

export default noteView;
