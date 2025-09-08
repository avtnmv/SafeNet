const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      if (entry.target.classList.contains('animate')) {
        entry.target.classList.add('show');
      }
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.animate, .animate-fade-in-up').forEach(el => observer.observe(el));

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









