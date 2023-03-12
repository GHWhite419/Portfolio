const slideShow = document.querySelectorAll('section');

const prevSlide = document.querySelector('.prevSlide');
const nextSlide = document.querySelector('.nextSlide');

slideShow.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

let currentSlide = 0;
let lastSlide = slideShow.length - 1;