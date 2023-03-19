// Slideshow/Carousel
const slideShow = document.querySelectorAll('section');

const prevSlide = document.querySelector('.prevSlide');
const nextSlide = document.querySelector('.nextSlide');

slideShow.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

let currentSlide = 0;
let lastSlide = slideShow.length - 1;

prevSlide.addEventListener('click', function () {
    if (currentSlide != 0) {
        currentSlide--;
    }

    slideShow.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = '.3s';
    })
})

nextSlide.addEventListener('click', function () {
    if (currentSlide != lastSlide) {
        currentSlide++;
    }

    slideShow.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = '.3s';
    })
})


// Project modal popups
const projectButton = document.querySelectorAll('.projectButton');
const projectModal = document.querySelectorAll('.projectModal');

projectButton.forEach(button => {
    button.addEventListener('click', (e) => {
        const index = Array.from(projectButton).indexOf(e.target);
        projectModal.forEach(modal => {
                modal.classList.add('modalHidden');
        })
        const targetModal = projectModal[index];
        targetModal.classList.toggle('modalHidden');
    })
});

// The forEach loop adds the display none proeprty on each modal.
// Then the targetModal toggle removes the display property from the corresponding modal.
// I want a conditional that prevents the specified modal from having its displaly none property removed if its already opened.