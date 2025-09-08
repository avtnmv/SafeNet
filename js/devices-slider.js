
document.addEventListener('DOMContentLoaded', function() {
    const devicesSlider = new Swiper('.devices-slider .swiper', {   
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        centeredSlides: false,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        },
        
        navigation: {
            nextEl: '.devices__navigation .swiper-button-next',
            prevEl: '.devices__navigation .swiper-button-prev',
        },
        
        pagination: {
            el: '.devices-slider .swiper-pagination',
            clickable: true,
        },
        
        
        effect: 'slide',
        speed: 600,
        
        a11y: {
            prevSlideMessage: 'Попередній слайд',
            nextSlideMessage: 'Наступний слайд',
        }
    });
});
