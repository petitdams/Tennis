// MON MENU BURGER

function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}


// slider
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
let currentIndex = 0;

function goToSlide(index) {
    if (index < 0) {
        index = items.length - 1;
    }
    else if (index >= items.length) {
        index = 0;
    }
    track.style.transform = `translateX(-${index * (100 / items.length )}%)`;
    currentIndex = index;
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

setInterval(nextSlide, 2000); 


//input dynamique

const productContainer = document.querySelector('#productContainer');
const dynamiqueInput = document.querySelector('.dynamiqueInput');

function cloneInput() {
    const newDynamiqueInput = dynamiqueInput.cloneNode(true);
    productContainer.appendChild(newDynamiqueInput);
}


// FETCH

document.addEventListener('DOMContentLoaded', () => {
    const userListDeleteButton = document.querySelector('.delete-button');
    if (userListDeleteButton) {
        userListDeleteButton.addEventListener('click', (event) => {
            const userToDeleteCheckboxes = document.querySelectorAll('.js-user-to-delete:checked');

            const idsToDelete = Array.from(userToDeleteCheckboxes).map((elt) => elt.value);

            fetch('/user/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userToDelete: idsToDelete
                    })
                })
                .then(() => {
                    idsToDelete.forEach((id) => {
                        const elt = document.querySelector(`[data-id="${id}"]`);
                        if (elt) {
                            elt.remove();
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

});


//NAVBAR
document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.pathname;
    const activeLink = document.querySelector(`.nav-link[href="${currentUrl}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});
