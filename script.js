// ** Slideshow/Carousel
// The following variables initially select the 4 big sections themselves, as well as the buttons which will be used to navigate between them.
const slideShow = document.querySelectorAll('section');

const prevSlide = document.querySelector('.prevSlide i');
const nextSlide = document.querySelector('.nextSlide i');

// This loop positions the 4 sections side-by-side horizontally, with all but the active slide pushed off screen. The style.transform method uses the "index" argument to position eaah element appropriately, displaying the "intro" section as the first one by default. 
slideShow.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

// This code block prevents the user from sliding outside of the border sections of the slideshow (ie, before first slide and after last slide).
// First I declare currentSlide as 0, simply to initialize this process. I also declare lastSlide as the fourth section using slideShow's length so that I have a clearly defined boundary.
let currentSlide = 0;
let lastSlide = slideShow.length - 1;

// Lastly, this function adds a "sliderDisable" class to the navigation buttons if our current slide is either the first or last section. This class dulls out the colors to indicate their status as being un-usable (I will need to tweak its accessibility features so it's not selectable at all). 
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
// After defining this function, I simply need to initialize it with this line below so that it disables the "previous" button when we start on the first button.
disableButton();

// Now I will add event listeners to the two navigation buttons, both of which activate when clicked. I begin with "previous".
prevSlide.addEventListener('click', function () {
    // The if gate ensures that the function only performs when the user is not on the first slide. Between the function's inactivity and the "previous" button being greyed out, this creates the user-experience of the button being "disabled" so they cannot navigate backwards to before the first slide.
    if (currentSlide != 0) {
        // This line simply decrements the currentSlide variable, which is called in a function below to shift the slides backwards.
        currentSlide--;
        // The following classList methods here contribute to an effect that ensures all the hover states on the page match the main color of the active slide. For example, blue is used as the primary color on the "Projects" page, therefore, while the user is on the Projects slide, all the hoverable icons should appear blue when hovered over.
        // The way these methods contribute to that effect is to remove the color from each hoverable icon when the slide is changed. A function created later will then re-add colors to the hover states. Note that this code can definitely benefit from some re-factoring.
        openMenu.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        linkedIn.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        gitHub.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        prevSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        nextSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
    }

    // This forEach loop is where the magic happens in the slideshow. We use the style.transform method to target each slide, with currentSlide as mentioned above being used as an argument in the translateX value. Subtracting currentSlide from the index argument tells the loop which slide we want to display as the active slide, which matches up with currentSlide's value.
    // I also add a simple .3s transition for style.
    slideShow.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = '.3s';
    })
    // Completing the effect, I re-declare slideColor (detailed below) to re-color the hoverable buttons, and disableButton to check if the "previous" button should be disabled.
    slideColor();
    disableButton();
})

// The "next" button is the same exact principle, naturally with some slight alterations.
nextSlide.addEventListener('click', function () {
    // Differing from the "previous" button's if gate, here we check to ensure that we're not on the last slide so that the code can run. Otherwise, the "next" button shouldn't run its function.
    if (currentSlide != lastSlide) {
        // Instead of decrementing currentSlide, we increment it so that all slides move forward.
        currentSlide++;

        // The entire rest of the codeblock is identical to what's described in the "previous" button event listener.
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


// ** Project modal popups
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


// ** Nav menu
// The following three variables select the three main elements of the hamburger menu: the open button, the close button, and the menu itself.
const openMenu = document.querySelector('.openMenu');
const closeMenu = document.querySelector('.closeMenu');
const navMenu = document.querySelector('.navMenu');

// This adds an event to the open button which simply adds a class to the nav menu.
openMenu.addEventListener('click', () => {
    navMenu.classList.add('navOpen');
})

// This event listener removes that same class from the nav menu.
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('navOpen');
})

// Here we have an HTML Collection for all of the links inside of the nav menu.
const links = document.querySelectorAll('.navMenu li');

// Here I start off by adding an event listener to each link in the nav menu, doing so using a forEach loop.
links.forEach(link => {
    link.addEventListener('click', (e) => {
        // Here I need to create a variable which matches the index of the links collection with that of the targeted link.
        const index = Array.from(links).indexOf(e.target);
        // Once the indexes are matched up, I then further match the currentSlide variable with the value of the index variable, enabling me to reference it in my below function and easily switch to the appropriate slide based on the target link. 
        currentSlide = index + 1;
        // Now that a slide is targeted and the appropraite variables are correctly adjusted, I remove the navOpen class from the nav menu which causes it to close. I also remove all of the colors from the hoverable elements so that they can be changed to match the new slide.
        navMenu.classList.remove('navOpen');
        openMenu.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        linkedIn.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        gitHub.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        prevSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        nextSlide.classList.remove('introColor', 'aboutColor', 'projectsColor', 'contactColor');
        // Then, it's as simple as triggering the same slideshow loop using the targeted index and currentSlide variables.
        slideShow.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            slide.style.transition = '.3s';
        })
        // And finally I finish by triggering the slideColor and disableButton functions for the appropriate stylings.
        slideColor();
        disableButton();
    })
})

// ** Dynamic hover styles
// I begin by selecting the LinkedIn and Github icons in the footer and saving them to new variables, as they are the only hoverable elements that have not been targeted in the DOM yet.
const linkedIn = document.querySelector('footer .fa-linkedin');
const gitHub = document.querySelector('footer .fa-github');
// This function uses the switch statement (my first time experimenting with it, fun stuff!). Each case in the statement references the value of currentSlide to select the appropraite color to apply to the hoverable icons. Each case adds the colors to the hoverable states using predefined SASS classes. Since the work of removing the color classes is done first every time we change slides, all we're doing here in this switch statement is adding new colors back to the needed elements.
const slideColor = () => {
    switch (currentSlide) {
        case 0:
            // Case 0 = the Intro slide, where we use a bright red.
            openMenu.classList.add('introColor');
            linkedIn.classList.add('introColor');
            gitHub.classList.add('introColor');
            prevSlide.classList.add('introColor');
            nextSlide.classList.add('introColor');

            break;
        case 1:
            // Case 1 is my about page, using a darker purple.
            openMenu.classList.add('aboutColor');
            linkedIn.classList.add('aboutColor');
            gitHub.classList.add('aboutColor');
            prevSlide.classList.add('aboutColor');
            nextSlide.classList.add('aboutColor');

            break;
        case 2:
            // Case 2 features my projects, with a baby blue color scheme.
            openMenu.classList.add('projectsColor');
            linkedIn.classList.add('projectsColor');
            gitHub.classList.add('projectsColor');
            prevSlide.classList.add('projectsColor');
            nextSlide.classList.add('projectsColor');

            break;
        case 3:
            // And case 3 is my contact page, utilizing an emerald green.
            openMenu.classList.add('contactColor');
            linkedIn.classList.add('contactColor');
            gitHub.classList.add('contactColor');
            prevSlide.classList.add('contactColor');
            nextSlide.classList.add('contactColor');

            break;
    }
}
// After creating the feature, I call it once to initialize it so we have some hover colors as soon as the user loads the page. It then correctly changes every time the user navigates between slides :)
slideColor();


// ** Clear email form
// This is code pre-written by formspree that ensures the email form is empty when a user reloads the webpage.
window.onbeforeunload = () => {
    // The form loop targets every field of the contact form, while the reset method clears it. Straightforward stuff :D
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}