/* THEME TOGGLE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};

document.addEventListener("DOMContentLoaded", () => {
  const text = document.getElementById("welcome-text");
  if (!text) return;

  const length = text.getComputedTextLength();

  text.style.strokeDasharray = length;
  text.style.strokeDashoffset = length;

  text.style.animation = `
    draw-line 1.6s ease forwards,
    fill-in 0.6s ease forwards
  `;

  text.style.animationDelay = `0s, 1.6s`;
});
/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("active");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

/* SCROLL PROGRESS + HEADER */
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("scroll-progress").style.width = (scroll / height) * 100 + "%";

  document.querySelector(".navbar")
    .classList.toggle("scrolled", scroll > 50);
});

/* CURSOR GLOW */
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* MOBILE MENU */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.onclick = () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("open");
};