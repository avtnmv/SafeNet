document.addEventListener('DOMContentLoaded', function() {
    const dropdownTrigger = document.getElementById('dropdown-trigger');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const navItemLineContainer = document.querySelector('.nav-item-line-container');
    const navList = document.querySelector('.nav-list');

    if (!dropdownTrigger || !dropdownMenu || !navItemLineContainer || !navList) {
        console.error('Dropdown elements not found');
        return;
    }

    let isDropdownOpen = false;

    const toggleDropdown = () => {
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            dropdownMenu.classList.add('show');
            navItemLineContainer.classList.add('active');
            navList.classList.add('dropdown-open');
        } else {
            dropdownMenu.classList.remove('show');
            navItemLineContainer.classList.remove('active');
            navList.classList.remove('dropdown-open');
        }
    };

    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown();
    });


    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && !e.target.closest('.dropdown-menu')) {
            if (isDropdownOpen) {
                toggleDropdown();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isDropdownOpen) {
            toggleDropdown();
        }
    });

    // Burger Dropdown Menu
    const burgerDropdownTrigger = document.getElementById('burger-dropdown-trigger');
    const burgerDropdownMenu = document.getElementById('burger-dropdown-menu');
    const burgerNavItemLineContainer = document.querySelector('.burger-nav-item-line-container');
    
    let isBurgerDropdownOpen = false;

    const toggleBurgerDropdown = () => {
        if (!burgerDropdownTrigger || !burgerDropdownMenu || !burgerNavItemLineContainer) return;
        
        isBurgerDropdownOpen = !isBurgerDropdownOpen;
        
        if (isBurgerDropdownOpen) {
            burgerDropdownMenu.classList.add('show');
            burgerNavItemLineContainer.classList.add('active');
            burgerDropdownTrigger.classList.add('active');
        } else {
            burgerDropdownMenu.classList.remove('show');
            burgerNavItemLineContainer.classList.remove('active');
            burgerDropdownTrigger.classList.remove('active');
        }
    };

    if (burgerDropdownTrigger && burgerDropdownMenu && burgerNavItemLineContainer) {
        burgerDropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBurgerDropdown();
        });

        // Button already doesn't navigate, no need to prevent default for button
    }

    // Close all dropdowns on window resize (desktop/mobile switch)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1124) {
            // Close main dropdown
            if (isDropdownOpen) {
                toggleDropdown();
            }
        } else {
            // Close burger dropdown when switching to mobile
            if (burgerDropdownTrigger && isBurgerDropdownOpen) {
                toggleBurgerDropdown();
            }
        }
    });
});
