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
            } else if (index >= items.length) {
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

        setInterval(nextSlide, 2000); // Change de slide toutes les 5 secondes (ajustez selon vos besoins)


//input dynamique

const productContainer = document.querySelector('#productContainer');
const dynamiqueInput = document.querySelector('.dynamiqueInput');
function cloneInput() {
    const newDynamiqueInput = dynamiqueInput.cloneNode(true);
    productContainer.appendChild(newDynamiqueInput);
}









