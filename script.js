/* =====================================================
   THEME TOGGLE (light / dark)
===================================================== */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("mp-theme");
} catch (e) {
  savedTheme = null;
}

if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("mp-theme", next);
  } catch (e) {
    /* storage unavailable, ignore */
  }
});


/* =====================================================
   COPY EMAIL
===================================================== */
const emailAddress = document.getElementById("emailAddress").value;

function wireCopyButton(button) {
  if (!button) return;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      const original = button.textContent;
      button.textContent = "Copied ✓";
      setTimeout(() => { button.textContent = original; }, 2000);
    } catch (error) {
      window.location.href = `mailto:${emailAddress}`;
    }
  });
}

wireCopyButton(document.getElementById("copyEmail"));


/* =====================================================
   CONTACT FORM -> opens email client (static site, no backend)
===================================================== */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const subject = document.getElementById("cf-subject").value.trim() || "Portfolio contact";
  const message = document.getElementById("cf-message").value.trim();

  const body = `From: ${name} (${email})%0D%0A%0D%0A${encodeURIComponent(message)}`;
  const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mailto;
});


/* =====================================================
   BACK TO TOP
===================================================== */
const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topButton.classList.add("visible");
  } else {
    topButton.classList.remove("visible");
  }
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =====================================================
   ACTIVE NAV LINK ON SCROLL + SMOOTH SCROLL
===================================================== */
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const sections = document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach(section => navObserver.observe(section));


/* =====================================================
   REVEAL ON SCROLL
===================================================== */
const revealElements = document.querySelectorAll(
  ".focus-card, .project-tile, .process-step, .cert-card, .tool-chip"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(16px)";
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  revealObserver.observe(element);
});