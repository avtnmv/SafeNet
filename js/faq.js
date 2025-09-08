
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach((item, index) => {
        const header = item.querySelector('.faq__header');
        const content = item.querySelector('.faq__content');
        const answer = item.querySelector('.faq__answer');
        
        if (header && content && answer) {
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.faq__content');
                        const otherHeader = otherItem.querySelector('.faq__header');
                        if (otherContent) {
                            otherContent.style.maxHeight = '0px';
                        }
                        if (otherHeader) {
                            otherHeader.style.paddingBottom = '30px';
                        }
                    }
                });
                
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = '0px';
                    header.style.paddingBottom = '30px';
                } else {
                    item.classList.add('active');
                    
                    header.style.paddingBottom = '16px';
                    
                    content.style.maxHeight = 'none';
                    const scrollHeight = content.scrollHeight;
                    content.style.maxHeight = '0px';
                    
                    setTimeout(() => {
                        content.style.maxHeight = scrollHeight + 'px';
                    }, 10);
                }
            });
        }
    });
});
