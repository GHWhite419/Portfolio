// ** Slideshow/Carousel
// The following variables initially select the 4 big sections themselves, as well as the buttons which will be used to navigate between them.
const slideShow = document.querySelectorAll("section");

const prevSlide = document.querySelector(".prevSlide i");
const nextSlide = document.querySelector(".nextSlide i");

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
    prevSlide.classList.add("sliderDisable");
  } else if (currentSlide === lastSlide) {
    nextSlide.classList.add("sliderDisable");
  } else {
    prevSlide.classList.remove("sliderDisable");
    nextSlide.classList.remove("sliderDisable");
  }
};
// After defining this function, I simply need to initialize it with this line below so that it disables the "previous" button when we start on the first button.
disableButton();

// Now I will add event listeners to the two navigation buttons, both of which activate when clicked. I begin with "previous".
prevSlide.addEventListener("click", function () {
  // The if gate ensures that the function only performs when the user is not on the first slide. Between the function's inactivity and the "previous" button being greyed out, this creates the user-experience of the button being "disabled" so they cannot navigate backwards to before the first slide.
  if (currentSlide != 0) {
    // This line simply decrements the currentSlide variable, which is called in a function below to shift the slides backwards.
    currentSlide--;

    // The following removeColor function here contributes to an effect that ensures all the hover states on the page match the main color of the active slide. For example, blue is used as the primary color on the "Projects" page, therefore, while the user is on the Projects slide, all the hoverable icons should appear blue when hovered over.
    // The way this function contributes to that effect is to remove the color from each hoverable icon when the slide is changed. A function created just before it will then re-add colors to the hover states.
    // Below, where the two functions I've just described are defined, you'll find more detailed commentary on how they work.
    removeColor();
  }

  // This forEach loop is where the magic happens in the slideshow. We use the style.transform method to target each slide, with currentSlide as mentioned above being used as an argument in the translateX value. Subtracting currentSlide from the index argument tells the loop which slide we want to display as the active slide, which matches up with currentSlide's value.
  // I also add a simple .3s transition for style.
  slideShow.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    slide.style.transition = ".3s";
  });
  // Completing the effect, I re-declare slideColor (detailed below) to re-color the hoverable buttons, and disableButton to check if the "previous" button should be disabled.
  slideColor();
  disableButton();
});

// The "next" button is the same exact principle, naturally with some slight alterations.
nextSlide.addEventListener("click", function () {
  // Differing from the "previous" button's if gate, here we check to ensure that we're not on the last slide so that the code can run. Otherwise, the "next" button shouldn't run its function.
  if (currentSlide != lastSlide) {
    // Instead of decrementing currentSlide, we increment it so that all slides move forward.
    currentSlide++;

    // The rest of the codeblock is identical to what's described in the "previous" button event listener.
    removeColor();
  }

  slideShow.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    slide.style.transition = ".3s";
  });
  slideColor();
  disableButton();
});

// ** Project modal popups
// For the project modals I begin by saving three HTMLCollections to variables. The first are the buttons to display the modals. Second are the modals themselves containing all relevant project information as well as a button to close the modal. Last is the close buttons.
const projectButton = document.querySelectorAll(".projectButton");
const projectModal = document.querySelectorAll(".projectModal");
const closeModal = document.querySelectorAll(".closeModal");

// After creating the variables, my first step is to loop through each open button with a forEach loop, adding an event listener with each iteration.
projectButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    // The event triggers when the button is pressed. My aim is to remove a "hidden" class from the button's corresponding modal.
    // To ensure the button selects the right modal, I have to turn the projectButton HTMLCollection into an arraay and parse an index.
    const index = Array.from(projectButton).indexOf(e.target);

    // Having converted projectButton into an array and parsed clicked button's index, I can now target its matching project modal using that index. So for example, when I click button 0, modal 0 will display.
    const targetModal = projectModal[index];

    // To display the modal, I remove the modalHidden class from the appropriate element. The modalHidden class adds the "visibility:hidden" property to ensure it is not read by screen readers until it's displayed.
    // The property also allows the element to still take up space, while the "transform:translateX" property also included in the class positions the modal far off-screen. This gives the modal a nice little entrance transition where it slides smoothly in from off-screen.
    targetModal.classList.toggle("modalHidden");

    // This next forEach loop will close any open modals if any of its sibling modals are prompted for display via their open buttons. So for example, if modal 0 is open and I click button 3, modal 0 will close as modal 3 opens.
    projectModal.forEach((modal) => {
      // This effect is as simple as using an if gate with a a bang operator to add the modalHidden class to everything that isn't the targeted modal above.
      if (modal != targetModal) {
        modal.classList.add("modalHidden");
      }
    });
  });
});

closeModal.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const targetModal = closeButton.parentElement;
    targetModal.classList.add("modalHidden");
  });
});

