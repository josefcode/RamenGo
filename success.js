document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const broth = params.get("broth");
  const protein = params.get("protein");
  const wrapperElement = document.querySelector(".success-page__wrapper");

  if (broth && protein) {
    const descriptionText = `${broth} and ${protein} Ramen`;
    let imageSrc = "";

    if (broth === "Shoyu" && protein === "Karaague") {
      imageSrc = "./images/lamen.png";
    } else if (broth === "Miso" && protein === "Chasu") {
      imageSrc = "./images/lamen-miso 1.png";
    } else if (broth === "Salt" && protein === "Yasai Vegetarian") {
      imageSrc = "./images/ramen-3 1.png";
    } else {
      imageSrc = "./images/lamen.png"; // Default image if none of the conditions match
    }

    // Create and append the image element
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = generateAltText(imageSrc);
    img.classList.add("success-page__image");

    // Create and append the title element
    const title = document.createElement("h1");
    title.classList.add("success-page__title");
    title.textContent = "Your Order:";

    // Create and append the description element
    const description = document.createElement("p");
    description.classList.add("success-page__description");
    description.textContent = descriptionText;

    if (broth === "Salt" && protein === "Yasai Vegetarian") {
      description.classList.add("description-width");
    }

    // Append all elements to the wrapper
    wrapperElement.appendChild(img);
    wrapperElement.appendChild(title);
    wrapperElement.appendChild(description);
  } else {
    const description = document.createElement("p");
    description.classList.add("success-page__description");
    description.textContent = "Order details not available.";
    wrapperElement.appendChild(description);
  }
});

const newOrder = document.querySelector(".success-main__button");

newOrder.addEventListener("click", () => {
  // Redirect to index.html after some action
  window.location.href = "index.html";
});

// Function to generate alt text based on the imageSrc
function generateAltText(imageSrc) {
  const fileName = imageSrc.split("/").pop().split(".")[0];
  const altTextMap = {
    lamen: "Image of a bowl of ramen.",
    "lamen-miso 1": "Image of a bowl of miso ramen with toppings.",
    "ramen-3 1": "Image of a bowl of vegetarian ramen with vegetables.",
  };
  return altTextMap[fileName] || "Image of a ramen bowl";
}
