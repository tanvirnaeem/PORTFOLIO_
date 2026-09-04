const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const progressBar = document.getElementById("progressBar");
const typingText = document.getElementById("typingText");

const savedTheme = localStorage.getItem("tanvir-theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeBtn.textContent = "☀";
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  const light = body.classList.contains("light");
  themeBtn.textContent = light ? "☀" : "☾";
  localStorage.setItem("tanvir-theme", light ? "light" : "dark");
});

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuBtn.textContent = navMenu.classList.contains("open") ? "×" : "☰";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const words = ["ICT Student", "Web Developer", "Tech Enthusiast", "BUP Student"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const current = words[wordIndex];
  typingText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeEffect, 90);
  } else if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeEffect, 1500);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 55);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 300);
  }
}
typeEffect();

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${docHeight ? (scrollTop / docHeight) * 100 : 0}%`;

  document.getElementById("navbar").classList.toggle("scrolled", scrollTop > 20);

  let current = "home";
  document.querySelectorAll("section[id]").forEach(section => {
    if (scrollTop >= section.offsetTop - 180) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

// Coursework category filters
const courseFilters=document.querySelectorAll(".course-filter"), courseCards=document.querySelectorAll(".course-card");
courseFilters.forEach(filter=>filter.addEventListener("click",()=>{courseFilters.forEach(b=>b.classList.remove("active"));filter.classList.add("active");const selected=filter.dataset.filter;courseCards.forEach(card=>card.classList.toggle("hidden",selected!=="all"&&card.dataset.category!==selected));}));

// ===== VISUAL MOTION =====
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(el => revealObserver.observe(el));
} else {
  revealItems.forEach(el => el.classList.add("visible"));
}

document.querySelectorAll('img[src="assets/tanvir-profile.jpg"]').forEach(img=>{
  img.addEventListener('error',()=>{
    img.style.display='none';
    img.parentElement.classList.add('photo-missing');
  });
});