// ** Nav menu
// The following three variables select the three main elements of the hamburger menu: the open button, the close button, and the menu itself.
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const navMenu = document.querySelector(".navMenu");

// This adds an event to the open button which simply adds a class to the nav menu.
openMenu.addEventListener("click", () => {
  navMenu.classList.add("navOpen");
});

// This event listener removes that same class from the nav menu.
closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("navOpen");
});

// Here we have an HTML Collection for all of the links inside of the nav menu.
const links = document.querySelectorAll(".navMenu li");

// Here I start off by adding an event listener to each link in the nav menu, doing so using a forEach loop.
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Here I need to create a variable which matches the index of the links collection with that of the targeted link.
    const index = Array.from(links).indexOf(e.target);
    // Once the indexes are matched up, I then further match the currentSlide variable with the value of the index variable, enabling me to reference it in my below function and easily switch to the appropriate slide based on the target link.
    currentSlide = index + 1;
    // Now that a slide is targeted and the appropraite variables are correctly adjusted, I remove the navOpen class from the nav menu which causes it to close. I also call removeColor so that the hoverable elements can be changed to match the new slide.
    navMenu.classList.remove("navOpen");
    removeColor();
    // Then, it's as simple as triggering the same slideshow loop using the targeted index and currentSlide variables.
    slideShow.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
      slide.style.transition = ".3s";
    });
    // And finally I finish by triggering the slideColor and disableButton functions for the appropriate stylings.
    slideColor();
    disableButton();
  });
});

// ** Dynamic hover styles
// I begin by selecting the LinkedIn and Github icons in the footer and saving them to new variables, as they are the only hoverable elements that have not been targeted in the DOM yet.
const linkedIn = document.querySelector("footer .fa-linkedin");
const gitHub = document.querySelector("footer .fa-github");
// This function uses the switch statement (my first time experimenting with it, fun stuff!). Each case in the statement references the value of currentSlide to select the appropraite color to apply to the hoverable icons. Each case adds the colors to the hoverable states using predefined SASS classes. Since the work of removing the color classes is done first every time we change slides, all we're doing here in this switch statement is adding new colors back to the needed elements.
const slideColor = () => {
  switch (currentSlide) {
    case 0:
      // Case 0 = the Intro slide, where we use a bright red.
      openMenu.classList.add("introColor");
      linkedIn.classList.add("introColor");
      gitHub.classList.add("introColor");
      prevSlide.classList.add("introColor");
      nextSlide.classList.add("introColor");

      break;
    case 1:
      // Case 1 is my about page, using a darker purple.
      openMenu.classList.add("aboutColor");
      linkedIn.classList.add("aboutColor");
      gitHub.classList.add("aboutColor");
      prevSlide.classList.add("aboutColor");
      nextSlide.classList.add("aboutColor");

      break;
    case 2:
      // Case 2 features my projects, with a baby blue color scheme.
      openMenu.classList.add("projectsColor");
      linkedIn.classList.add("projectsColor");
      gitHub.classList.add("projectsColor");
      prevSlide.classList.add("projectsColor");
      nextSlide.classList.add("projectsColor");

      break;
    case 3:
      // And case 3 is my contact page, utilizing an emerald green.
      openMenu.classList.add("contactColor");
      linkedIn.classList.add("contactColor");
      gitHub.classList.add("contactColor");
      prevSlide.classList.add("contactColor");
      nextSlide.classList.add("contactColor");

      break;
  }
};
// After creating the feature, I call it once to initialize it so we have some hover colors as soon as the user loads the page. It then correctly changes every time the user navigates between slides :)
slideColor();

// The following function, which will be called in different event listeners, targets all the hoverable elements on the page and removes all possible color classes from each of them, resetting them so that the slideColor function can apply its new colors without any further issues, thus ensuring color-scheme consistency across all slides.
const removeColor = () => {
  openMenu.classList.remove(
    "introColor",
    "aboutColor",
    "projectsColor",
    "contactColor"
  );
  linkedIn.classList.remove(
    "introColor",
    "aboutColor",
    "projectsColor",
    "contactColor"
  );
  gitHub.classList.remove(
    "introColor",
    "aboutColor",
    "projectsColor",
    "contactColor"
  );
  prevSlide.classList.remove(
    "introColor",
    "aboutColor",
    "projectsColor",
    "contactColor"
  );
  nextSlide.classList.remove(
    "introColor",
    "aboutColor",
    "projectsColor",
    "contactColor"
  );
};

// ** Clear email form
// This is code pre-written by formspree that ensures the email form is empty when a user reloads the webpage.
window.onbeforeunload = () => {
  // The form loop targets every field of the contact form, while the reset method clears it. Straightforward stuff :D
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};
