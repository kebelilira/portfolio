document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     WELCOME TEXT ANIMATION
  ========================== */
  const text = document.getElementById("welcome-text");

  if (text && text.getComputedTextLength) {
    const length = text.getComputedTextLength();

    text.style.strokeDasharray = length;
    text.style.strokeDashoffset = length;

    text.style.animation = `
      draw-line 1.6s ease forwards,
      fill-in 0.6s ease forwards
    `;

    text.style.animationDelay = `0s, 1.6s`;
  }

  /* =========================
     SCROLL REVEAL
  ========================== */
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  }

  /* =========================
     SCROLL PROGRESS + HEADER
  ========================== */
  const progressBar = document.getElementById("scroll-progress");
  const navbar = document.querySelector(".navbar");

  if (progressBar || navbar) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      if (progressBar && height > 0) {
        progressBar.style.width = (scroll / height) * 100 + "%";
      }

      if (navbar) {
        navbar.classList.toggle("scrolled", scroll > 50);
      }
    });
  }

  /* =========================
     CURSOR GLOW
  ========================== */
  const glow = document.querySelector(".cursor-glow");

  if (glow) {
    document.addEventListener("mousemove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  /* =========================
     WELCOME SCANNER EFFECT
  ========================== */
  const welcome = document.getElementById("welcome-text");
  const scanner = document.querySelector(".scanner");

  if (welcome && scanner) {
    welcome.addEventListener("mouseenter", () => {
      scanner.style.animation = "scanner 2s linear infinite";
    });
  }

  /* =========================
     HUD MENU (THREE DOTS)
  ========================== */
  const dotsButton = document.querySelector(".three-dots");
  const hudMenu = document.getElementById("hudMenu");

  if (dotsButton && hudMenu) {

    dotsButton.addEventListener("click", (e) => {
      e.stopPropagation();
      dotsButton.classList.toggle("active");
      hudMenu.classList.toggle("active");

      animateDots(dotsButton);
    });

    document.addEventListener("click", () => {
      dotsButton.classList.remove("active");
      hudMenu.classList.remove("active");
    });

    hudMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  /* =========================
     HUD ACTIVE LINK (SCROLL)
  ========================== */
  const sections = document.querySelectorAll("section[id]");
  const menuLinks = document.querySelectorAll(".hud-menu a");

  if (sections.length && menuLinks.length) {

    const activateMenu = () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      menuLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", activateMenu);
    activateMenu();
  }

});


/* =========================
   SPRING ANIMATION FUNCTION
========================== */
function spring(el, keyframes) {
  if (!el) return;

  el.animate(keyframes, {
    duration: 550,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    fill: "forwards"
  });
}


/* =========================
   DOTS ANIMATION
========================== */
function animateDots(button) {
  const spans = button.querySelectorAll("span");
  if (!spans.length) return;

  if (button.classList.contains("active")) {

    spring(spans[0], [
      { transform: "translateY(0) rotate(0)" },
      { transform: "translateY(12px) rotate(50deg)" },
      { transform: "translateY(10px) rotate(45deg)" }
    ]);

    spring(spans[2], [
      { transform: "translateY(0) rotate(0)" },
      { transform: "translateY(-12px) rotate(-50deg)" },
      { transform: "translateY(-10px) rotate(-45deg)" }
    ]);

  }
}