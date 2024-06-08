// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the fade-in effect
function handleScroll() {
    // Select both skills and projects sections
    const sections = document.querySelectorAll('#skills .fadein, #projects .fadein');
    
    // Apply the fade-in effect to each section's items
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.querySelectorAll('.skill-item, .project-item').forEach(item => {
                item.classList.add('visible');
            });
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Trigger the function once to check the initial position of elements
handleScroll();


//Send Message
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var form = event.target;
    var formData = new FormData(form);

    // Show a loading message or spinner (optional)
    var responseElement = document.getElementById('form-response');
    responseElement.innerText = "Sending your message...";
    responseElement.style.color = "blue";

    // Use Fetch API to send form data to Formspree
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        if (response.ok) {
            responseElement.innerText = "Thank you for your message!";
            responseElement.style.color = "green";
            form.reset(); // Reset form fields
        } else {
            responseElement.innerText = "Oops! There was a problem sending your message.";
            responseElement.style.color = "red";
        }
    }).catch(function(error) {
        responseElement.innerText = "Oops! There was a problem sending your message.";
        responseElement.style.color = "red";
    });
});
