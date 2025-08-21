// Devices Slider
document.addEventListener('DOMContentLoaded', function() {
    const devicesSlider = new Swiper('.devices-slider .swiper', {
        // Основные параметры
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        centeredSlides: false,
        
        // Адаптивные брейкпоинты
        breakpoints: {
            // Мобильные устройства
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // Планшеты
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            // Десктоп
            1024: {
                slidesPerView: 3,
                spaceBetween: 32,
            }
        },
        
        // Навигация
        navigation: {
            nextEl: '.devices__navigation .swiper-button-next',
            prevEl: '.devices__navigation .swiper-button-prev',
        },
        
        // Пагинация
        pagination: {
            el: '.devices-slider .swiper-pagination',
            clickable: true,
        },
        
        // Автопрокрутка отключена
        // autoplay: false,
        
        // Эффекты
        effect: 'slide',
        speed: 600,
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Попередній слайд',
            nextSlideMessage: 'Наступний слайд',
        }
    });
});
