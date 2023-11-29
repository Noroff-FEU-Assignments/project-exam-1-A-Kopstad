    const cors = "https://noroffcors.onrender.com/";
    const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
    const url = cors + endpoint;
    
    async function apiCall() {
        try {
            const response = await fetch(url, {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
    
        } catch (error) {
            console.error('Fetch error:', error);
            newIn.innerHTML = "An error has occurred";
        }
    }
    
    apiCall();



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



