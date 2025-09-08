document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    
    const protectionCards = gsap.utils.toArray('.protection__card');
    const advantagesCards = gsap.utils.toArray('.advantages__card');
    const techSecurityCards = gsap.utils.toArray('.tech-security__card');
    
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
                        scrub: 1,
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    function animateAdvantagesCards(cards) {
        if (cards.length === 0) return;
        
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
                    delay: isDesktop ? index * 0.3 : 0,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: isDesktop ? false : 1,
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    function animateTechSecurityCards(cards) {
        if (cards.length === 0) return;
        
        const isDesktop = window.innerWidth > 990;
        
        cards.forEach((card, index) => {
            let fromDirection = {};
            
            if (index === 0) {
                fromDirection = { x: -100, y: 0 };
            } else if (index === 1) {
                fromDirection = { x: 0, y: -100 };
            } else if (index === 2) {
                fromDirection = { x: 100, y: 0 };
            } else {
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
                        scrub: isDesktop ? false : 1,
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    animateProtectionCards(protectionCards);
    animateAdvantagesCards(advantagesCards);
    animateTechSecurityCards(techSecurityCards);
});
