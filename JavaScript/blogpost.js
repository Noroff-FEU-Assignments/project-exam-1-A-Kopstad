const cors = "https://noroffcors.onrender.com/";

// Extract product ID from the URL
const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get("id");

//Error message
const errorMessage = document.querySelector(".error-message");

//Declaring loader
const loader = document.querySelector(".loader");

async function fetchBlogPost() {
  // Construct the URL inside the function
  const endpoint = `https://bookworms.websolutionscore.com/wp-json/wp/v2/posts/${productId}?_embed`;
  const url = cors + endpoint;

  loader.classList.remove("hidden");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    errorMessage.textContent = "Oops! We're having trouble loading the post. Please check your connection and try again.";
    throw error;
  }
  finally {
    loader.classList.add("hidden"); 
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

        //create beginning of HTML it doesn't close so content under can be added (top left side of the layout)
        let innerHTML = `
            <div class="heading flexbox">
                <div class="heading-text flex-column flexbox">
                    <h1>${displayPost.title.rendered}</h1>
                    <p>Last update: ${displayPost.modified}</p>
                    <p>${preText}</p>
                </div>
        `;
        //check if img is present and if so it appends the img
        if (image) {
            const imageUrl = image.src;
            const imageAlt = image.alt;
            innerHTML += `<img src="${imageUrl}" alt="${imageAlt}" class="blog-image" />`;
        }
        //add article and text (under the two other innerHTML above) this is for layout and semantically html
        innerHTML += `<article class="blogpost-article flexbox">
                        <div class="blog-text flex-column flexbox">`;
        //make a div (storu-event) around every p from the String.(inside the article and blog-text div)
        paragraphs.forEach(paragraph => {
            innerHTML += `
                <div class="story-event">
                    <p>${paragraph.textContent}</p>
                </div>
            `;
        });
        //close tags
        innerHTML += `    </div>
                        </article>
                    </div>`;

        const blogPostElement = document.createElement("div");
        blogPostElement.innerHTML = innerHTML;
        blogPost.appendChild(blogPostElement);

        // Attaching click event listener to the image
        const blogImage = blogPostElement.querySelector('.blog-image');
        if (blogImage) {
            blogImage.addEventListener('click', function() {
                document.getElementById('img01').src = this.src;
                document.getElementById('myModal').style.display = 'block';
                document.getElementById('caption').textContent = this.alt;
            });
        }
             //This function set the makes the first letter the string to uppercase, and the rest to lowercase. it will also change the title to the titleId of the post.
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
      document.title = `The Bookworm Club | ${capitalizeFirstLetter(
        displayPost.title.rendered
      )}`;
    } catch (error) {
        console.error("Error displaying post:", error);
        errorMessage.textContent =
      "There was a problem displaying the blog post. Please try again later.";
    }
}

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
});

document.getElementById("myModal").addEventListener("click", function(event) {
  if (event.target == this) {
      this.style.display = "none";
  }
});

fetchBlogPost()
    .then(displayBlogPost)
    .catch(error => console.error("Failed to fetch and display post:", error));