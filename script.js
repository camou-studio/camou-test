
(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  // Burger-Menü

  function setMenu(open) {
    menuToggle.classList.toggle("active", open);
    navigation.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Menü schließen" : "Menü öffnen"
    );
    navigation.setAttribute("aria-hidden", String(!open));
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenu(false);
    });
  });

  // Escape schließt das Menü

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  // Klick auf einen Menüpunkt führt zu einem Abschnitt.
  // Das Menü wird über die Navigation wieder geschlossen.

  // Scroll-Reveal

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Jahr im Footer automatisch aktualisieren

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Scrollrahmen: Tastaturbedienung bleibt möglich

  document.querySelectorAll(".scroll-frame").forEach((frame) => {
    frame.addEventListener("keydown", (event) => {
      const amount = Math.max(160, frame.clientHeight * 0.65);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        frame.scrollBy({ top: amount, behavior: "smooth" });
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        frame.scrollBy({ top: -amount, behavior: "smooth" });
      }

      if (event.key === "PageDown") {
        event.preventDefault();
        frame.scrollBy({ top: frame.clientHeight, behavior: "smooth" });
      }

      if (event.key === "PageUp") {
        event.preventDefault();
        frame.scrollBy({ top: -frame.clientHeight, behavior: "smooth" });
      }
    });
  });

  // Bei Wechsel auf ein größeres Fenster keine
  // blockierte Navigation zurücklassen.

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenu(false);
    }
  });
})();

