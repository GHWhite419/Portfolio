// Slideshow/Carousel
const slideShow = document.querySelectorAll('section');

const prevSlide = document.querySelector('.prevSlide i');
const nextSlide = document.querySelector('.nextSlide i');

slideShow.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

let currentSlide = 0;
let lastSlide = slideShow.length - 1;

const disableButton = () => {
    if (currentSlide === 0) {
        prevSlide.classList.add('sliderDisable');
    }
    else if (currentSlide === lastSlide) {
        nextSlide.classList.add('sliderDisable');
    }
    else {
        prevSlide.classList.remove('sliderDisable');
        nextSlide.classList.remove('sliderDisable');
    }
}
disableButton();

prevSlide.addEventListener('click', function () {
    if (currentSlide != 0) {
        currentSlide--;
        openMenu.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        linkedIn.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        gitHub.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        prevSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        nextSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
    }

    slideShow.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = '.3s';
    })
    slideColor();
    disableButton();
})

nextSlide.addEventListener('click', function () {
    if (currentSlide != lastSlide) {
        currentSlide++;
        openMenu.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        linkedIn.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        gitHub.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        prevSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        nextSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
    }

    slideShow.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = '.3s';
    })
    slideColor();
    disableButton();
})


// Project modal popups
const projectButton = document.querySelectorAll('.projectButton');
const projectModal = document.querySelectorAll('.projectModal');
const closeModal = document.querySelectorAll('.closeModal');

projectButton.forEach(button => {
    button.addEventListener('click', (e) => {
        const index = Array.from(projectButton).indexOf(e.target);
        const targetModal = projectModal[index];
        targetModal.classList.toggle('modalHidden');
        projectModal.forEach(modal => {
            if (modal != targetModal) {
                modal.classList.add('modalHidden');
            }
        })
    })
});

closeModal.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        const targetModal = closeButton.parentElement;
        targetModal.classList.add('modalHidden');
    })
})


// Nav menu
const openMenu = document.querySelector('.openMenu');
const closeMenu = document.querySelector('.closeMenu');
const navMenu = document.querySelector('.navMenu');
openMenu.addEventListener('click', () => {
    navMenu.classList.add('navOpen');
})
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('navOpen');
})

const links = document.querySelectorAll('.navMenu li');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        const index = Array.from(links).indexOf(e.target);
        currentSlide = index + 1;
        navMenu.classList.remove('navOpen');
        openMenu.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        linkedIn.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        gitHub.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        prevSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        nextSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        slideShow.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            slide.style.transition = '.3s';
        })
        slideColor();
        disableButton();
    })
})

// Dynamic hover styles
const linkedIn = document.querySelector('footer .fa-linkedin');
const gitHub = document.querySelector('footer .fa-github');
const slideColor = () => {
    switch (currentSlide) {
        case 0:
            openMenu.classList.add('introColor');
            linkedIn.classList.add('introColor');
            gitHub.classList.add('introColor');
            prevSlide.classList.add('introColor');
            nextSlide.classList.add('introColor');

            break;
        case 1:
            openMenu.classList.add('aboutColor');
            linkedIn.classList.add('aboutColor');
            gitHub.classList.add('aboutColor');
            prevSlide.classList.add('aboutColor');
            nextSlide.classList.add('aboutColor');

            break;
        case 2:
            openMenu.classList.add('projectsColor');
            linkedIn.classList.add('projectsColor');
            gitHub.classList.add('projectsColor');
            prevSlide.classList.add('projectsColor');
            nextSlide.classList.add('projectsColor');

            break;
        case 3:
            openMenu.classList.add('contactColor');
            linkedIn.classList.add('contactColor');
            gitHub.classList.add('contactColor');
            prevSlide.classList.add('contactColor');
            nextSlide.classList.add('contactColor');

            break;
    }
}
slideColor();


// Clear email form
window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}