import {
  renderCards,
  initializeScrollIndicators,
  selectedCards,
} from "./dom.js";
import axios from "axios";

const brothsUrl = "https://api.tech.redventures.com.br/broths";
const proteinsUrl = "https://api.tech.redventures.com.br/proteins";
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchAndRenderCards() {
  try {
    const brothsResponse = await axios.get(brothsUrl, {
      headers: { "x-api-key": API_KEY },
    });
    const brothsData = brothsResponse.data;
    renderCards(brothsData, "broths-list");

    // Initialize the indicator functionality after cards are rendered
    initializeScrollIndicators();
  } catch (error) {
    console.error("Error fetching broths data:", error);
  }

  try {
    const proteinsResponse = await axios.get(proteinsUrl, {
      headers: { "x-api-key": API_KEY },
    });
    const proteinsData = proteinsResponse.data;
    renderCards(proteinsData, "proteins-list");

    // Initialize the indicator functionality after cards are rendered
    initializeScrollIndicators();
  } catch (error) {
    console.error("Error fetching proteins data:", error);
  }
}

// Submit order function
export async function submitOrder() {
  const { "broths-list": brothCard, "proteins-list": proteinCard } =
    selectedCards;

  const order = {
    brothId: brothCard.dataset.id,
    proteinId: proteinCard.dataset.id,
  };

  try {
    const response = axios.post(
      "https://api.tech.redventures.com.br/orders",
      order,
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    if (response) {
      const successPageUrl = `success.html?broth=${encodeURIComponent(brothCard.dataset.name)}&protein=${encodeURIComponent(proteinCard.dataset.name)}`;
      window.location.href = successPageUrl;
    } else {
      alert("Failed to place order.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error placing order.");
  }
}
