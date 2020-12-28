gsap.defaults({
  ease: "power4.inOut",
  duration: 0.5,
});

let pairAttr;
let opened = false;
let isDesktop;

$(window)
  .on("resize", function () {
    if (window.innerWidth < 1024) {
      //TABLET
      $(".cart").appendTo("body");
      console.log("appended to body");
      isDesktop = false;

      $(".hamburger").on("click", function (e) {
        e.preventDefault();
        if (opened) {
          tlNav.reverse();
        } else {
          tlNav.play();
        }
        opened = !opened;
      });
    } else {
      //DESKTOP
      $(".cart").appendTo(".links-wrapper");
      console.log("appended to nav");
      isDesktop = true;

      $(".link_l1, .account, .cart, .box-wrapper div").hover(
        function () {
          // over
          // openNav();
          tlNav.play();
          showBox($(this));
        },
        function () {
          // out
          // closeNav();
          tlNav.reverse();
          hideBox();
        }
      );
    }
  })
  .resize();

let tlNav = gsap.timeline({ paused: false });

tlNav
  .to(".nav", {
    height: isDesktop ? "57.9rem" : "100vh",
    borderRadius: isDesktop ? "0 0 4rem 4rem" : "0",
    y: 0,
  })
  .to(".links-wrapper", { y: isDesktop ? "4rem" : "0" }, "-=0.5");

function openNav() {
  gsap.to(".nav", {
    height: "57.9rem",
    borderRadius: "0 0 4rem 4rem",
    y: "0rem",
  });

  gsap.to(".links-wrapper", { y: "4rem" });
}

function closeNav() {
  gsap.to(".nav", {
    height: "5rem",
    borderRadius: "4rem",
    y: "4rem",
  });

  gsap.to(".links-wrapper", { y: "0" });
}

function showBox(btn) {
  pairAttr = btn.attr("data-pair");
  $(`div[data-pair='${pairAttr}'], button[data-pair='${pairAttr}']`).addClass(
    "active"
  );
}

function hideBox() {
  $(
    `div[data-pair='${pairAttr}'], button[data-pair='${pairAttr}']`
  ).removeClass("active");
}

// const e = document.querySelector(".nav");
// const proxy = { clipPath: "inset(40px 0 490px 0 round 30px 30px 30px 30px)" };

// $(".nav").hover(
//   function () {
//     // over
//     gsap.to(proxy, {
//       clipPath: "inset(0px 0 0px 0 round 0px 0px 30px 30px)",
//       onUpdate: function () {
//         e.style.clipPath = proxy.clipPath;
//       },
//     });
//   },
//   function () {
//     // out
//     gsap.to(proxy, {
//       clipPath: "inset(40px 0 490px 0 round 30px 30px 30px 30px)",
//       onUpdate: function () {
//         e.style.clipPath = proxy.clipPath;
//       },
//     });
//   }
// );
