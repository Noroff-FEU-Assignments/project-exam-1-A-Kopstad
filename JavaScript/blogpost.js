const cors = "https://noroffcors.onrender.com/";

// Extract product ID from the URL
const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get("id");

async function fetchBlogPost() {
  // Construct the URL inside the function
  const endpoint = `https://bookworms.websolutionscore.com/wp-json/wp/v2/posts/${productId}?_embed`;
  const url = cors + endpoint;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
}

function displayBlogPost(displayPost) {
    try {
        const blogPost = document.querySelector(".grid-column-1");
        const parser = new DOMParser();
        const doc = parser.parseFromString(displayPost.content.rendered, "text/html");
        const image = doc.querySelector("img");
        const pre = doc.querySelector("pre");
        const preText = pre ? pre.textContent : "";
        const paragraphs = doc.querySelectorAll("p");

        const imageUrl = image ? image.src : "";
        const imageAlt = image ? image.alt : "";

        const blogPostElement = document.createElement("div");

        // Start constructing the inner HTML
        let innerHTML = `
            <div class="heading flexbox">
                <div class="heading-text flexbox">
                    <h1>${displayPost.title.rendered}</h1>
                    <p>Last update: ${displayPost.modified}
                    <p>${preText}</p>
                </div>
                <img src="${imageUrl}" alt="${imageAlt}" />
                <article class="blogpost-article flexbox">
                    <div class="blog-text flexbox">
        `;

        // Wrap each paragraph in a story-event div and add to the inner HTML
        paragraphs.forEach(paragraph => {
            innerHTML += `
                <div class="story-event">
                    <p>${paragraph.textContent}</p>
                </div>
            `;
        });

        // Close the tags
        innerHTML += `
                    </div>
                </article>
            </div>
        `;

        // Set the inner HTML to the blog post element
        blogPostElement.innerHTML = innerHTML;
        blogPost.appendChild(blogPostElement);

    } catch (error) {
        console.error("Error displaying post:", error);
    }
}

  

fetchBlogPost()
  .then((displayPost) => displayBlogPost(displayPost))
  .catch((error) => console.error("Failed to fetch and display post:", error));