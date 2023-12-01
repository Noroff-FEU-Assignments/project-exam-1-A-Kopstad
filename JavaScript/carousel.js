const cors = "https://noroffcors.onrender.com/";
const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed&per_page=100";
const url = cors + endpoint;

// Global currentIndex declaration
let currentIndex = 0;

// Function to update the carousel based on the current index
function updateCarousel(result) {
    const carouselWrapper = document.querySelector(".carousel-inner");
    carouselWrapper.innerHTML = ""; // Clear the existing content

    // Function to handle navigation to blog page
    function navigateToBlogPage(postId) {
        const blogPageUrl = `https://thebookwormclub.netlify.app/html/blogpost/?id=${postId}`; 
        window.location.href = blogPageUrl;
    }

    // Populate carousel with the next 4 images
    for (let i = currentIndex; i < currentIndex + 3; i++) {
        const item = result[i];
        if (item) {
            // Extract title
            const title = item.title.rendered;

            const parser = new DOMParser();
            const doc = parser.parseFromString(item.content.rendered, "text/html");
            const image = doc.querySelector("img");
            const imageUrl = image ? image.src : "";
            const imageAlt = image ? image.alt : "";

            if (imageUrl) {
                // Create a container for the image and title
                const container = document.createElement("div");
                container.classList.add("latest-card", "flexbox");

                // Create an image element
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.alt = imageAlt;

                // Create a title element
                const titleElement = document.createElement("p");
                titleElement.innerHTML = title;

                // Add click event listener to the container
                container.addEventListener("click", () => navigateToBlogPage(item.id)); // Assuming "id" is the post ID

                // Append image and title to the container
                container.appendChild(imgElement);
                container.appendChild(titleElement);

                // Add the container to the carousel
                carouselWrapper.appendChild(container);
            }
        }
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
        console.error('Feil i API-kall:', error);
        // Handle the error as needed
    }
});

async function apiCall() {
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
        // Handle the error as needed
    }
}
