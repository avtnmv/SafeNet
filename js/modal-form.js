// Модальное окно с формой "Залиште заявку і ми зв'яжимося з вами"
class ModalForm {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.form = null;
        this.timer = null;
        this.hasShown = false;
        
        this.init();
    }

    init() {
        // Проверяем, есть ли уже показанное модальное окно в сессии
        if (sessionStorage.getItem('modalFormShown') === 'true') {
            return;
        }

        // Запускаем таймер на 30 секунд
        this.startTimer();
        
        // Обработчик для показа модального окна при скролле (опционально)
        this.handleScroll();
    }

    startTimer() {
        this.timer = setTimeout(() => {
            this.showModal();
        }, 30000); // 30 секунд
    }

    handleScroll() {
        let scrollTimer = null;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                // Показываем модальное окно после 30 секунд на сайте И при скролле
                if (!this.hasShown && Date.now() - this.pageLoadTime >= 30000) {
                    this.showModal();
                }
            }, 100);
        });
    }

    createModal() {
        // Создаем оверлей
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Создаем модальное окно
        this.modal = document.createElement('div');
        this.modal.className = 'modal-form';
        this.modal.style.cssText = `
            overflow-y: auto;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        this.form = document.createElement('form');
        this.form.className = 'consultation__form modal-form__form';
        this.form.innerHTML = `
            <button type="button" class="modal-form__close" aria-label="Закрити">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <h3 class="consultation__form-title">Залиште заявку і ми зв'яжимося з вами</h3>
            
            <div class="consultation__form-inputs">
                <input type="text" placeholder="Ім'я" class="consultation__input" id="modalFirstName" required>
                <input type="tel" placeholder="Телефон" class="consultation__input" id="modalPhone">
                <input type="email" placeholder="E-mail" class="consultation__input" id="modalEmail">
            </div>
            
            <button type="submit" class="consultation__btn">Отримати консультацію</button>
        `;

        // Добавляем стили
        this.addStyles();

        // Собираем модальное окно
        this.modal.appendChild(this.form);
        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);

        // Обработчики событий
        this.addEventListeners();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Стили для модального окна - используем те же стили что и consultation__form */
            .modal-form .consultation__form {
                width: 610px;
                height: 503px;
                background: rgba(240, 240, 240, 0.07);
                background-blend-mode: plus-lighter;
                box-shadow: inset 2px 2.00046px 9px rgba(255, 255, 255, 0.12), inset 1px 1px 4px rgba(255, 255, 255, 0.12);
                backdrop-filter: blur(7.5px);
                border-radius: 24px;
                padding: 48px;
                display: flex;
                flex-direction: column;
                position: relative;
            }

            .modal-form .consultation__form-title {
                font-family: var(--font-heading, 'Inter', sans-serif);
                font-weight: 600;
                font-size: clamp(25px, 2.2vw, 28px);
                color: #fff;
                margin-bottom: 32px;
                line-height: 120%;
                text-align: left;
            }

            .modal-form .consultation__form-inputs {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 32px;
            }

            .modal-form .consultation__input {
                width: 100%;
                height: 60px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 0 20px;
                font-family: var(--font-paragraph, 'Inter', sans-serif);
                font-size: 16px;
                color: #fff;
                transition: all 0.3s ease-in-out;
            }

            .modal-form .consultation__input::placeholder {
                color: #9B9B9B;
            }

            .modal-form .consultation__input:focus {
                outline: none;
                border-color: #A083F7;
                background: rgba(255, 255, 255, 0.15);
            }

            .modal-form .consultation__btn {
                background: #A083F7;
                box-shadow: inset 0px 0px 12px #FFFFFF, inset 0px -24px 32px rgba(255, 255, 255, 0.22), inset 0px 8px 24px -16px rgba(255, 255, 255, 0.24);
                border-radius: 100px;
                width: 100%;
                height: 59px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-paragraph, 'Inter', sans-serif);
                font-size: 16px;
                font-weight: 500;
                color: #fff;
                border: none;
                cursor: pointer;
                position: relative;
                z-index: 10;
                transition: all 0.3s ease-in-out;
            }

            .modal-form .consultation__btn::before {
                content: '';
                position: absolute;
                top: -0.5px;
                left: -0.5px;
                right: -0.5px;
                bottom: -0.5px;
                background: radial-gradient(36.87% 66.76% at 50% 50%, #A083F7 0%, #27009D 100%);
                border-radius: 100px;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                z-index: -1;
            }

            .modal-form .consultation__btn:hover::before {
                opacity: 1;
            }

            .modal-form .consultation__btn:hover {
                box-shadow: inset 0px 0px 12px #FFFFFF, inset 0px -24px 32px rgba(255, 255, 255, 0.22), inset 0px 8px 24px -16px rgba(255, 255, 255, 0.24);
            }

            /* Кнопка закрытия модального окна */
            .modal-form__close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                color: #fff;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: background-color 0.2s ease;
                z-index: 20;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-form__close:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            /* Адаптивность для мобильных устройств */
            @media (max-width: 768px) {
                .modal-form .consultation__form {
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    padding: 32px 24px;
                    margin: 20px;
                }

                .modal-form .consultation__form-title {
                    font-size: 20px;
                    margin-bottom: 24px;
                }

                .modal-form .consultation__form-inputs {
                    gap: 8px;
                    margin-bottom: 24px;
                }

                .modal-form .consultation__input {
                    height: 50px;
                    font-size: 14px;
                }

                .modal-form .consultation__btn {
                    height: 50px;
                    font-size: 14px;
                }

                .modal-form__close {
                    top: 15px;
                    right: 15px;
                    width: 35px;
                    height: 35px;
                }
            }

            @media (max-width: 480px) {
                .modal-form .consultation__form {
                    padding: 24px 20px;
                    margin: 15px;
                }

                .modal-form .consultation__form-title {
                    font-size: 18px;
                    margin-bottom: 20px;
                }

                .modal-form .consultation__form-inputs {
                    gap: 6px;
                    margin-bottom: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        // Закрытие по клику на оверлей
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hideModal();
            }
        });

        // Закрытие по кнопке закрытия
        const closeBtn = this.form.querySelector('.modal-form__close');
        closeBtn.addEventListener('click', () => {
            this.hideModal();
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.style.display !== 'none') {
                this.hideModal();
            }
        });

        // Обработка отправки формы
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Валидация телефона
        const phoneInput = this.form.querySelector('#modalPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                this.validatePhone(e.target);
            });
        }
    }

    validatePhone(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('380')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+38' + value;
            } else if (!value.startsWith('+')) {
                value = '+380' + value;
            }
        }
        input.value = value;
    }

    handleFormSubmit() {
        const firstName = this.form.querySelector('#modalFirstName').value.trim();
        const phone = this.form.querySelector('#modalPhone').value.trim();
        const email = this.form.querySelector('#modalEmail').value.trim();
        
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
        
        // Если валидация прошла успешно, отправляем данные на Formspree через Fetch API
        const formData = {
            firstName: firstName,
            phone: phone,
            email: email
        };
        
        // Показываем индикатор загрузки
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Відправляємо...';
        submitButton.disabled = true;
        
        fetch('https://formspree.io/f/mjkraddq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Показываем сообщение об успехе
                alert('Дякуємо! Ми зв\'яжимося з вами найближчим часом.');
                
                // Закрываем модальное окно
                this.hideModal();
                
                // Отслеживаем событие для аналитики
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'engagement',
                        event_label: 'modal_form_submit'
                    });
                }

                // Facebook Pixel событие
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        content_name: 'Modal Form Submitted',
                        content_category: 'Lead Generation'
                    });
                }
            } else {
                throw new Error('Помилка відправки форми');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Вибачте, сталася помилка при відправці форми. Спробуйте ще раз або зв\'яжіться з нами іншим способом.');
        })
        .finally(() => {
            // Восстанавливаем кнопку
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }

    showModal() {
        if (this.hasShown) return;
        
        this.hasShown = true;
        this.createModal();

        // Анимация появления
        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
            this.modal.style.transform = 'scale(1)';
        });

        // Сохраняем в sessionStorage, что модальное окно было показано
        sessionStorage.setItem('modalFormShown', 'true');

        // Отслеживаем событие для аналитики
        if (typeof gtag !== 'undefined') {
            gtag('event', 'modal_form_shown', {
                event_category: 'engagement',
                event_label: '30_second_timer'
            });
        }

        // Facebook Pixel событие
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Modal Form Shown',
                content_category: 'Lead Generation'
            });
        }
    }

    hideModal() {
        if (!this.modal) return;

        // Анимация скрытия
        this.overlay.style.opacity = '0';
        this.modal.style.transform = 'scale(0.8)';

        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            this.modal = null;
            this.overlay = null;
            this.form = null;
        }, 300);
    }

    destroy() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.modal) {
            this.hideModal();
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Сохраняем время загрузки страницы
    window.pageLoadTime = Date.now();
    
    // Создаем экземпляр модального окна
    window.modalForm = new ModalForm();
});

// Очистка при выгрузке страницы
window.addEventListener('beforeunload', () => {
    if (window.modalForm) {
        window.modalForm.destroy();
    }
});
