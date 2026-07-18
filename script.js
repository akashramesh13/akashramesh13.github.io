$(document).ready(function () {
  // Mobile Nav Drawer - Flawless execution
  $(".hamburger").on("click", function (e) {
    e.stopPropagation();
    $(".nav-links").toggleClass("active");
  });

  $(".nav-links a").on("click", function () {
    $(".nav-links").removeClass("active");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("nav").length) {
      $(".nav-links").removeClass("active");
    }
  });

  // Scrollspy
  $(window).on("scroll", function () {
    let scrollPosition = $(window).scrollTop();
    $(".section").each(function () {
      let sectionTop = $(this).offset().top - $(window).height() / 3;
      let sectionBottom = sectionTop + $(this).outerHeight();
      let sectionId = $(this).attr("id");
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $(".nav-links a").removeClass("active");
        $(".nav-links a[href='#" + sectionId + "']").addClass("active");
      }
    });
  });

  // Header Auto-Hide
  let lastScrollTop = 0;
  const header = $("header");
  $(window).on("scroll", function () {
    const currentScroll = $(window).scrollTop();
    if (currentScroll > 100) {
      if (currentScroll > lastScrollTop) {
        header.addClass("hide");
      } else {
        header.removeClass("hide");
      }
    } else {
      header.removeClass("hide");
    }
    lastScrollTop = currentScroll;
  });
});

// Typing Hook
document.addEventListener("DOMContentLoaded", function () {
  const targetElement = document.getElementById("typed-output");
  if (targetElement) {
    new Typed("#typed-output", {
      strings: [
        "build resilient systems.",
        "prefer offline-first.",
        "ship products, not just code.",
        "keep things simple.",
      ],
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
    });
  }

  // Easter Egg
  const surpriseBtn = document.getElementById("reveal-surprise");
  const surpriseTxt = document.getElementById("surprise-text");
  if (surpriseBtn && surpriseTxt) {
    surpriseBtn.addEventListener("click", function (event) {
      event.preventDefault();
      surpriseTxt.style.display = "inline";
      this.style.display = "none";
    });
  }
});

// 3-Way Theme Switcher Logic (Flawless SVG swap)
// 3-Way Theme Switcher Logic (OS Default Aware)
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  // Theme cycle order
  const themes = ["theme-light", "theme-terminal", "theme-catppuccin"];
  const icons = {
    "theme-light": "icon-sun",
    "theme-terminal": "icon-moon",
    "theme-catppuccin": "icon-cat",
  };

  // 1. Check for saved override, otherwise read OS Preference
  let savedTheme = localStorage.getItem("portfolio-theme");
  let currentTheme = savedTheme;

  if (!savedTheme) {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    currentTheme = prefersDark ? "theme-terminal" : "theme-light";
  }

  // Apply initial theme (Don't save to storage if it's just following OS)
  applyTheme(currentTheme, false);

  // 2. Real-time listener: Switch automatically if user changes OS theme (only if no manual override)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("portfolio-theme")) {
        currentTheme = e.matches ? "theme-terminal" : "theme-light";
        applyTheme(currentTheme, false);
      }
    });

  // 3. Manual Toggle Handler
  themeToggle.addEventListener("click", () => {
    let currentIndex = themes.indexOf(currentTheme);
    let nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];

    // User explicitly clicked, so save their choice to override OS
    applyTheme(currentTheme, true);

    // Butter animation
    themeToggle.style.transform = "scale(0.9) rotate(45deg)";
    setTimeout(() => {
      themeToggle.style.transform = "";
    }, 200);
  });

  // Core update function
  function applyTheme(themeName, saveToStorage = false) {
    // Clear all theme classes and apply the active one
    body.classList.remove("theme-light", "theme-terminal", "theme-catppuccin");
    body.classList.add(themeName);

    if (saveToStorage) {
      localStorage.setItem("portfolio-theme", themeName);
    }

    // Swap the SVG
    document.querySelectorAll(".theme-svg").forEach((svg) => {
      svg.classList.remove("active");
    });
    const activeIconId = icons[themeName];
    if (document.getElementById(activeIconId)) {
      document.getElementById(activeIconId).classList.add("active");
    }
  }
});
