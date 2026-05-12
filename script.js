const burger = document.querySelector(".burger");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const header = document.querySelector(".site-header");
const cursorGlow = document.querySelector(".cursor-glow");

burger.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("active");

  burger.classList.toggle("toggle", isOpen);
  burger.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    burger.classList.remove("toggle");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

document.getElementById("current-year").textContent = new Date().getFullYear();

document.getElementById("profile-link").addEventListener("click", () => {
  window.open("https://codepen.io/toufikbens", "_blank", "noopener,noreferrer");
});

const fadeElements = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -80px 0px",
  }
);

fadeElements.forEach((element) => appearOnScroll.observe(element));

const sections = document.querySelectorAll("section[id]");

function updateHeaderAndActiveLink() {
  header.classList.toggle("scrolled", window.scrollY > 60);

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", updateHeaderAndActiveLink);
window.addEventListener("load", updateHeaderAndActiveLink);

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener("mouseleave", () => {
  cursorGlow.style.opacity = "0";
});
