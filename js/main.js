// Grosik – prosty skrypt: menu, nagłówek, slider, animacje przy przewijaniu

document.documentElement.classList.add("js");

// 1. Menu mobilne
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  });

  // zamknij menu po kliknięciu w link
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// 2. Cień pod nagłówkiem po przewinięciu
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// 3. Slider
//    - autoplay co 5 s, przycisk pauzy (WCAG 2.2.2)
//    - zatrzymuje się po najechaniu myszą / fokusie klawiatury
//    - brak autoplay przy "ograniczonym ruchu" w systemie
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const slider = document.querySelector(".slider");

if (slider) {
  const slides = slider.querySelectorAll(".slide");
  const dotsBox = slider.querySelector(".slider__dots");
  const pauseBtn = slider.querySelector(".slider__pause");
  const caption = slider.querySelector(".slider__caption");

  let current = 0;
  let timer = null;
  let paused = reduceMotion;

  slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider__dot";
    dot.setAttribute("aria-label", "Pokaż ekran " + (i + 1) + " z " + slides.length + ": " + slide.dataset.title);
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
    caption.innerHTML = "<strong>" + slides[i].dataset.title + "</strong><span>" + slides[i].dataset.text + "</span>";
  }

  function start() {
    if (paused || timer) return;
    timer = setInterval(() => showSlide((current + 1) % slides.length), 5000);
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

// 4. Pojawianie się elementów przy przewijaniu
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => observer.observe(el));
}

// 5. Rok w stopce
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
