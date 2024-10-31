let currentRating = 0;
let reviews = [];
let currentPage = 1;
const reviewsPerPage = 2;

let ratingData = [
  { star: 5, count: 0 },
  { star: 4, count: 0 },
  { star: 3, count: 0 },
  { star: 2, count: 0 },
  { star: 1, count: 0 }
];

// Array of fake comments with user names and dates
const fakeComments = [
  { user: "Alice", date: "2024-10-01", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis repellendus error, illum quia voluptatem repudiandae consequatur eaque id, nisi, officia ullam! Est nisi illo aliquam voluptates libero? Minima beatae fugit, similique commodi voluptatibus illum ducimus dolorum officiis repellendus repudiandae mollitia qui culpa sed sint! Deleniti illo praesentium dolores dolorum earum.." },
  { user: "Bob", date: "2024-10-02", comment: "Not what I expected, but still decent." },
  { user: "Charlie", date: "2024-10-03", comment: "Had a great experience!" },
  { user: "David", date: "2024-10-04", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis repellendus error, illum quia voluptatem repudiandae consequatur eaque id, nisi, officia ullam! Est nisi illo aliquam voluptates libero? Minima beatae fugit, similique commodi voluptatibus illum ducimus dolorum officiis repellendus repudiandae mollitia qui culpa sed sint! Deleniti illo praesentium dolores dolorum earum.." },
  { user: "Eve", date: "2024-10-05", comment: "Absolutely loved it! Will come back again." },
  { user: "Frank", date: "2024-10-06", comment: "Would not recommend, had a bad experience." },
  { user: "Grace", date: "2024-10-07", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis repellendus error, illum quia voluptatem repudiandae consequatur eaque id, nisi, officia ullam! Est nisi illo aliquam voluptates libero? Minima beatae fugit, similique commodi voluptatibus illum ducimus dolorum officiis repellendus repudiandae mollitia qui culpa sed sint! Deleniti illo praesentium dolores dolorum earum." },
  { user: "Hank", date: "2024-10-08", comment: "Very satisfied with the service provided." },
  { user: "Ivy", date: "2024-10-09", comment: "The staff were friendly and helpful." },
  { user: "Jack", date: "2024-10-10", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis repellendus error, illum quia voluptatem repudiandae consequatur eaque id, nisi, officia ullam! Est nisi illo aliquam voluptates libero? Minima beatae fugit, similique commodi voluptatibus illum ducimus dolorum officiis repellendus repudiandae mollitia qui culpa sed sint! Deleniti illo praesentium dolores dolorum earum." }
];

// Combine old reviews with user names and dates into reviews array
reviews = fakeComments.map(({ user, date, comment }) => ({
  user,
  rating: 0, 
  date: new Date(date), 
  text: comment,
}));

// Function to format date to "DD MMM YYYY"
function formatDate(date) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

// Function to get a random comment with user and date
function getRandomComment() {
  const randomIndex = Math.floor(Math.random() * fakeComments.length);
  const { user, date, comment } = fakeComments[randomIndex];
  return `${user} ${0} ${formatDate(new Date(date))} - ${comment}`; // Use formatDate function here
}

// Initialize star rating system
const starContainer = document.getElementById('starRating');
for (let i = 1; i <= 5; i++) {
  const star = document.createElement('span');
  star.innerText = '★';
  star.classList.add('star', 'unselected');
  star.onclick = () => rateService(i);
  starContainer.appendChild(star);
}

// Function to handle star rating selection
function rateService(stars) {
  currentRating = stars;
  document.querySelectorAll('.star').forEach((star, index) => {
    if (index < stars) {
      star.classList.add('selected');
      star.classList.remove('unselected');
    } else {
      star.classList.add('unselected');
      star.classList.remove('selected');
    }
  });
}

// Function to submit a review
function submitReview() {
  const reviewText = document.getElementById('reviewText').value;
  if (currentRating === 0) {
    alert('Please select a rating.');
    return;
  }

  const newReview = {
    user: "You", // I will replace with actual user name if available
    rating: currentRating,
    text: reviewText,
    date: new Date()
  };

  reviews.push(newReview);
  ratingData.find(r => r.star === currentRating).count += 1;
  updateRatingSummary();
  displayReviews();
  document.getElementById('reviewText').value = '';
  alert('Review submitted successfully!');
}

// Function to calculate and display rating summary
function updateRatingSummary() {
  const totalReviews = reviews.length;
  const ratingBaseOnStars = ratingData.reduce((sum, { star, count }) => sum + (star * count), 0);
  const averageRating = (ratingBaseOnStars / totalReviews) || 0;

  // Update the average rating text and total reviews
  document.getElementById('averageRating').innerText = averageRating.toFixed(1);
  document.getElementById('totalReviews').innerText = totalReviews;

  // Display stars according to the average rating
  const starContainer = document.querySelector('.progress-star');
  starContainer.innerHTML = ''; // Clear existing stars

  // Calculate full, half, and empty stars based on average rating
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Append full stars
  for (let i = 0; i < fullStars; i++) {
    const fullStar = document.createElement('span');
    fullStar.innerHTML = '&#9733;'; // Filled star
    fullStar.style.color = 'gold';
    starContainer.appendChild(fullStar);
  }

  // Append half star if needed
  if (hasHalfStar) {
    const halfStar = document.createElement('span');
    halfStar.innerHTML = '&#9733;';
    halfStar.style.color = 'gold';
    halfStar.style.opacity = '0.5'; // Styling to indicate half-filled star
    starContainer.appendChild(halfStar);
  }

  // Append empty stars
  for (let i = 0; i < emptyStars; i++) {
    const emptyStar = document.createElement('span');
    emptyStar.innerHTML = '&#9733;';
    emptyStar.style.color = '#ccc'; // empty stars
    starContainer.appendChild(emptyStar);
  }

  // Update progress bars for each star rating
  const ratingProgressBars = document.getElementById('ratingProgressBars');
  ratingProgressBars.innerHTML = ''; // Clear existing bars
  ratingData.forEach(data => {
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';

    // Label with star rating and star icon
    const label = document.createElement('span');
    label.innerText = `${data.star} `;
    
    const star = document.createElement('span');
    star.innerHTML = '&#9733;';
    star.style.color = 'gold';

    label.appendChild(star);

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const percentage = (data.count / totalReviews * 100) || 0;
    progressBar.style.width = `${percentage}%`;
    
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = `${percentage}%`;

    // Percentage label
    const percentageLabel = document.createElement('span');
    percentageLabel.innerText = `${percentage.toFixed(1)}%`;
    percentageLabel.style.marginLeft = '8px';
    percentageLabel.style.fontWeight = 'bold';

    // Append elements to progress bar container
    progressBar.appendChild(progress);
    progressBarContainer.appendChild(label);
    progressBarContainer.appendChild(progressBar);
    progressBarContainer.appendChild(percentageLabel); 
    ratingProgressBars.appendChild(progressBarContainer);
  });
}

// Function to display reviews
function displayReviews() {
  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = ''; // Clear existing reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    const sortOption = document.getElementById('sortOption').value;
    return sortOption === 'newest' ? b.date - a.date : a.date - b.date;
  });

  sortedReviews.forEach((review, index) => {
    const reviewItem = document.createElement('li');
    reviewItem.className = 'review-item';

    const userIcon = document.createElement('i');
    userIcon.className = 'fas fa-user';
    userIcon.style.color = 'blue';
    userIcon.style.fontSize = '24px';
    userIcon.style.marginRight = '10px'; // Add space between icon and text

    // Append the user icon to the review item
    reviewItem.appendChild(userIcon);
    // Create stars based on the rating
    const starContainer = document.createElement('div');
    starContainer.className = 'star-rating';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.innerText = '★';
      star.className = (i <= review.rating) ? 'star selected' : 'star unselected';
      starContainer.appendChild(star);
    }

    // Append the star rating, user name, and review text to the review item
    reviewItem.appendChild(starContainer);
    reviewItem.innerHTML += `<p><strong>${review.user}</strong></p>`;
    reviewItem.innerHTML += `<p><small>${formatDate(review.date)}</small></p>`;
    reviewItem.innerHTML += `<p>${review.text || 'No review text provided.'}</p>`;

    // Add the 3-dot icon with edit/delete options
    const actionContainer = document.createElement('div');
    actionContainer.className = 'review-action-btn';
    actionContainer.innerHTML = `
      <span class="ellipsis-icon">⋮</span>
      <div class="action-menu" style="display: none;">
        <a href="#" data-index="${index}" class="edit-review">Edit</a>
        <a href="#" data-index="${index}" class="delete-review">Delete</a>
      </div>
    `;

    // Append the action container to the review item
    reviewItem.appendChild(actionContainer);
    reviewList.appendChild(reviewItem);
  });

  // event listeners for the ellipsis icon and actions
  document.querySelectorAll('.ellipsis-icon').forEach(icon => {
    icon.addEventListener('click', toggleActionMenu);
  });
  document.querySelectorAll('.edit-review').forEach(btn => {
    btn.addEventListener('click', handleEditReview);
  });
  document.querySelectorAll('.delete-review').forEach(btn => {
    btn.addEventListener('click', handleDeleteReview);
  });
}

// Function to toggle the action menu
function toggleActionMenu(event) {
  const menu = event.target.nextElementSibling;
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

// Function to handle editing a review
function handleEditReview(event) {
  event.preventDefault();
  const reviewIndex = event.target.getAttribute('data-index');
  const review = reviews[reviewIndex];
  
  // Prompt user to edit the review c
  const newReviewText = prompt('Edit your review:', review.text);
  if (newReviewText !== null) {
    review.text = newReviewText;
    displayReviews(); // Re-render reviews after editing
  }
}

// Function to handle deleting a review
function handleDeleteReview(event) {
  event.preventDefault();
  const reviewIndex = event.target.getAttribute('data-index');

  // Confirm deletion and remove the review if confirmed
  if (confirm('Are you sure you want to delete this review?')) {
    reviews.splice(reviewIndex, 1);
    displayReviews(); // Re-render reviews after deletion
  }
}

// Function to display reviews with pagination
function displayReviews() {
  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = ''; // Clear existing reviews
  const sortedReviews = [...reviews].sort((a, b) => b.date - a.date);
  
  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  
  // Get reviews for current page
  const paginatedReviews = sortedReviews.slice(startIndex, endIndex);
  
  paginatedReviews.forEach(review => {
    const reviewItem = document.createElement('li');
    reviewItem.className = 'review-item';

    // Create stars based on the rating
    const starContainer = document.createElement('div');
    starContainer.className = 'star-rating';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.innerText = '★';
      star.className = (i <= review.rating) ? 'star selected' : 'star unselected'; // Select or unselect star
      starContainer.appendChild(star);
    }

    // Create a container for user and star rating
    const userStarContainer = document.createElement('div');
    userStarContainer.className = 'user-star-container';

    // Append user name and star container to user-star container
    userStarContainer.innerHTML = `<strong>${review.user}</strong>`;
    userStarContainer.appendChild(starContainer);

    // Append user-star container, date, and review text to the review item
    reviewItem.appendChild(userStarContainer);
    reviewItem.innerHTML += `<p><small>${formatDate(review.date)}</small></p>`;
    reviewItem.innerHTML += `<p>${review.text || 'No review text provided.'}</p>`;
    reviewList.appendChild(reviewItem);
});

// Update pagination info
updatePaginationInfo();
}
// Function to update pagination info
function updatePaginationInfo() {
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Disable/enable buttons based on current page
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;

  // Render page numbers
  renderPageNumbers(totalPages);
}

// Function to render page numbers
function renderPageNumbers(totalPages) {
  const pageNumbersContainer = document.getElementById('pageNumbers');
  pageNumbersContainer.innerHTML = ''; // Clear existing page numbers

  const displayCount = 3; // Number of page numbers to display before and after current page
  let startPage = Math.max(1, currentPage - displayCount);
  let endPage = Math.min(totalPages, currentPage + displayCount);

  // Adjust start and end pages if close to the start or end
  if (currentPage <= displayCount) {
    endPage = Math.min(totalPages, displayCount * 2);
  }
  if (currentPage + displayCount >= totalPages) {
    startPage = Math.max(1, totalPages - displayCount * 2);
  }

  // Create and append page number buttons
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.onclick = () => {
      currentPage = i;
      displayReviews();
    };
    pageButton.className = currentPage === i ? 'active' : ''; 
    pageNumbersContainer.appendChild(pageButton);
  }
}

// Function to change page
function changePage(direction) {
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  currentPage += direction;
  
  // Ensure currentPage stays within bounds
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  
  displayReviews(); // Refresh displayed reviews
}

// Initial display of reviews
displayReviews();


