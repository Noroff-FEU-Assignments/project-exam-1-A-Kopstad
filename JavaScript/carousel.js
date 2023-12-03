const cors = "https://noroffcors.onrender.com/";
const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed&per_page=100";
const url = cors + endpoint;

//Declaring errormessage
const errorMessage = document.querySelector(".error-message");

//Declaring loader
const loader = document.querySelector(".loader");

// Global currentIndex declaration
let currentIndex = 0;

// Function to update the carousel based on the current index
function updateCarousel(result) {
    loader.classList.remove("hidden");
    try {
        const carouselWrapper = document.querySelector(".carousel-inner");
        carouselWrapper.innerHTML = ""; 

        // Populate carousel with the next 3 images
        for (let i = currentIndex; i < currentIndex + 3 && i < result.length; i++) {
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
                    container.classList.add("carousel-card", "flexbox", "flex-column", "align-center");

                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.alt = imageAlt;

                    const titleElement = document.createElement("p");
                    titleElement.innerHTML = title;

                    container.appendChild(imgElement);
                    container.appendChild(titleElement);
                    anchor.appendChild(container)
                    carouselWrapper.appendChild(anchor);
                }
            }
        }
    } catch (error) {
        console.error('Error updating carousel:', error);
        errorMessage.textContent = "There was an issue updating the content. Please try again later.";
    }
    finally {
        loader.classList.add("hidden"); 
    }
}



// Function to handle click on left arrow
function prevSlide(result) {
    if (currentIndex > 0) {
        currentIndex -= 3;
    } else {
        currentIndex = result.length - 3; // Wrap around to the end
    }
    updateCarousel(result);
}

// Function to handle click on right arrow
function nextSlide(result) {
    if (currentIndex < result.length - 3) {
        currentIndex += 3;
    } else {
        currentIndex = 0; // Wrap around to the beginning
    }
    updateCarousel(result);
}

// I've added an EventListener to make sure that the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Wait for apiCall to complete before proceeding
        const result = await apiCall();

        // Event listeners for arrow clicks
        const arrowLeft = document.querySelector(".arrow-left");
        const arrowRight = document.querySelector(".arrow-right");
        arrowLeft.addEventListener("click", () => prevSlide(result));
        arrowRight.addEventListener("click", () => nextSlide(result));

        // Initial load of carousel
        updateCarousel(result);

    } catch (error) {
        console.error('error in API-call:', error);
        errorMessage.textContent = "We're having trouble loading the post. Please check your connection and try again.";
        
    }
});

async function apiCall() {
    loader.classList.remove("hidden");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('Feil ved henting:', error);
        errorMessage.textContent = "We're having trouble loading the post. Please check your connection and try again.";
        throw error;
    }
    finally {
        loader.classList.add("hidden"); 
    }
}







