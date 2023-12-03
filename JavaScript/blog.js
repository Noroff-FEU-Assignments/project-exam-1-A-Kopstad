//-----Global
const cors = "https://noroffcors.onrender.com/";
const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed&per_page=100";
const url = cors + endpoint;

const retrievedArchive = document.querySelector(".collection");
const loadMoreButton = document.querySelector(".load");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");


let currentIndex = 0;
const itemsPerPage = 10;

// Add a click event listener to the button
loadMoreButton.addEventListener("click", () => {
    apiCall(itemsPerPage);
  });
  console.log(loadMoreButton)

//function to fetch the url
async function apiCall(itemsToFetch) {
  loader.classList.remove("hidden");
  
  try {
    const response = await fetch(url, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    const innerWrapper = document.createElement("div");
    innerWrapper.classList.add("collection-inner", "flexbox");

    // Loop through the specified number of items or until the end of the array
    for (let i = currentIndex; i < currentIndex + itemsToFetch && i < result.length; i++) {
      const blogLoop = result[i];
      console.log('Iteration:', i, 'Current Index:', currentIndex, 'Items to Fetch:', itemsToFetch);

      const blogCard = document.createElement('div');
      blogCard.classList.add("archive-post", "flexbox", "flex-column", "align-center", "border-green");

      const parser = new DOMParser();
      const doc = parser.parseFromString(blogLoop.content.rendered, "text/html");
      const image = doc.querySelector("img");
      const imageUrl = image ? image.src : "";
      const imageAlt = image ? image.alt : "";

      blogCard.innerHTML = `
        <a href="/HTML/blogpost.html?id=${blogLoop.id}"><img src="${imageUrl}" alt="${imageAlt}"/></a>
        <a href="/HTML/blogpost.html?id=${blogLoop.id}"><p>${blogLoop.title.rendered}</p></a>
      `;

      innerWrapper.appendChild(blogCard);
    }

    retrievedArchive.appendChild(innerWrapper);

    
    currentIndex += itemsToFetch;

    // Show/hide the "Load More" button based on remaining items
    loadMoreButton.style.display = currentIndex < result.length ? "block" : "none";

  } catch (error) {
    console.error("Fetch error:", error);
    errorMessage.textContent =
      " We're having trouble loading the content right now. Please check your internet connection, refresh the page, or try again later. "; 
    loadMoreButton.style.display = "none"; 
  }
  finally {
    loader.classList.add("hidden"); 
}
}

// call to loade the first set of posts.
apiCall(itemsPerPage);