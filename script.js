/* =====================================================
   THEME TOGGLE
   Light / Dark Mode
===================================================== */

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;


/* -----------------------------------------------------
   APPLY THEME
----------------------------------------------------- */

function applyTheme(theme) {

  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }

}


/* -----------------------------------------------------
   LOAD SAVED THEME
----------------------------------------------------- */

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("mp-theme");
} catch (error) {
  savedTheme = null;
}


/* -----------------------------------------------------
   INITIAL THEME
----------------------------------------------------- */

if (savedTheme === "dark") {

  applyTheme("dark");

} else if (savedTheme === "light") {

  applyTheme("light");

} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {

  applyTheme("dark");

} else {

  applyTheme("light");

}


/* -----------------------------------------------------
   TOGGLE THEME
----------------------------------------------------- */

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    const isDark =
      root.getAttribute("data-theme") === "dark";

    const nextTheme =
      isDark ? "light" : "dark";

    applyTheme(nextTheme);

    try {

      localStorage.setItem(
        "mp-theme",
        nextTheme
      );

    } catch (error) {

      // Ignore storage errors

    }

  });

}


/* =====================================================
   COPY EMAIL
===================================================== */

const emailElement =
  document.getElementById("emailAddress");

const emailAddress =
  emailElement
    ? emailElement.value
    : "manjushpremkumar00@gmail.com";


const copyEmailButton =
  document.getElementById("copyEmail");


if (copyEmailButton) {

  copyEmailButton.addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard.writeText(
          emailAddress
        );

        const originalText =
          copyEmailButton.textContent;

        copyEmailButton.textContent =
          "Copied ✓";

        setTimeout(() => {

          copyEmailButton.textContent =
            originalText;

        }, 2000);

      } catch (error) {

        window.location.href =
          `mailto:${emailAddress}`;

      }

    }
  );

}


/* =====================================================
   CONTACT FORM
   Opens user's email client
===================================================== */

const contactForm =
  document.getElementById("contactForm");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        document
          .getElementById("cf-name")
          .value
          .trim();


      const email =
        document
          .getElementById("cf-email")
          .value
          .trim();


      const subject =
        document
          .getElementById("cf-subject")
          .value
          .trim()
        || "Portfolio Contact";


      const message =
        document
          .getElementById("cf-message")
          .value
          .trim();


      const body =
        `From: ${name} (${email})\n\n${message}`;


      const mailto =
        `mailto:${emailAddress}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;


      window.location.href =
        mailto;

    }
  );

}


/* =====================================================
   BACK TO TOP
===================================================== */

const topButton =
  document.getElementById("topButton");


if (topButton) {

  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 500) {

        topButton.classList.add("show");

      } else {

        topButton.classList.remove("show");

      }

    }
  );


  topButton.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =====================================================
   NAVIGATION
   Smooth Scroll
===================================================== */

const navLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


navLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      const href =
        link.getAttribute("href");


      if (!href || !href.startsWith("#")) {
        return;
      }


      const target =
        document.querySelector(href);


      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );

});


/* =====================================================
   ACTIVE NAV LINK ON SCROLL
===================================================== */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const navObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const id =
            entry.target.getAttribute("id");


          navLinks.forEach((link) => {

            const linkTarget =
              link.getAttribute("href");


            link.classList.toggle(
              "active",
              linkTarget === `#${id}`
            );

          });

        }

      });

    },
    {
      rootMargin: "-45% 0px -45% 0px"
    }
  );


sections.forEach((section) => {

  navObserver.observe(section);

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
  document.querySelectorAll(
    ".focus-card, " +
    ".project-tile, " +
    ".process-step, " +
    ".cert-card, " +
    ".skill-category, " +
    ".skill-tags span"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "reveal-visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.1
    }
  );


revealElements.forEach((element) => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});


/* =====================================================
   END
===================================================== */