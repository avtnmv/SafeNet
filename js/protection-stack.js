// Protection, Advantages and Tech-Security cards animation with GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Регистрируем ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    const protectionCards = gsap.utils.toArray('.protection__card');
    const advantagesCards = gsap.utils.toArray('.advantages__card');
    const techSecurityCards = gsap.utils.toArray('.tech-security__card');
    
    // Функция для создания анимации карточек protection
    function animateProtectionCards(cards) {
        if (cards.length === 0) return;
        
        cards.forEach((card, index) => {
            gsap.fromTo(card, 
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1, // Анимация синхронизирована со скоростью скролла
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    // Функция для создания анимации карточек advantages (справа)
    function animateAdvantagesCards(cards) {
        if (cards.length === 0) return;
        
        // Проверяем размер экрана
        const isDesktop = window.innerWidth > 990;
        
        cards.forEach((card, index) => {
            gsap.fromTo(card, 
                {
                    opacity: 0,
                    x: 100,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    ease: "power2.out",
                    delay: isDesktop ? index * 0.3 : 0, // Задержка только на десктопе
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: isDesktop ? false : 1, // На десктопе без scrub, на мобиле со scrub
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    // Функция для создания анимации карточек tech-security (разные направления)
    function animateTechSecurityCards(cards) {
        if (cards.length === 0) return;
        
        // Проверяем размер экрана
        const isDesktop = window.innerWidth > 990;
        
        cards.forEach((card, index) => {
            let fromDirection = {};
            
            // Определяем направление анимации для каждой карточки
            if (index === 0) {
                // Первая карточка - слева
                fromDirection = { x: -100, y: 0 };
            } else if (index === 1) {
                // Вторая карточка - сверху (центр)
                fromDirection = { x: 0, y: -100 };
            } else if (index === 2) {
                // Третья карточка - справа
                fromDirection = { x: 100, y: 0 };
            } else {
                // Для дополнительных карточек (если есть) - справа
                fromDirection = { x: 100, y: 0 };
            }
            
            gsap.fromTo(card, 
                {
                    opacity: 0,
                    x: fromDirection.x,
                    y: fromDirection.y,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: isDesktop ? false : 1, // На десктопе без scrub, на мобиле со scrub
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    // Применяем анимацию к protection cards
    animateProtectionCards(protectionCards);
    
    // Применяем анимацию к advantages cards
    animateAdvantagesCards(advantagesCards);
    
    // Применяем анимацию к tech-security cards
    animateTechSecurityCards(techSecurityCards);
});
