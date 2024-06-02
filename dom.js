export const selectedCards = {
  "broths-list": null,
  "proteins-list": null,
};

// Render cards function
export function renderCards(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const card = createCard(item);
    container.appendChild(card);
    card.addEventListener("click", () => toggleCardState(card, containerId));
  });
}

// Create card element
function createCard({
  id,
  imageInactive,
  imageActive,
  name,
  description,
  price,
}) {
  const card = document.createElement("li");
  card.classList.add("order-card");
  card.dataset.id = id;
  card.dataset.name = name;

  card.innerHTML = `
        <img class='order-card__image' src='${imageInactive}' alt='${name}' data-inactive-src='${imageInactive}' data-active-src='${imageActive}'>
        <h2 class='order-card__title'>${name}</h2>
        <p class='order-card__description'>${description}</p>
        <p class='order-card__price'>US$ ${price}</p>
    `;
  return card;
}

// Toggle card state
export function toggleCardState(card, containerId) {
  if (selectedCards[containerId]) {
    deactivateCard(selectedCards[containerId]);
  }

  activateCard(card);
  selectedCards[containerId] = card;

  updateButtonState();
}

// Activate card
function activateCard(card) {
  card.classList.add("active");
  const image = card.querySelector(".order-card__image");
  image.src = image.dataset.activeSrc;
  card
    .querySelectorAll(
      ".order-card__title, .order-card__description, .order-card__price",
    )
    .forEach((el) => el.classList.add("active"));
}

// Deactivate card
function deactivateCard(card) {
  card.classList.remove("active");
  const image = card.querySelector(".order-card__image");
  image.src = image.dataset.inactiveSrc;
  card
    .querySelectorAll(
      ".order-card__title, .order-card__description, .order-card__price",
    )
    .forEach((el) => el.classList.remove("active"));
}

// Update submit button state
export function updateButtonState() {
  const button = document.querySelector(".order-button");
  const allSelected = Object.values(selectedCards).every(
    (card) => card !== null,
  );

  button.disabled = !allSelected;
}

// Initialize scroll indicators
export function initializeScrollIndicators() {
  document.querySelectorAll(".order-section").forEach((section) => {
    const cardContainers = section.querySelectorAll(".order-section__cardList");
    const indicators = section.querySelectorAll(".order-indicator__icon");

    cardContainers.forEach((container) => {
      container.addEventListener("scroll", () =>
        updateIndicators(container, indicators),
      );
    });
  });
}

// Update scroll indicators
function updateIndicators(container, indicators) {
  const cards = container.querySelectorAll(".order-card");
  const cardWidth =
    cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
  const index = Math.round(container.scrollLeft / cardWidth);

  indicators.forEach((indicator, i) => {
    // Check if the current indicator's index matches the provided index
    if (i === index) {
      // If it matches, set the source to the active image
      indicator.src = "./images/indicator/Rectangle 2.svg";
    } else {
      // If it doesn't match, set the source to the inactive image
      indicator.src = "./images/indicator/Rectangle 4.svg";
    }
  });
}
