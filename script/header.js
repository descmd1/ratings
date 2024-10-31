const select = document.querySelector('.custom-select');
const selectedOption = document.querySelector('.selected-option');
const options = document.querySelectorAll('.option');

// Toggle dropdown open and close
select.addEventListener('click', (e) => {
  select.classList.toggle('active');
});

// Handle option selection and close dropdown
options.forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the dropdown from toggling back open
    selectedOption.innerHTML = option.innerHTML; // Update selected value
    select.classList.remove('active'); // Close dropdown
  });
});

// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
  if (!select.contains(e.target)) {
    select.classList.remove('active');
  }
});


