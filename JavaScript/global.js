document.addEventListener("DOMContentLoaded", function () {
    const cors = "https://noroffcors.onrender.com/";
    const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
    const url = cors + endpoint;
  
    const retrievedCarousel = document.querySelector(".carousel");
  
    // Sjekk om retrievedCarousel er null før du fortsetter
    if (!retrievedCarousel) {
      console.error("Element with class 'carousel' not found.");
      return;
    }
  
    let currentSlide = 0;
    const slidesToShow = 3;
  
    // Fetch funksjon
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
          slide.innerHTML = `
            <img src="${imageUrl}" alt="${imageAlt}">
            <a href="HTML/blogpost.html">
              <div class="card-top flexbox column">
                <p>${carouselLoop.title.rendered}</p>
              </div>
            </a>
            <div class="card-bottom flexbox">
              <p>${formattedDate}</p>
              <span> <p>by Sally Hawthorne</p> </span>
            </div>
          `;
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
  
    function prevSlide() {
      currentSlide -= 1;
      updateCarousel();
    }
  
    function nextSlide() {
      currentSlide += 1;
      updateCarousel();
    }
  
    // Bruk fetch-funksjonen og deretter parseAndCreateSlides-funksjonen
    apiCall();
  });
  







    //     const cors = "https://noroffcors.onrender.com/";
    // const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
    // const url = cors + endpoint;
    
    // async function apiCall() {
    //     try {
    //         const response = await fetch(url, {
    //             method: 'GET'
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    
    //         const result = await response.json();
    
    //         carousel.innerHTML = "";
    
    //         for (let i = 0; i < result.length; i++) {
    //             if (i === 3) {
    //                 break;
    //             }
                
    //             const carouselLoop = result[i];
    
    //             const carouselCard = document.createElement ('div')
    
    //             carouselCard.classList.add('carousel-card')
    
    //             carouselCard.dataset.productId = allResults.id;
    
    //             const imageUrl = carouselLoop.images.length > 0 ? allResults.images[0].src : '';
    //         }
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //         newIn.innerHTML = "An error has occurred";
    //     }
    // }
    
    // apiCall();
    // });


    //Hamburger menu

    //Creating variables
    const hamburgerMenu = document.querySelector('.burger-menu');
    const list = document.querySelector ('.navigation');
    
    // A function opening the hamburger menu
    hamburgerMenu.addEventListener('click', function () {
      list.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
    });


    // A function closing the hamburger menu 
    document.addEventListener ('click', function(event){
      if (!hamburgerMenu.contains(event.target) && !list.contains(event.target) && list.classList.contains('active')){
        list.classList.remove('active')
      }
    });



