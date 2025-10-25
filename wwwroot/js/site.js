document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function () {
            // Check if form is valid on the client-side before showing loader
            if (form.checkValidity()) {
                const formContainer = document.getElementById('form-container');
                const loaderContainer = document.getElementById('loader-container');

                if (formContainer && loaderContainer) {
                    formContainer.classList.add('hidden');
                    loaderContainer.classList.remove('hidden');
                    startLoaderMessages();
                }
            }
        });
    }
});

function startLoaderMessages() {
    const messages = [
        "Weaving the threads of time...",
        "Reuniting your past and present...",
        "Crafting your nostalgic moment...",
        "Painting your memory with AI...",
        "Asking the past to hug the present...",
    ];
    let currentIndex = 0;
    const messageElement = document.getElementById('loader-message');

    if (messageElement) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            messageElement.textContent = messages[currentIndex];
        }, 3000);
    }
}
