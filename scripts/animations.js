// IntersectionObserver для анимаций при появлении элементов в viewport
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Добавляем класс для запуска анимации
      entry.target.classList.add('active'); // для .animate-fade-in-up

      // Если у тебя другие классы для анимации, можно проверить и добавить их здесь
      if (entry.target.classList.contains('animate')) {
        entry.target.classList.add('show');
      }

      // Если анимация однократная — перестаём наблюдать
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

// Наблюдаем за элементами с классом .animate и .animate-fade-in-up
document.querySelectorAll('.animate, .animate-fade-in-up').forEach(el => observer.observe(el));



// Курсор с плавным следованием
const cursor = document.getElementById('custom-cursor');
const cursorWidth = 87;
const cursorHeight = 99;

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

const offsetX = cursorWidth / 2;
const offsetY = cursorHeight / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX - offsetX;
  mouseY = e.clientY - offsetY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();



// Модальное окно
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', () => {
  modalOverlay.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('show');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('show');
  }
});




