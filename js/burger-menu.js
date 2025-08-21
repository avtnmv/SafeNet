const burgerMenu = document.getElementById("burger-menu");
const burgerIcon = document.getElementById("burger-icon");
const logo = document.querySelector('.logo');
// Получаем все ссылки в бургер меню, исключая ссылки из выпадающего меню
const burgerLinks = document.querySelectorAll('.burger-menu a:not(.burger-dropdown-link)');

const toggleMenu = () => {
  const show = !burgerMenu.classList.contains('show');
  burgerMenu.classList.toggle('show', show);
  burgerIcon.classList.toggle('active', show);
  document.body.classList.toggle('no-scroll', show);
  
  // Reset logo z-index when closing menu
  if (!show && logo) {
    logo.style.zIndex = '12';
  }
};

burgerIcon.addEventListener('click', toggleMenu);

// Закрываем бургер меню при клике на обычные ссылки
burgerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            window.location.href = link.href;
        }, 100);
        toggleMenu();
    });
});

// Закрываем бургер меню при клике на ссылки в выпадающем меню
const dropdownLinks = document.querySelectorAll('.burger-dropdown-link');
dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            window.location.href = link.href;
        }, 100);
        toggleMenu();
    });
});

// Handle logo z-index on burger menu scroll
const handleBurgerMenuScroll = () => {
    if (burgerMenu.classList.contains('show') && logo) {
        const scrollTop = burgerMenu.scrollTop;
        if (scrollTop > 10) {
            logo.style.zIndex = '5';
        } else {
            logo.style.zIndex = '12';
        }
    }
};

// Add scroll listener to burger menu
burgerMenu.addEventListener('scroll', handleBurgerMenuScroll);

// Close burger menu on window resize (desktop/mobile switch)
window.addEventListener('resize', () => {
    if (window.innerWidth > 1124) {
        if (burgerMenu.classList.contains('show')) {
            burgerMenu.classList.remove('show');
            burgerIcon.classList.remove('active');
            document.body.classList.remove('no-scroll');
            // Reset logo z-index when closing menu
            if (logo) {
                logo.style.zIndex = '12';
            }
        }
    }
});
