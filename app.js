const productsContainer = document.getElementById("products-container");
const header = document.getElementById("header");
const banner = document.getElementById("banner");
const infoSections = document.getElementById("info-sections");

// ===============================
// LOAD BOTH JSON FILES
// ===============================

Promise.all([
  fetch("./data/products.json"),
  fetch("./data/sections.json")
])
  .then(async ([productsResponse, sectionsResponse]) => {

    // Check for errors
    if (!productsResponse.ok) {
      throw new Error("Failed to load products.");
    }

    if (!sectionsResponse.ok) {
      throw new Error("Failed to load sections.");
    }

    // Convert JSON
    const products = await productsResponse.json();
    const sections = await sectionsResponse.json();

    renderProducts(products);
    renderSections(sections);
  })
  .catch((error) => {
    console.error(error);

    document.body.innerHTML += `
      <div class="error">
        Something went wrong while loading the page data.
      </div>
    `;
  });

// ===============================
// RENDER PRODUCTS
// ===============================

function renderProducts(products) {

  products.forEach((product) => {

    // Create product card
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Create image
    const image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.title;

    // Create title
    const title = document.createElement("h3");
    title.textContent = product.title;

    // Create price
    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    // Product details link
    const link = document.createElement("a");
    link.href = `product.html?id=${product.id}`;
    link.textContent = "View Details";

    // Append elements
    card.append(image, title, price, link);

    productsContainer.appendChild(card);
  });
}

// ===============================
// RENDER SECTIONS
// ===============================

function renderSections(data) {

  // Header text
  const heading = document.createElement("h1");
  heading.textContent = data.headerText;

  header.appendChild(heading);

  // Banner image
  const bannerImage = document.createElement("img");
  bannerImage.src = data.bannerImage;
  bannerImage.alt = "Banner";
  bannerImage.style.width = "100%";

  banner.appendChild(bannerImage);

  // Info sections
  data.infoSections.forEach((section) => {

    const block = document.createElement("div");
    block.classList.add("info-block");

    const title = document.createElement("h2");
    title.textContent = section.title;

    const content = document.createElement("p");
    content.textContent = section.content;

    block.append(title, content);

    infoSections.appendChild(block);
  });
}
