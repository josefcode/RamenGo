import { fetchAndRenderCards, submitOrder } from "./api.js";
import { initializeScrollIndicators } from "./dom.js";

// Select DOM elements
const orderButton = document.querySelector(".banner__button");
const orderSection = document.querySelector(".order-section");
const submitButton = document.querySelector(".order-button");

// Scroll to order section on button click
orderButton.addEventListener("click", () => {
  orderSection.scrollIntoView({ behavior: "smooth" });
});

// Add event listener to submit button
submitButton.addEventListener("click", submitOrder);

// Fetch data and render cards on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderCards().then(initializeScrollIndicators);
});
