let currentPage = 1;
const itemsPerPage = 12;
let allItems = [];

// Load data from JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allItems = data.items;
    renderGrid(currentPage);
  })
  .catch(error => console.error('Error loading data:', error));

function renderGrid(page, query = '') {
  const grid = document.getElementById('gallery');
  grid.innerHTML = '';

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  paginatedItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('grid-item');

    if (item.type === 'image') {
      itemDiv.innerHTML = `<img src="${item.url}" alt="${item.title}">
                           <p class="description">${item.description}</p>`;
    } else if (item.type === 'video') {
      itemDiv.innerHTML = `<iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>
                           <p class="description">${item.description}</p>`;
    }

    grid.appendChild(itemDiv);
  });

  // Scroll to top when changing pages
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search functionality
document.getElementById('searchBox').addEventListener('input', (event) => {
  renderGrid(currentPage, event.target.value);
});

// Pagination buttons
document.getElementById('nextPage').addEventListener('click', () => {
  if (currentPage * itemsPerPage < allItems.length) {
    currentPage++;
    renderGrid(currentPage);
  }
});

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderGrid(currentPage);
  }
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});