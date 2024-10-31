const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Toggle theme and icons
sunIcon.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'inline';
});

moonIcon.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'inline';
});