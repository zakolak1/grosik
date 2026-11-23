// Grosik – prosty skrypt: menu mobilne + slider

// 1. Menu mobilne
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// 2. Slider z kropkami (automatyczny, pauza po kliknięciu)
const slides = document.querySelectorAll(".slide");
const dotsBox = document.querySelector(".slider__dots");

if (slides.length && dotsBox) {
  let current = 0;
  let timer;

  slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    dot.className = "slider__dot";
    dot.setAttribute("aria-label", "Pokaż slajd " + (i + 1));
    dot.addEventListener("click", () => {
      showSlide(i);
      clearInterval(timer); // użytkownik przejął kontrolę – zatrzymujemy autoplay
    });
    dotsBox.appendChild(dot);
  });

  const dots = dotsBox.querySelectorAll(".slider__dot");

  function showSlide(i) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    dots[current].removeAttribute("aria-current");
    current = i;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
    dots[current].setAttribute("aria-current", "true");
  }

  showSlide(0);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    timer = setInterval(() => showSlide((current + 1) % slides.length), 6000);
  }
}

// 3. Rok w stopce
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
