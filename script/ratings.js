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
  { user: "Alice", date: "2024-10-01", comment: "Amazing service! Highly recommend." },
  { user: "Bob", date: "2024-10-02", comment: "Not what I expected, but still decent." },
  { user: "Charlie", date: "2024-10-03", comment: "Had a great experience!" },
  { user: "David", date: "2024-10-04", comment: "Service was okay, could use some improvement." },
  { user: "Eve", date: "2024-10-05", comment: "Absolutely loved it! Will come back again." },
  { user: "Frank", date: "2024-10-06", comment: "Would not recommend, had a bad experience." },
  { user: "Grace", date: "2024-10-07", comment: "Service exceeded my expectations." },
  { user: "Hank", date: "2024-10-08", comment: "Very satisfied with the service provided." },
  { user: "Ivy", date: "2024-10-09", comment: "The staff were friendly and helpful." },
  { user: "Jack", date: "2024-10-10", comment: "I will definitely be back!" }
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
  document.getElementById('averageRating').innerText = averageRating.toFixed(1);
  document.getElementById('totalReviews').innerText = totalReviews;

  // Update progress bars
  const ratingProgressBars = document.getElementById('ratingProgressBars');
  ratingProgressBars.innerHTML = ''; // Clear existing bars
  ratingData.forEach(data => {
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';

   
const label = document.createElement('span');
label.innerText = `${data.star} `; 

const star = document.createElement('span');
star.innerHTML = '&#9733;'; 
star.style.color = 'gold'; 

// Append the star to the label
label.appendChild(star);


    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const percentage = (data.count / totalReviews * 100) || 0;
    progressBar.style.width = `${percentage}%`;
    
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = `${percentage}%`;

    // Create a span to display the percentage
    const percentageLabel = document.createElement('span');
    percentageLabel.innerText = `${percentage.toFixed(1)}%`; // Format the percentage
    percentageLabel.style.marginLeft = '8px'; 
    percentageLabel.style.fontWeight = 'bold'; 

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

  sortedReviews.forEach(review => {
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

    // Append the star rating, user name, and review text to the review item
    reviewItem.appendChild(starContainer);
    reviewItem.innerHTML += `<p><strong>${review.user}</strong></p>`;
    reviewItem.innerHTML += `<p><small>${formatDate(review.date)}</small></p>`; // Use formatDate function here
    reviewItem.innerHTML += `<p> ${review.text || 'No review text provided.'}</p>`;
    reviewList.appendChild(reviewItem);
  });
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


