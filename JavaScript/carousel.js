const cors = "https://noroffcors.onrender.com/";
const endpoint =
  "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed&per_page=100";
const url = cors + endpoint;

//Holding fetched data.
let result;

//Declaring errormessage
const errorMessage = document.querySelector(".error-message");

//Declaring loader
const loader = document.querySelector(".loader");

// Global currentIndex declaration
let currentIndex = 0;

//function for interactive carusel(screenwidth).
function getNumberOfItemsToShow() {
  if (window.innerWidth > 1355) {
    return 3;
  } else if (window.innerWidth > 900) {
    return 2;
  } else {
    return 1;
  }
}
// Function to update the carousel based on the current index
function updateCarousel(result) {
  loader.classList.remove("hidden");
  try {
    const carouselWrapper = document.querySelector(".carousel-inner");
    carouselWrapper.innerHTML = "";

    const itemsToShow = getNumberOfItemsToShow();

    // Populate carousel with the next 3 images
    for (
      let i = currentIndex;
      i < currentIndex + itemsToShow && i < result.length;
      i++
    ) {
      const item = result[i];
      if (item) {
        // Extract title and parse content
        const title = item.title.rendered;
        const parser = new DOMParser();
        const doc = parser.parseFromString(item.content.rendered, "text/html");
        const image = doc.querySelector("img");
        const imageUrl = image ? image.src : "";
        const imageAlt = image ? image.alt : "";

        if (imageUrl) {
          // Create and append elements to the carousel
          const container = document.createElement("div");
          const anchor = document.createElement("a");
          anchor.href = "/HTML/blogpost.html?id=" + item.id;
          container.classList.add(
            "carousel-card",
            "flexbox",
            "flex-column",
            "align-center"
          );

          const imgElement = document.createElement("img");
          imgElement.src = imageUrl;
          imgElement.alt = imageAlt;

          const titleElement = document.createElement("p");
          titleElement.innerHTML = title;

          container.appendChild(imgElement);
          container.appendChild(titleElement);
          anchor.appendChild(container);
          carouselWrapper.appendChild(anchor);
        }
      }
    }
  } catch (error) {
    console.error("Error updating carousel:", error);
    errorMessage.textContent =
      "There was an issue updating the content. Please try again later.";
  } finally {
    loader.classList.add("hidden");
  }
}
window.addEventListener("resize", () => {
  updateCarousel(result); 
});

//

// Navigates backward in the carousel based on the current screen size.
function prevSlide(result) {
  const itemsToShow = getNumberOfItemsToShow();

  if (currentIndex > 0) {
    currentIndex -= itemsToShow;
  } else {
    currentIndex = Math.max(0, result.length - itemsToShow);
  }
  currentIndex = Math.max(0, currentIndex);
  updateCarousel(result);
}

// Navigates forward in the carousel, adapting to the screen size.
function nextSlide(result) {
  const itemsToShow = getNumberOfItemsToShow();

  if (currentIndex < result.length - itemsToShow) {
    currentIndex += itemsToShow;
  } else {
    currentIndex = 0;
  }
  updateCarousel(result);
}

// I've added an EventListener to make sure that the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  try {
    result = await apiCall();

    // Event listeners for arrow clicks
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");
    arrowLeft.addEventListener("click", () => prevSlide(result));
    arrowRight.addEventListener("click", () => nextSlide(result));

    // Initial load of carousel
    updateCarousel(result);
  } catch (error) {
    console.error("error in API-call:", error);
    errorMessage.textContent =
      "We're having trouble loading the post. Please check your connection and try again.";
  }
});

function setupCarousel(result) {
  // Event listeners for arrow clicks
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  arrowLeft.addEventListener("click", () => prevSlide(result));
  arrowRight.addEventListener("click", () => nextSlide(result));

  // Initial load of carousel
  updateCarousel(result);

  // Update carousel on window resize
  window.addEventListener("resize", () => {
    updateCarousel(result);
  });
}

async function apiCall() {
  loader.classList.remove("hidden");

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Feil ved henting:", error);
    errorMessage.textContent =
      "We're having trouble loading the post. Please check your connection and try again.";
    throw error;
  } finally {
    loader.classList.add("hidden");
  }
}







