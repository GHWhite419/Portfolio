const slideShow = document.querySelectorAll('section');
console.log(slideShow);

const prevSlide = document.querySelector('.prevSlide');
const nextSlide = document.querySelector('.nextSlide');

slideShow.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

let currentSlide = 0;
let lastSlide = slideShow.length - 1;

prevSlide.addEventListener('click', function(){
    if (currentSlide != 0) {
        currentSlide--;
    }
    console.log(currentSlide);

    slideShow.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = '.3s';
    })
})

nextSlide.addEventListener('click', function(){
    if (currentSlide != lastSlide) {
        currentSlide++;
    }
    
    slideShow.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = '.3s';
    })
})