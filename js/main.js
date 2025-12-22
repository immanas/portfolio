/* ================= BACKEND CONNECTION TEST ================= */

// 1️⃣ Health check (backend alive)
fetch("http://localhost:8080/api/health")
  .then(response => response.text())
  .then(data => {
    document.getElementById("backend-status").textContent = data;
  })
  .catch(error => {
    document.getElementById("backend-status").textContent =
      "Backend not reachable ❌";
    console.error(error);
  });

// 2️⃣ Real API call (use backend data in UI)
fetch("http://localhost:8080/api/profile")
  .then(res => res.json())
  .then(data => {
    console.log("Profile from backend:", data);

    // 🔗 CONNECT BACKEND → FRONTEND
    document.getElementById("role-text").textContent = data.role;
  })
  .catch(err => console.error("Profile API error:", err));
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
   CONTACT FORM HANDLER (Safe Placeholder)
   ========================================================= */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill all fields ❗", "error");
      return;
    }

    sendBtn.textContent = "Sending...";
    sendBtn.classList.add("loading");

    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const text = await res.text();
      showStatus("✅ Message sent successfully!", "success");
      contactForm.reset();

    } catch (err) {
      showStatus("❌ Failed to send. Try again.", "error");
      console.error(err);
    } finally {
      sendBtn.textContent = "Send";
      sendBtn.classList.remove("loading");
    }
  });
}

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status show ${type}`;
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
