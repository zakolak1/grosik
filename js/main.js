// Grosik – prosty skrypt: menu mobilne + slider

// 1. Menu mobilne
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  });
}

// 2. Slider z kropkami
//    - autoplay co 6 s, przycisk pauzy (WCAG 2.2.2)
//    - zatrzymuje się po najechaniu myszą / fokusie klawiatury
//    - brak autoplay przy "ograniczonym ruchu" w systemie
const slider = document.querySelector(".slider");

if (slider) {
  const slides = slider.querySelectorAll(".slide");
  const dotsBox = slider.querySelector(".slider__dots");
  const pauseBtn = slider.querySelector(".slider__pause");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let current = 0;
  let timer = null;
  let paused = reduceMotion; // użytkownik (lub system) wyłączył autoplay

  slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider__dot";
    dot.setAttribute("aria-label", "Pokaż slajd " + (i + 1) + " z " + slides.length);
    dot.addEventListener("click", () => showSlide(i));
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

  function start() {
    if (paused || timer) return;
    timer = setInterval(() => showSlide((current + 1) % slides.length), 6000);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function updatePauseButton() {
    pauseBtn.setAttribute("aria-pressed", paused);
    pauseBtn.setAttribute("aria-label", paused ? "Wznów automatyczne przewijanie" : "Zatrzymaj automatyczne przewijanie");
    pauseBtn.querySelector("use").setAttribute("href", paused ? "#i-play" : "#i-pause");
  }

  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    updatePauseButton();
    paused ? stop() : start();
  });

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  slider.addEventListener("focusin", stop);
  slider.addEventListener("focusout", start);

  showSlide(0);
  updatePauseButton();
  start();
}

// 3. Rok w stopce
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
