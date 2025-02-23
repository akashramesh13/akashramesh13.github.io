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

function expensifyOnclick(e) {
  e.preventDefault();
  window.open("https://akashramesh13.github.io/expensify-app/", "_blank");
}

function indecisionOnclick(e) {
  e.preventDefault();
  window.open("https://akashramesh13.github.io/indecision-app/", "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("reveal-arch")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("arch-text").style.display = "inline";
      this.style.display = "none";
    });
});
