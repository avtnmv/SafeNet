// Валидация и форматирование телефонного номера и email
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (phoneInput) {
        let isPhoneFocused = false;
        
        // При фокусе добавляем +
        phoneInput.addEventListener('focus', function(e) {
            isPhoneFocused = true;
            if (e.target.value === '' || e.target.value === 'Телефон') {
                e.target.value = '+';
                e.target.placeholder = '';
                setTimeout(() => {
                    e.target.setSelectionRange(1, 1);
                }, 0);
            }
        });
        
        // При потере фокуса возвращаем плейсхолдер если поле пустое
        phoneInput.addEventListener('blur', function(e) {
            isPhoneFocused = false;
            if (e.target.value === '+' || e.target.value === '') {
                e.target.value = '';
                e.target.placeholder = 'Телефон';
            }
        });
        
        // Обработка ввода
        phoneInput.addEventListener('input', function(e) {
            if (!isPhoneFocused) return;
            
            let value = e.target.value.replace(/\D/g, ''); // Удаляем все не-цифры
            
            // Если поле пустое или только +, оставляем +
            if (value === '') {
                e.target.value = '+';
                return;
            }
            
            // Оставляем только + и цифры
            e.target.value = '+' + value;
        });
        
        // Предотвращаем удаление + в начале
        phoneInput.addEventListener('keydown', function(e) {
            if (!isPhoneFocused) return;
            
            const cursorPosition = e.target.selectionStart;
            
            // Если пытаются удалить + в начале
            if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 1) {
                e.preventDefault();
            }
        });
        
        // При клике устанавливаем курсор после +
        phoneInput.addEventListener('click', function(e) {
            if (isPhoneFocused && e.target.value.startsWith('+')) {
                setTimeout(() => {
                    const position = Math.max(1, e.target.selectionStart);
                    e.target.setSelectionRange(position, position);
                }, 0);
            }
        });
    }
    
    // Валидация email
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const email = e.target.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                e.target.style.borderColor = '#ff6b6b';
                e.target.style.background = 'rgba(255, 107, 107, 0.1)';
            } else {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        emailInput.addEventListener('input', function(e) {
            // Сброс стилей при вводе
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    }
    
    // Обработка отправки формы
    const consultationForm = document.querySelector('.consultation__form');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Валидация имени
            if (!firstName || firstName.length < 2) {
                alert('Будь ласка, введіть коректне ім\'я');
                return;
            }
            
            // Валидация телефона
            if (!phone || phone.length < 4 || !phone.startsWith('+')) {
                alert('Будь ласка, введіть коректний номер телефону');
                return;
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Будь ласка, введіть коректну електронну пошту');
                return;
            }
            
            // Здесь можно добавить отправку данных на сервер
            alert('Дякуємо! Ми зв\'яжемося з вами найближчим часом.');
            
            // Очищаем форму
            consultationForm.reset();
            if (phoneInput) {
                phoneInput.placeholder = 'Телефон';
            }
        });
    }
});
