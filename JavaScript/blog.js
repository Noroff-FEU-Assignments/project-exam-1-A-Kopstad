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

    // Update the current index for the next batch
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

// Initial call to load the first set of items
apiCall(itemsPerPage);








// const cors = "https://noroffcors.onrender.com/";
// const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
// const url = cors + endpoint;

// const retrievedArchive = document.querySelector(".collection");

// async function apiCall() {
//     try {
//         const response = await fetch(url, {
//             method: 'GET'
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();

//         // Create the wrapper div for the first four cards
//         const firstTwoWrapper = document.createElement("div");
//         firstTwoWrapper.classList.add("row1","flexbox");

//         const secondTwoWrapper = document.createElement("div");
//         secondTwoWrapper.classList.add("row2","flexbox");

//         // Create the wrapper div for the last card
//         const lastCardWrapper = document.createElement("div");
//         lastCardWrapper.classList.add("row3","flexbox");

//         for (let i = 0; i < result.length; i++) {
//             const blogLoop = result[i];
//             console.log(blogLoop);

//             const blogCard = document.createElement('div');
//             blogCard.classList.add("archive-post","flexbox","column","align-center","border-green");

//             const parser = new DOMParser();
//             const doc = parser.parseFromString(blogLoop.content.rendered, "text/html");
//             const image = doc.querySelector("img");
//             const imageUrl = image ? image.src : "";
//             const imageAlt = image ? image.alt : "";

//             blogCard.innerHTML = `
//                 <a href="/HTML/blogpost.html?id=${blogLoop.id}"><img src="${imageUrl}" alt="${imageAlt}"/></a>
//                 <a href="/HTML/blogpost.html?id=${blogLoop.id}"><p>${blogLoop.title.rendered}</p></a>
//             `;


//             // Append the first two cards to the firstTwoWrapper
//             if (i < 2) {
//                 firstTwoWrapper.appendChild(blogCard);
//             } else if (i < 4) {
//                 secondTwoWrapper.appendChild(blogCard);
//             } else if (i === 4) {
//                 lastCardWrapper.appendChild(blogCard);
//                 blogCard.classList.add("cocoa");
//         }
//         }

//         // Append the firstFourWrapper to the container
//         retrievedArchive.appendChild(firstTwoWrapper);
//         retrievedArchive.appendChild(secondTwoWrapper);
//         // Append the lastCardWrapper to the container
//         retrievedArchive.appendChild(lastCardWrapper);

//     } catch (error) {
//         console.error('Fetch error:', error);
//         retrievedArchive.innerHTML = "An error has occurred";
//     }
// }

// apiCall();






