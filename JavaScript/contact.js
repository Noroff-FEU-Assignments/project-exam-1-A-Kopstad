function displayErrorMessages(messages) {
    const errorMessagesContainer = document.getElementById("errorMessages");
    errorMessagesContainer.innerHTML = "";

    if (messages.length > 0) {
        const ul = document.createElement("ul");

        messages.forEach(message => {
            const li = document.createElement("li");
            li.textContent = message;
            ul.appendChild(li);
        });

        errorMessagesContainer.appendChild(ul);
    }
}

function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const errorMessages = [];

    if (name.length <= 5) {
        errorMessages.push("Name should be more than 5 characters long.");
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessages.push("Please enter a valid email address.");
    }

    if (subject.length <= 15) {
        errorMessages.push("Subject should be more than 15 characters long.");
    }

    if (message.length <= 25) {
        errorMessages.push("Message content should be more than 25 characters long.");
    }

    displayErrorMessages(errorMessages);
}
