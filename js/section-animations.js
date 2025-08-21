// Простая анимация появления секций при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Находим все секции
    const sections = document.querySelectorAll('section');
    
    // Настройки для Intersection Observer
    const observerOptions = {
        threshold: 0.1, // Срабатывает когда 10% секции видно
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
    };

    // Создаем observer для анимации секций
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс для анимации
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем начальные стили и наблюдаем за секциями
    sections.forEach(section => {
        // Начальное состояние - секция невидима и смещена вниз
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        // Начинаем наблюдение за секцией
        sectionObserver.observe(section);
    });
});
