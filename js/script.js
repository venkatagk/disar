/* ── Hero Slideshow: background + image + dots connected ── */
const slides = Array.from(document.querySelectorAll(".slide"));
const imageSlides = Array.from(document.querySelectorAll(".hero-image-slide"));
const dots = Array.from(document.querySelectorAll(".dot"));

let current = 0;
let timer = null;

function setActive(items, index) {
    items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });
}

function goSlide(n) {
    const total = Math.max(slides.length, imageSlides.length, dots.length);

    if (!total) return;

    current = ((n % total) + total) % total;

    setActive(slides, current);
    setActive(imageSlides, current);
    setActive(dots, current);
}

function nextSlide() {
    const total = Math.max(slides.length, imageSlides.length, dots.length);
    goSlide((current + 1) % total);
}

function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, 4500);
}

function stopTimer() {
    if (timer) clearInterval(timer);
}

function resetTimer() {
    startTimer();
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goSlide(index);
        resetTimer();
    });
});

/* Expose for existing onclick="goSlide(0)" HTML */
window.goSlide = function (n) {
    goSlide(n);
    resetTimer();
};

goSlide(0);
startTimer();

/* Pause animation when user hovers over hero */
const hero = document.getElementById("hero");
if (hero) {
    hero.addEventListener("mouseenter", stopTimer);
    hero.addEventListener("mouseleave", startTimer);
}

/* ── Scroll Reveal ── */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    revealItems.forEach((el) => io.observe(el));
} else {
    revealItems.forEach((el) => el.classList.add("visible"));
}

/* ── Scroll Buttons ── */
const scrollNav = document.getElementById("scrollNav");

if (scrollNav) {
    window.addEventListener(
        "scroll",
        () => {
            scrollNav.classList.toggle("visible", window.scrollY > 300);
        },
        { passive: true }
    );
}
});