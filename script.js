$(document).ready(function () {
  $(".hamburger").on("click", function () {
    $(".nav-links").toggleClass("active");
  });

  $(".nav-links a").on("click", function () {
    $(".nav-links").removeClass("active");
  });

  $(window).on("scroll", function () {
    let scrollPosition = $(window).scrollTop();

    $(".section").each(function () {
      let sectionTop = $(this).offset().top - 100;
      let sectionBottom = sectionTop + $(this).outerHeight();
      let sectionId = $(this).attr("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $(".nav-links a").removeClass("active");
        $(".nav-links a[href='#" + sectionId + "']").addClass("active");
      }
    });
  });

  let lastScrollTop = 0;
  const header = $("header");
  const scrollThreshold = 100;
  let scrollTimeout;

  $(window).on("scroll", function () {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(function () {
      const currentScroll = $(window).scrollTop();

      if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScrollTop) {
          header.addClass("hide");
        } else {
          header.removeClass("hide");
        }
      } else {
        header.removeClass("hide");
      }

      lastScrollTop = currentScroll;
    }, 10);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "design scalable software",
    "optimize cloud infrastructure",
    "develop high-performance APIs",
    "build resilient microservices",
    "love distributed systems",
    "use Arch, btw 😉",
    "love catppuccin 😻",
  ];

  new Typed("#typed-output", {
    strings: texts,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("reveal-surprise")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("surprise-text").style.display = "inline";
      this.style.display = "none";
    });
});
