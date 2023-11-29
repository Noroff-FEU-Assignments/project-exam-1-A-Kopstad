
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



