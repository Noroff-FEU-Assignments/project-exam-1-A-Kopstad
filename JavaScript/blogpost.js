const cors = "https://noroffcors.onrender.com/";
const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts/${postId}?_embed";
const url = cors + endpoint;

const blogPost = document.querySelector(".grid-column-1");

// Extract product ID from the URL
const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get("id");

async function fetchBlogPost() {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        const blogContent= document.createElement ("div");
        blogContent.classList.add ("blog-content","flexbox");

        

        blogContent.innerHTML= `
            <div class="heading flexbox">
                <div class="heading-text flexbox">
                    ${title.rendered}
                    <p>Reflecting on the magic: A quarter-century of Twilight enchantment</p>
                    <p>Last updated: Nov 4, 2023</p>
                </div>
                <img src="${imageUrl}" alt="${imageAlt}" />
                <article class="blogpost-article flexbox">
                <div class="blog-text flexbox">
                    ${contentHtml}
                </div>
            </div>
        `
    }
    catch {

    }
}

fetchBlogPost();


//         blogPost.innerHTML = "";

//         const blogContent = document.createElement("div");
//         blogContent.classList.add("blog-content");
//         blogContent.dataset.productId = result.id;


//         const parser = new DOMParser();
//         const doc = parser.parseFromString(result.content.rendered, "text/html");

//         // Get image information
//         const image = doc.querySelector("img");
//         const imageUrl = image ? image.src : "";
//         const imageAlt = image ? image.alt : "";

//         // Get title

//         blogContent.innerHTML = `
//             <div class="heading flexbox">
//                 <div class="heading-text flexbox">
//                     ${title.rendered}
//                     <p>Reflecting on the magic: A quarter-century of Twilight enchantment</p>
//                     <p>Last updated: Nov 4, 2023</p>
//                 </div>
//                 <img src="${imageUrl}" alt="${imageAlt}" />
//                 <article class="blogpost-article flexbox">
//                 <div class="blog-text flexbox">
//                     ${contentHtml}
//                 </div>
//             </div>
//                 `;

//                 blogPost.appendChild(blogContent)

//     }
//      catch (error) {
//         console.error('Fetch error:', error);
//         blogPost.innerHTML = "An error has occurred";
//     }

// fetchBlogPost()
// }