const cors = "https://noroffcors.onrender.com/";
const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
const url = cors + endpoint;

const retrievedCarousel= document.querySelector(".collection");

async function apiCall() {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(url)

        retrievedCarousel.innerHTML = "";

        for (let i = 0; i < result.length; i++) {
            if (i === 5) {
                break;
            }
            
            const carouselLoop = result[i];

            const carouselCard = document.createElement ('div')

            carouselCard.classList.add('carousel-card')

            carouselCard.dataset.productId = carouselCard.id;

            const parser = new DOMParser ()
            const doc = parser.parseFromString(carouselLoop.content.rendered, "text/html");
            const image = doc.querySelector("img");
            const imageUrl = image ? image.src : "";
            const imageAlt = image ? image.alt : "";
            
            carouselCard.innerHTML = `
                <img src="${imageUrl}" alt="${imageAlt}"/>
                <a href="HTML/blogpost.html"><p>${carouselLoop.title.rendered}</p></a>
            `
            retrievedCarousel.appendChild(carouselCard)
        }
    } catch (error) {
        console.error('Fetch error:', error);
        retrievedCarousel.innerHTML = "An error has occurred";
    }
}

apiCall();

