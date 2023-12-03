document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('contactForm').addEventListener('submit', validateForm);
});

function validateForm(event) {
    event.preventDefault();
    var isValid = true;

    // Name validation
    var name = document.getElementById('name').value;
    if (name.length <= 5) {
        document.getElementById('name-error').innerText = 'Name must be more than 5 characters';
        isValid = false;
    } else {
        document.getElementById('name-error').innerText = '';
    }

    // Email validation
    var email = document.getElementById('email').value;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').innerText = 'Invalid email address';
        isValid = false;
    } else {
        document.getElementById('email-error').innerText = '';
    }

    // Subject validation
    var subject = document.getElementById('subject').value;
    if (subject.length <= 15) {
        document.getElementById('subject-error').innerText = 'Subject must be more than 15 characters';
        isValid = false;
    } else {
        document.getElementById('subject-error').innerText = '';
    }

    // Message content validation
    var content = document.getElementById('content').value;
    if (content.length <= 25) {
        document.getElementById('content-error').innerText = 'Message content must be more than 25 characters';
        isValid = false;
    } else {
        document.getElementById('content-error').innerText = '';
    }


    if (isValid) {
        // this cleare the fields after submitting is succesfully submitted
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('content').value = '';

       
        var submissionMessage = document.getElementById('submission-message');
        submissionMessage.innerText = 'Thank you for connecting with The Bookworm Club - your message matters to us!';
        submissionMessage.style.display = 'block';

        // will hide the succesfull submitted text after a delay
        setTimeout(function() {
            submissionMessage.style.display = 'none';
        }, 8000); 

        
    }
}