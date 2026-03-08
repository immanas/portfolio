/* =========================================================
   PREMIUM SMOOTH SCROLL (Navbar Links)
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top;
    const duration = 900;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOut(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });
});

/* =========================================================
   SCROLL REVEAL (Performance-Safe)
   ========================================================= */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});

/* =========================================================
   NETLIFY CONTACT FORM HANDLER
   ========================================================= */

const netlifyForm = document.querySelector('form[name="contact"]');
const formStatus = document.createElement('p');
formStatus.style.cssText = 'margin-top:12px; font-size:14px; min-height:18px;';

if (netlifyForm) {
  netlifyForm.appendChild(formStatus);

  netlifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = netlifyForm.elements["name"].value.trim();
    const email = netlifyForm.elements["email"].value.trim();
    const message = netlifyForm.elements["message"].value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill all fields ❗";
      formStatus.style.color = "#dc2626";
      return;
    }

    const sendBtn = netlifyForm.querySelector('button[type="submit"]');
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name: name,
          email: email,
          message: message,
        }).toString(),
      });

      if (res.ok) {
        formStatus.textContent = "✅ Message sent successfully!";
        formStatus.style.color = "#16a34a";
        netlifyForm.reset();
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      formStatus.textContent = "❌ Failed to send. Try again.";
      formStatus.style.color = "#dc2626";
      console.error(err);
    } finally {
      sendBtn.textContent = "Send";
      sendBtn.disabled = false;
    }
  });
}
/* =========================================================
   ADVANCED LEFT → RIGHT ROLE ANIMATION (SAFE)
   ========================================================= */

const roles = [
  "Software Developer",
  "DevOps Engineer",
  "Full-Stack Developer",
  "Backend Specialist",
  "Cloud Engineer",
  "Multi-Cloud Architect"
];

const roleEl = document.getElementById("role-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (!roleEl) return;

  if (!isDeleting) {
    roleEl.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) {
      setTimeout(() => (isDeleting = true), 1200);
    }
  } else {
    roleEl.textContent = currentRole.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

/* =========================================================
   CURSOR FOLLOW GLOW (SAFE + PERFORMANCE)
   ========================================================= */

const glow = document.getElementById("cursor-glow");

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

if (glow) {
  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = "1";
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

/* =========================================================
   DARK / LIGHT MODE (PRODUCTION-READY)
   ========================================================= */

const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  } else if (
    !savedTheme &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}