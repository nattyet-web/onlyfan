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
  // Filter items based on search query
  const filtered = allItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  // Paginate
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Render grid
  const grid = document.getElementById('grid');
  grid.innerHTML = paginatedItems.map(item => `
    <div class="item">
      ${item.type === 'image' ? 
        `<img src="${item.url}" alt="${item.title}">` : 
        `<video controls src="${item.url}"></video>`}
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');

  // Render pagination buttons
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    return `<button class="${pageNumber === page ? 'active' : ''}" onclick="changePage(${pageNumber})">${pageNumber}</button>`;
  }).join('');
}

// Change page
function changePage(page) {
  currentPage = page;
  renderGrid(currentPage, document.getElementById('searchInput').value);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
  currentPage = 1;
  renderGrid(currentPage, e.target.value);
});
