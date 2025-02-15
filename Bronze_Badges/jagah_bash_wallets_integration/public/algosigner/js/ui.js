var swiper = new Swiper(".s2", {
  effect: "coverflow",
  grabCursor: false,
  mousewheel: {
    forceToAxis: true,
  },
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 1,
  centeredSlides: true,
  spaceBetween: 20,
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: "true",
  },
});
var swiper = new Swiper(".s3", {
  effect: "coverflow",
  grabCursor: false,
  mousewheel: {
    forceToAxis: true,
  },
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 2,
  centeredSlides: true,
  spaceBetween: 20,
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: "true",
  },
});

var swiper1 = new Swiper(".s1", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
