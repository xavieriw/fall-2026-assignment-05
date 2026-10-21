import products from './data/products.json';

const PRODUCTS_PER_PAGE = 5;

// Keep the footer year current on every page.
document.querySelectorAll('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const grid = document.getElementById('product-grid');

// Only the Store page has a product grid; the rest of this file is store logic.
if (grid) {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicator = document.getElementById('page-indicator');

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  let currentPage = 1;

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.className = 'product-image';
    img.src = product.imageUrl;
    img.alt = product.name;
    img.loading = 'lazy';

    const body = document.createElement('div');
    body.className = 'product-body';

    const badge = document.createElement('span');
    badge.className = 'category-badge';
    badge.textContent = product.category;

    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.name;

    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = priceFormatter.format(product.price);

    body.append(badge, title, description, price);
    card.append(img, body);
    return card;
  }

  function renderPage(page) {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const pageItems = products.slice(start, start + PRODUCTS_PER_PAGE);

    grid.replaceChildren(...pageItems.map(createProductCard));

    indicator.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage(currentPage);
    }
  });

  renderPage(currentPage);
}
