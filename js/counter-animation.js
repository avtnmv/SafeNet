class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.our-mission__card-number');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });

        const cardsContainer = document.querySelector('.our-mission__cards');
        if (cardsContainer) {
            observer.observe(cardsContainer);
        }
    }

    animateCounters() {
        const animationData = [
            { start: 85, end: 168 }, 
            { start: 12, end: 48 },   
            { start: 8, end: 36 },    
            { start: 45, end: 86 }    
        ];
        
        this.counters.forEach((counter, index) => {
            const currentValue = counter.textContent.trim();
            const isPercentage = currentValue.includes('%');
            const data = animationData[index];
            
            if (data) {
                counter.textContent = isPercentage ? data.start + '%' : data.start;
                
                this.animateNumber(counter, data.start, data.end, isPercentage, 3500 + (index * 300));
            }
        });
    }

    animateNumber(element, start, end, isPercentage, duration) {
        if (this.isSafari()) {
            this.animateNumberSafari(element, start, end, isPercentage, duration);
            return;
        }
        
        const startTime = performance.now();
        let lastValue = start;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(start + (end - start) * easeOut);
            
            if (currentValue !== lastValue) {
                element.textContent = isPercentage ? currentValue + '%' : currentValue;
                lastValue = currentValue;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = isPercentage ? end + '%' : end;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    animateNumberSafari(element, start, end, isPercentage, duration) {
        const steps = Math.min(60, Math.abs(end - start));
        const stepDuration = duration / steps;
        const increment = (end - start) / steps;
        let currentValue = start;
        let step = 0;
        
        const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 2);
            currentValue = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = isPercentage ? currentValue + '%' : currentValue;
            
            if (step >= steps) {
                clearInterval(interval);
                element.textContent = isPercentage ? end + '%' : end;
            }
        }, stepDuration);
    }
    
    isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CounterAnimation();
});
