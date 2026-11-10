$(document).ready(function () {
  // Mobile Nav Drawer - Flawless execution
  $(".hamburger").on("click", function (e) {
    e.stopPropagation();
    $(".nav-links").toggleClass("active");
    $(this).toggleClass("active");
    $("body").toggleClass("menu-open");
  });

  $(".nav-links a").on("click", function () {
    $(".nav-links").removeClass("active");
    $(".hamburger").removeClass("active");
    $("body").removeClass("menu-open");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("nav").length) {
      $(".nav-links").removeClass("active");
      $(".hamburger").removeClass("active");
      $("body").removeClass("menu-open");
    }
  });

  // Scrollspy with bottom-of-page detection
  function updateScrollspy() {
    let scrollPosition = $(window).scrollTop();
    let windowHeight = $(window).height();
    let docHeight = $(document).height();

    // If scrolled to the bottom of the page (within 60px), highlight Contact
    if (scrollPosition + windowHeight >= docHeight - 60) {
      $(".nav-links a").removeClass("active");
      $(".nav-links a[href='#contact']").addClass("active");
      return;
    }

    let activeId = "";
    $(".section").each(function () {
      let sectionTop = $(this).offset().top - 140;
      let sectionBottom = sectionTop + $(this).outerHeight();
      let sectionId = $(this).attr("id");
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeId = sectionId;
      }
    });

    if (activeId) {
      $(".nav-links a").removeClass("active");
      $(".nav-links a[href='#" + activeId + "']").addClass("active");
    }
  }

  $(window).on("scroll", updateScrollspy);
  updateScrollspy();

  // Scroll Progress Bar
  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    $(window).on("scroll", function () {
      const scrollTotal = $(document).height() - $(window).height();
      const scrollPosition = $(window).scrollTop();
      const scrollPercent = (scrollPosition / scrollTotal) * 100;
      progressBar.style.width = scrollPercent + "%";
    });
  }

  // Scroll Reveal Animations (Apple Clean Fade — reveals once and stays visible)
  const revealElements = document.querySelectorAll(
    "#about h2, .about-text p, .about-image, #projects h2, .project-card, #contact h2, .contact-text"
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Never disappear on scroll once revealed
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px",
      },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // Global Cursor Tracking for Grid Glow
  document.body.addEventListener("mousemove", function (e) {
    // Using clientX/Y since the background is fixed to the viewport
    document.body.style.setProperty("--mouse-x", e.clientX + "px");
    document.body.style.setProperty("--mouse-y", e.clientY + "px");
    document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
    document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
  });
});

// Typing Hook
// Add this small modification to your existing Typed.js setup
document.addEventListener("DOMContentLoaded", function () {
  const targetElement = document.getElementById("typed-output");
  if (targetElement) {
    new Typed("#typed-output", {
      strings: [
        "build things I wish existed.",
        "think moves ahead, usually.",
        "prefer privacy over convenience.",
        "believe less is more.",
        "debug for fun sometimes.",
        "play the French. No regrets.",
      ],
      typeSpeed: 45,
      backSpeed: 20,
      backDelay: 2500, // Slightly longer pause to let the reader read
      startDelay: 400,
      loop: true,
    });
  }

  // Easter Egg logic remains exactly the same...
});
// The rest of your JS for themes and navigation remains entirely unchanged.

// 4-Way Theme Switcher Logic (System Default + 3 manual themes)
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  // Theme cycle order: system is first and default
  const themes = ["theme-system", "theme-light", "theme-terminal"];
  const icons = {
    "theme-system": "icon-system",
    "theme-light": "icon-sun",
    "theme-terminal": "icon-moon",
  };

  // Resolve OS preference to a concrete theme
  function getSystemTheme() {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "theme-terminal" : "theme-light";
  }

  // 1. Check for saved override, otherwise default to system
  let savedTheme = localStorage.getItem("portfolio-theme");
  let currentTheme = savedTheme || "theme-system";

  // Apply initial theme
  applyTheme(currentTheme, false);

  // 2. Real-time listener: auto-switch when OS theme changes (only in system mode)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (currentTheme === "theme-system") {
        applyTheme("theme-system", false);
      }
    });

  // 3. Manual Toggle Handler
  themeToggle.addEventListener("click", () => {
    let currentIndex = themes.indexOf(currentTheme);
    let nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];

    if (currentTheme === "theme-system") {
      // Going back to system = remove override
      localStorage.removeItem("portfolio-theme");
      applyTheme(currentTheme, false);
    } else {
      // User explicitly chose a theme
      applyTheme(currentTheme, true);
    }

    // Butter animation
    themeToggle.style.transform = "scale(0.9) rotate(45deg)";
    setTimeout(() => {
      themeToggle.style.transform = "";
    }, 200);
  });

  // Core update function
  function applyTheme(themeName, saveToStorage = false) {
    // Resolve the actual CSS class to apply
    const cssTheme = themeName === "theme-system" ? getSystemTheme() : themeName;

    // Clear all theme classes and apply the resolved one
    document.documentElement.classList.remove("theme-light", "theme-terminal", "theme-catppuccin");
    document.documentElement.classList.add(cssTheme);

    if (saveToStorage) {
      localStorage.setItem("portfolio-theme", themeName);
    }

    // Swap the SVG icon to match the selected mode (not the resolved theme)
    document.querySelectorAll(".theme-svg").forEach((svg) => {
      svg.classList.remove("active");
    });

    const activeIconId = icons[themeName];
    if (document.getElementById(activeIconId)) {
      document.getElementById(activeIconId).classList.add("active");
    }

    // Update Dynamic Favicon (uses resolved CSS theme)
    updateFavicon(cssTheme);

    // Swap Theme-Aware Images (uses resolved CSS theme)
    document.querySelectorAll(".theme-aware-img").forEach((img) => {
      if (cssTheme === "theme-light") {
        img.src = img.getAttribute("data-light");
      } else {
        // Both terminal and catppuccin are dark themes
        img.src = img.getAttribute("data-dark");
      }
    });
  }

  // Helper to dynamically change favicon based on theme color (Apple HIG Palette)
  function updateFavicon(themeName) {
    let accentColor = "#0071E3";
    let bgColor = "#FFFFFF";
    let textColor = "#1D1D1F";

    if (themeName === "theme-terminal" || themeName === "theme-catppuccin") {
      accentColor = "#2997FF";
      bgColor = "#000000";
      textColor = "#F5F5F7";
    }

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="24" fill="${bgColor}" />
  <text x="50" y="68" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="46" font-weight="900" fill="${textColor}" text-anchor="middle" letter-spacing="-2">
    <tspan fill="${accentColor}">&lt;</tspan>A<tspan fill="${accentColor}">/&gt;</tspan>
  </text>
</svg>`.trim();

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = url;
  }
});
