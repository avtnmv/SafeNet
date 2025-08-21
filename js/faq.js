// FAQ функциональность
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    console.log('FAQ items found:', faqItems.length); // Отладка
    
    faqItems.forEach((item, index) => {
        const header = item.querySelector('.faq__header');
        const content = item.querySelector('.faq__content');
        const answer = item.querySelector('.faq__answer');
        
        console.log(`FAQ item ${index}:`, { header, content, answer }); // Отладка
        
        if (header && content && answer) {
            header.addEventListener('click', function() {
                console.log(`FAQ item ${index} clicked`); // Отладка
                
                const isActive = item.classList.contains('active');
                
                // Закрываем все остальные элементы
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.faq__content');
                        const otherHeader = otherItem.querySelector('.faq__header');
                        if (otherContent) {
                            otherContent.style.maxHeight = '0px';
                        }
                        if (otherHeader) {
                            otherHeader.style.paddingBottom = '30px'; // Возвращаем обычный padding
                        }
                    }
                });
                
                // Переключаем текущий элемент
                if (isActive) {
                    console.log('Closing FAQ item'); // Отладка
                    item.classList.remove('active');
                    content.style.maxHeight = '0px';
                    header.style.paddingBottom = '30px'; // Возвращаем обычный padding
                } else {
                    console.log('Opening FAQ item'); // Отладка
                    item.classList.add('active');
                    
                    // Меняем padding-bottom заголовка на 16px для имитации gap
                    header.style.paddingBottom = '16px';
                    
                    // Временно показываем контент для измерения высоты
                    content.style.maxHeight = 'none';
                    const scrollHeight = content.scrollHeight;
                    content.style.maxHeight = '0px';
                    
                    // Устанавливаем правильную высоту с небольшой задержкой
                    setTimeout(() => {
                        content.style.maxHeight = scrollHeight + 'px';
                    }, 10);
                    
                    console.log('Content height:', scrollHeight); // Отладка
                }
            });
        }
    });
});
