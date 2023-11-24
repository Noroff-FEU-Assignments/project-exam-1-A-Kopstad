document.addEventListener("DOMContentLoaded", function () {
    const cors = "https://noroffcors.onrender.com/";
    const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
    const url = cors + endpoint;
  
    const retrievedCarousel = document.querySelector(".carousel-container");

    // Sjekk om retrievedCarousel er null før du fortsetter
    if (!retrievedCarousel) {
      console.error("Element with class 'carousel' not found.");
      return;
    }
  
    let currentSlide = 0;
    const slidesToShow = 3;
  
    function nextSlide() {
      currentSlide += 1;
      updateCarousel();
    }
  
    function prevSlide() {
      currentSlide -= 1;
      updateCarousel();
    }
  
    async function apiCall() {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
  
const carouselInner = retrievedCarousel.querySelector(".carousel-inner");
  
        // Loop gjennom hvert resultat og legg til bildene i carouselInner
        for (let i = 0; i < result.length; i++) {
          if (i === 3) {
            break;
          }
  
          const carouselLoop = result[i];
          const parser = new DOMParser();
          const doc = parser.parseFromString(carouselLoop.content.rendered, "text/html");
          const image = doc.querySelector("img");
          const imageUrl = image ? image.src : "";
          const imageAlt = image ? image.alt : "";
  
          // Lag et nytt bildeelement og legg til det i carouselInner
          const slide = document.createElement("div");
          slide.classList.add("carousel-slide");
          slide.innerHTML = `<img src="${imageUrl}" alt="${imageAlt}">`;
          carouselInner.appendChild(slide);
        }
  
        // Oppdater karusellen etter å ha lagt til bildene
        updateCarousel();
      } catch (error) {
        console.error("Fetch error:", error);
        retrievedCarousel.innerHTML = "An error has occurred";
      }
    }
  
    function updateCarousel() {
      const carouselInner = retrievedCarousel.querySelector(".carousel-inner");
      const totalSlides = carouselInner.children.length;
      const maxIndex = totalSlides - slidesToShow;
  
      if (currentSlide < 0) {
        currentSlide = 0;
      } else if (currentSlide > maxIndex) {
        currentSlide = maxIndex;
      }
  
      const translateValue = -currentSlide * (100 / slidesToShow);
      carouselInner.style.transform = `translateX(${translateValue}%)`;
    }
  
    apiCall();
  });
  
  
  
  