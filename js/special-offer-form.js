document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('special-offer-form');

    if (!form) {
        return;
    }

    const button = form.querySelector('.special-offer-form__button');
    const status = form.querySelector('.special-offer-form__status');

    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.classList.toggle('is-success', type === 'success');
        status.classList.toggle('is-error', type === 'error');
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        setStatus('Відправляємо заявку...');
        button.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Form submission failed');
            }

            form.reset();
            setStatus('Заявку відправлено. Ми зв\'яжемося з вами найближчим часом.', 'success');

            if (typeof gtag === 'function') {
                gtag('event', 'special_offer_form_submit', {
                    event_category: 'lead',
                    event_label: 'special_offer',
                });
            }

            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
        } catch (error) {
            setStatus('Не вдалося відправити заявку. Спробуйте ще раз або зателефонуйте нам.', 'error');
        } finally {
            button.disabled = false;
        }
    });
});
