// let tlNav = gsap.timeline({
//   paused: true,
//   defaults: { duration: 0.3, ease: "expo.out" },
// });

// tlNav
//   .to(".nav", {
//     height: window.innerWidth >= 1024 ? "52rem" : "100vh",
//     borderRadius: window.innerWidth >= 1024 ? "0 0 4rem 4rem" : "0",
//     y: 0,
//   })
//   .to(".wrapper", { y: window.innerWidth >= 1024 ? "4rem" : "0" }, "-=0.3");

/* -------------------------------------------------------------------------- */
/*                            CART DOM MANIPULATION                           */
/* -------------------------------------------------------------------------- */

console.log('GIT TEST PULL PUSH');

function cartDomChange() {
  console.log("cartDomChange() Called");
  if (window.innerWidth <= 1024) {
    //TABLET
    $(".cart").appendTo("body");
    console.log("appended to body");
  } else {
    //DESKTOP
    $(".cart").appendTo(".wrapper");
    console.log("appended to nav");
  }
}

let timeout = false;
$(window).on("resize", function () {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(cartDomChange, 250);
});
cartDomChange();

/* -------------------------------------------------------------------------- */
/*                             DESKTOP HOVER BTNS                             */
/* -------------------------------------------------------------------------- */

$(".link_l1, .account, .cart").hover(
  function () {
    // over
    if (window.innerWidth > 1024) {
      $(".nav").addClass("active");
      if ($(this).hasClass("link_l1")) {
        let link_l3TitleSpan = $(this).find(".link_l3-title, .link_l2-title");
        gsap.fromTo(
          link_l3TitleSpan,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
          }
        );
      }
    }
  },
  function () {
    // out
    if (window.innerWidth > 1024) {
      $(".nav").removeClass("active");
      $(".sublink-box").animate({ scrollTop: 0 }, 200);
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                               HAMBURGER LOGIC                              */
/* -------------------------------------------------------------------------- */

$(".hamburger").click(function (e) {
  if (window.innerWidth <= 1024) {
    e.preventDefault();
    if (!$(".account, .search").hasClass("active")) {
      console.log("both account and search are NOT active");
      $(".links-wrapper").addClass("active");
    }
    $(this).toggleClass("active");
    $(".nav").toggleClass("active");
    if ($(".nav").hasClass("active")) {
      gsap.from(".link_l1-title span", { opacity: 0, y: 20, stagger: 0.1 });
    }
    $(".account, .search").removeClass("active");

    fadeInChildren();

    $(".link_l1, .link_l2")
      .removeClass("active")
      .siblings()
      .removeClass("hide");
    $(".sublink-box").animate({ scrollTop: 0 }, 200);
  }
});

/* -------------------------------------------------------------------------- */
/*                                ACCOUNT LOGIC                               */
/* -------------------------------------------------------------------------- */

$(".account").click(function (e) {
  if (window.innerWidth <= 1024) {
    e.preventDefault();
    $(".nav, .hamburger").addClass("active");
    $(this).addClass("active");
    $(".search, .links-wrapper").removeClass("active");
  }
});

/* -------------------------------------------------------------------------- */
/*                                SEARCH LOGIC                                */
/* -------------------------------------------------------------------------- */
$(".search").click(function (e) {
  if (window.innerWidth <= 1024) {
    e.preventDefault();
    $(".nav, .hamburger").addClass("active");
    $(this).addClass("active");
    $(".account, .links-wrapper").removeClass("active");
  } else {
    $(this).addClass("active");
  }

  fadeOutChildren();
});

$(".close-srch, .srch").click(function (e) {
  e.stopPropagation();
  fadeInChildren();

  $(".nav, .hamburger").removeClass("active");
  $(".search").removeClass("active");
  $(".account, .links-wrapper").removeClass("active");
});

let disableChildrenPlusSearchIcon;
function fadeOutChildren() {
  disableChildrenPlusSearchIcon = $(
    ".logo, .link_l1, .account,.search-icon, .wrapper .cart "
  );
  gsap.to(disableChildrenPlusSearchIcon, {
    autoAlpha: 0,
    duration: 0.1,
  });
}
function fadeInChildren() {
  gsap.to(disableChildrenPlusSearchIcon, {
    autoAlpha: 1,
    stagger: 0.05,
    duration: 0.2,
    delay: 0.1,
  });
}

/* -------------------------------------------------------------------------- */
/*                                    CART                                    */
/* -------------------------------------------------------------------------- */
$(".cart").click(function (e) {
  if (window.innerWidth <= 1024) {
    e.preventDefault();
    $(this).toggleClass("active");
  }
});

//////////////////////////////////////////////////

$(".link_l1").click(function (e) {
  if (window.innerWidth <= 1024) {
    // e.preventDefault();
    e.stopPropagation();
    console.log($(this)[0]);
    $(this).addClass("active");
    $(this).siblings().addClass("hide");
    let link_l2TitleSpan = $(this).find(".link_l2-title span");
    gsap.from(link_l2TitleSpan, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
    });
  }
});

$(".link_l2").click(function (e) {
  if (window.innerWidth <= 1024) {
    // e.preventDefault();
    e.stopPropagation();
    console.log($(this)[0]);
    $(this).addClass("active");
    $(this).siblings().addClass("hide");
    $(this)
      .parent()
      .animate({ scrollTop: 0 }, 200, function () {
        $(this).addClass("lockscroll");
      });
    let link_l3TitleSpan = $(this).find(".link_l3-title span");
    gsap.from(link_l3TitleSpan, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
    });
  }
});

$(".back-btn").click(function (e) {
  if (window.innerWidth <= 1024) {
    // e.preventDefault();
    e.stopPropagation();
    console.log(e.target);
    console.log("backbtn");
    $(this)
      .closest("[data-backbtn]")
      .removeClass("active")
      .siblings()
      .removeClass("hide");

    $(this).closest("[data-overflow]").removeClass("lockscroll");

    $(this).parent().animate({ scrollTop: 0 }, 200);
  }
});

$(".links-wrapper a:not('.link_l3-title')").click(function (e) {
  if (window.innerWidth <= 1024) {
    e.preventDefault();
  }
});

$(".sublink-box").click(function (e) {
  if (window.innerWidth <= 1024) {
    e.stopPropagation();
  }
});
