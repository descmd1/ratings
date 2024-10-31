

// const images = document.querySelectorAll('.card-image img');
// let currentIndex = 0;

// function animateImages() {
//   // Remove active class from the current image
//   images[currentIndex].classList.remove('active');
  
//   // Move to the next image in the array
//   currentIndex = (currentIndex + 1) % images.length;

//   // Add active class to the next image
//   images[currentIndex].classList.add('active');
// }

// // Initialize by setting the first image as active
// images[currentIndex].classList.add('active');

// // Animate images every 2 seconds
// setInterval(animateImages, 5000);


const images = document.querySelectorAll('.card-image img');
let currentIndex = 0;

function animateImages() {
  // Remove active class from all images
  images.forEach(img => img.classList.remove('active'));
  
  // Animate the first two images together
  images[currentIndex].classList.add('active');
  images[(currentIndex + 1) % images.length].classList.add('active');

  // Update the index to move to the next set
  currentIndex = (currentIndex + 2) % images.length;
}

// Initialize by setting the first two images as active
images[0].classList.add('active');
images[1].classList.add('active');

// Animate images every 5 seconds
setInterval(animateImages, 5000);
