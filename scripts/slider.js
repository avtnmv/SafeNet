const swiper = new Swiper('.benefits__swiper', {
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

});

const swiper2 = new Swiper('.devices-swiper', {
  spaceBetween: 20,
  navigation: {
    nextEl: '.devices-button-next',
    prevEl: '.devices-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    }
  }
});



    const licensesSlider =  new Swiper('.license-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: false, // без стрелок
  });