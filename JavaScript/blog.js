const cors = "https://noroffcors.onrender.com/";
const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
const url = cors + endpoint;

const retrievedArchive = document.querySelector(".collection");

async function apiCall() {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Create the wrapper div for the first four cards
        const firstTwoWrapper = document.createElement('div');
        firstTwoWrapper.classList.add('row1',"flexbox");

        const secondTwoWrapper = document.createElement('div');
        secondTwoWrapper.classList.add("row2","flexbox");

        // Create the wrapper div for the last card
        const lastCardWrapper = document.createElement('div');
        lastCardWrapper.classList.add("row3","flexbox");

        for (let i = 0; i < result.length; i++) {
            const blogLoop = result[i];

            const blogCard = document.createElement('div');
            blogCard.classList.add("archive-post","flexbox","column","align-center","border-green");

            const parser = new DOMParser();
            const doc = parser.parseFromString(blogLoop.content.rendered, "text/html");
            const image = doc.querySelector("img");
            const imageUrl = image ? image.src : "";
            const imageAlt = image ? image.alt : "";

            blogCard.innerHTML = `
                <img src="${imageUrl}" alt="${imageAlt}"/>
                <a href="HTML/blogpost.html?id=${blogLoop.id}"><p>${blogLoop.title.rendered}</p></a>
            `;


            // Append the first two cards to the firstTwoWrapper
            if (i < 2) {
                firstTwoWrapper.appendChild(blogCard);
            } else if (i < 4) {
                secondTwoWrapper.appendChild(blogCard);
            } else if (i === 4) {
                lastCardWrapper.appendChild(blogCard);
                blogCard.classList.add("cocoa");
        }
        }

        // Append the firstFourWrapper to the container
        retrievedArchive.appendChild(firstTwoWrapper);
        retrievedArchive.appendChild(secondTwoWrapper);
        // Append the lastCardWrapper to the container
        retrievedArchive.appendChild(lastCardWrapper);

    } catch (error) {
        console.error('Fetch error:', error);
        retrievedArchive.innerHTML = "An error has occurred";
    }
}

apiCall();
