const burgerMenu = document.getElementById("burger-menu");
const burgerIcon = document.getElementById("burger-icon");
const logo = document.querySelector('.logo');
const burgerLinks = document.querySelectorAll('.burger-menu a:not(.burger-dropdown-link)');

const toggleMenu = () => {
  const show = !burgerMenu.classList.contains('show');
  burgerMenu.classList.toggle('show', show);
  burgerIcon.classList.toggle('active', show);
  document.body.classList.toggle('no-scroll', show);
  

  if (!show && logo) {
    logo.style.zIndex = '12';
  }
};

burgerIcon.addEventListener('click', toggleMenu);

burgerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            window.location.href = link.href;
        }, 100);
        toggleMenu();
    });
});

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

burgerMenu.addEventListener('scroll', handleBurgerMenuScroll);

window.addEventListener('resize', () => {
    if (window.innerWidth > 1124) {
        if (burgerMenu.classList.contains('show')) {
            burgerMenu.classList.remove('show');
            burgerIcon.classList.remove('active');
            document.body.classList.remove('no-scroll');
            if (logo) {
                logo.style.zIndex = '12';
            }
        }
    }
});
