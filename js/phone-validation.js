document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (phoneInput) {
        let isPhoneFocused = false;
        
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
        
        phoneInput.addEventListener('blur', function(e) {
            isPhoneFocused = false;
            if (e.target.value === '+' || e.target.value === '') {
                e.target.value = '';
                e.target.placeholder = 'Телефон';
            }
        });
        
        phoneInput.addEventListener('input', function(e) {
            if (!isPhoneFocused) return;
            
            let value = e.target.value.replace(/\D/g, '');
            
            if (value === '') {
                e.target.value = '+';
                return;
            }
            
            e.target.value = '+' + value;
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            if (!isPhoneFocused) return;
            
            const cursorPosition = e.target.selectionStart;
            
            if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 1) {
                e.preventDefault();
            }
        });
        
        phoneInput.addEventListener('click', function(e) {
            if (isPhoneFocused && e.target.value.startsWith('+')) {
                setTimeout(() => {
                    const position = Math.max(1, e.target.selectionStart);
                    e.target.setSelectionRange(position, position);
                }, 0);
            }
        });
    }
    
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
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    }
    
    const consultationForm = document.querySelector('.consultation__form');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Имя обязательно
            if (!firstName || firstName.length < 2) {
                alert('Будь ласка, введіть коректне ім\'я');
                return;
            }
            
            // Проверяем, что заполнен хотя бы один контакт (телефон ИЛИ email)
            const hasPhone = phone && phone.length >= 4 && phone.startsWith('+');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const hasEmail = email && emailRegex.test(email);
            
            if (!hasPhone && !hasEmail) {
                alert('Будь ласка, введіть коректний номер телефону або електронну пошту');
                return;
            }
            
            // Если телефон заполнен, но некорректный
            if (phone && !hasPhone) {
                alert('Будь ласка, введіть коректний номер телефону');
                return;
            }
            
            // Если email заполнен, но некорректный
            if (email && !hasEmail) {
                alert('Будь ласка, введіть коректну електронну пошту');
                return;
            }
            
            alert('Дякуємо! Ми зв\'яжемося з вами найближчим часом.');
            
            consultationForm.reset();
            if (phoneInput) {
                phoneInput.placeholder = 'Телефон';
            }
        });
    }
});
