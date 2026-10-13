const products = [
  { id: 1, name: "Maçã", description: "Maçã fresca, crocante e levemente adocicada.", price: 890, unit: "kg", emoji: "🍎" },
  { id: 2, name: "Banana", description: "Banana madura, macia e naturalmente doce.", price: 650, unit: "kg", emoji: "🍌" },
  { id: 3, name: "Laranja", description: "Laranja suculenta, ideal para comer ou fazer suco.", price: 590, unit: "kg", emoji: "🍊" },
  { id: 4, name: "Morango", description: "Morangos frescos, aromáticos e doces.", price: 1290, unit: "caixa", emoji: "🍓" },
  { id: 5, name: "Uva", description: "Uvas doces, sem sementes.", price: 1090, unit: "caixa", emoji: "🍇" },
  { id: 6, name: "Abacaxi", description: "Abacaxi doce e suculento, vendido por unidade.", price: 750, unit: "unidade", emoji: "🍍" },
  { id: 7, name: "Manga", description: "Manga madura, macia e perfumada.", price: 490, unit: "unidade", emoji: "🥭" },
  { id: 8, name: "Melancia", description: "Melancia refrescante, vendida por unidade.", price: 990, unit: "unidade", emoji: "🍉" },
  { id: 9, name: "Pera", description: "Pera fresca, de sabor suave e textura macia.", price: 820, unit: "kg", emoji: "🍐" },
  { id: 10, name: "Limão", description: "Limão fresco, de sabor cítrico e aromático.", price: 450, unit: "kg", emoji: "🍋" },
];

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const storageKey = "fruit-shop-cart";
const pageContent = document.querySelector("#page-content");
const pageTitle = document.querySelector("#page-title");
const notice = document.querySelector("#notice");
const navLinks = [...document.querySelectorAll(".nav-link")];
const catalogQuantities = new Map();

let cart = loadCart();
let orderConfirmation = false;
let noticeTimer;

function loadCart() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return {};

    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Saved cart must be an object.");
    }

    const restored = {};
    for (const [id, quantity] of Object.entries(parsed)) {
      const productExists = products.some((product) => product.id === Number(id));
      if (productExists && Number.isSafeInteger(quantity) && quantity > 0) {
        restored[id] = quantity;
      }
    }
    return restored;
  } catch (error) {
    console.error("Could not load the saved shopping cart.", error);
    showNotice("We could not read your saved cart. Start a new cart or refresh to try again.");
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  } catch (error) {
    console.error("Could not save the shopping cart.", error);
    showNotice("Your cart changed, but this browser could not save it for the next visit.");
  }
}

function formatPrice(cents) {
  return currency.format(cents / 100);
}

function getProduct(id) {
  return products.find((product) => product.id === Number(id));
}

function cartQuantity() {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, quantity]) => ({ product: getProduct(id), quantity }))
    .filter((entry) => entry.product);
}

function cartTotal() {
  return cartEntries().reduce((total, entry) => total + entry.product.price * entry.quantity, 0);
}

function updateCartIndicators() {
  const count = cartQuantity();
  const navCount = document.querySelector("#cart-count");
  const headerCount = document.querySelector("#header-cart-count");
  navCount.textContent = String(count);
  navCount.setAttribute("aria-label", `${count} ${count === 1 ? "item" : "items"} in cart`);
  headerCount.textContent = String(count);
}

function showNotice(message) {
  notice.textContent = message;
  notice.hidden = false;
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    notice.hidden = true;
  }, 4500);
}

function setPage(route) {
  for (const link of navLinks) {
    if (link.dataset.route === route) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  if (route !== "checkout") orderConfirmation = false;
  updateCartIndicators();

  switch (route) {
    case "product-details":
      renderProductDetails();
      break;
    case "shopping-cart":
      renderShoppingCart();
      break;
    case "checkout":
      renderCheckout();
      break;
    default:
      renderProducts();
  }
}

function renderProducts() {
  pageTitle.textContent = "Products";
  pageContent.innerHTML = `
    <p class="intro">Explore fresh fruit, choose a quantity, and add your favorites to the cart.</p>
    <div class="product-grid">
      ${products.map((product) => `
        <article class="product-card">
          <span class="product-emoji" aria-hidden="true">${product.emoji}</span>
          <h2>${product.name}</h2>
          <p class="product-description">${product.description}</p>
          <p class="price">${formatPrice(product.price)} <small>/ ${product.unit}</small></p>
          <div class="card-actions">
            <div class="quantity-control">
              <label for="quantity-${product.id}">Quantity</label>
              <input id="quantity-${product.id}" type="number" min="1" step="1" value="${catalogQuantities.get(product.id) || 1}" data-catalog-quantity="${product.id}">
            </div>
            <a class="button secondary" href="#/product-details?id=${product.id}">Details</a>
            <button class="button" type="button" data-add-product="${product.id}">Add to Cart</button>
          </div>
        </article>
      `).join("")}
    </div>`;
}

function renderProductDetails() {
  pageTitle.textContent = "ProductDetails";
  const route = window.location.hash.slice(1);
  const query = route.includes("?") ? route.slice(route.indexOf("?") + 1) : "";
  const productId = new URLSearchParams(query).get("id");
  const product = productId ? getProduct(productId) : null;

  if (!product) {
    pageContent.innerHTML = `
      <div class="empty-state">
        <div>
          <div class="empty-icon" aria-hidden="true">🍃</div>
          <h2>Product not found</h2>
          <p>Select a fruit from the products page to see its details.</p>
          <a class="button" href="#/products">Back to Products</a>
        </div>
      </div>`;
    return;
  }

  pageContent.innerHTML = `
    <div class="detail-layout">
      <div class="detail-art" aria-label="${product.name}" role="img">${product.emoji}</div>
      <article class="panel detail-copy">
        <p class="eyebrow">FRESH PICK</p>
        <h2>${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="price">${formatPrice(product.price)} <small>/ ${product.unit}</small></p>
        <div class="detail-actions">
          <a class="button secondary" href="#/products">Back to Products</a>
        </div>
      </article>
    </div>`;
}

function renderEmptyState(title, message, linkLabel = "View Products", link = "#/products") {
  pageContent.innerHTML = `
    <div class="empty-state">
      <div>
        <div class="empty-icon" aria-hidden="true">🧺</div>
        <h2>${title}</h2>
        <p>${message}</p>
        <a class="button" href="${link}">${linkLabel}</a>
      </div>
    </div>`;
}

function renderShoppingCart() {
  pageTitle.textContent = "ShoppingCart";
  const entries = cartEntries();
  if (entries.length === 0) {
    renderEmptyState("Your cart is empty", "Choose some fruit to get started.");
    return;
  }

  pageContent.innerHTML = `
    <p class="intro">Review your items, adjust quantities, or remove products before checkout.</p>
    <div class="table-wrap">
      <table class="cart-table">
        <thead><tr><th scope="col">Product</th><th scope="col">Unit price</th><th scope="col">Quantity</th><th scope="col">Subtotal</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead>
        <tbody>
          ${entries.map(({ product, quantity }) => `
            <tr>
              <td><span class="item-name"><span class="item-emoji" aria-hidden="true">${product.emoji}</span>${product.name}</span></td>
              <td>${formatPrice(product.price)} / ${product.unit}</td>
              <td><input class="table-quantity" type="number" min="1" step="1" value="${quantity}" data-cart-quantity="${product.id}" aria-label="Quantity of ${product.name}"></td>
              <td>${formatPrice(product.price * quantity)}</td>
              <td><button class="button danger" type="button" data-remove-product="${product.id}" aria-label="Remove ${product.name}">Remove</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <div class="panel summary-panel">
      <div class="summary-row total"><span>Subtotal</span><span>${formatPrice(cartTotal())}</span></div>
      <div class="page-actions">
        <a class="button secondary" href="#/products">Continue Shopping</a>
        <a class="button" href="#/checkout">Proceed to Checkout</a>
      </div>
    </div>`;
}

function renderCheckout() {
  pageTitle.textContent = "Checkout";
  if (orderConfirmation) {
    pageContent.innerHTML = `
      <div class="panel confirmation">
        <div class="confirmation-icon" aria-hidden="true">✓</div>
        <h2>Order processed!</h2>
        <p class="intro">This is a prototype confirmation. No payment was taken and no real order was submitted.</p>
        <a class="button" href="#/products">Back to Products</a>
      </div>`;
    return;
  }

  const entries = cartEntries();
  if (entries.length === 0) {
    renderEmptyState("Nothing to checkout", "Your cart has no items to process.");
    return;
  }

  pageContent.innerHTML = `
    <p class="intro">Check your order summary. Processing this order is only a demonstration.</p>
    <div class="panel summary-panel" style="width:100%;max-width:none;margin:0">
      <h2>Order Summary</h2>
      ${entries.map(({ product, quantity }) => `
        <div class="summary-row">
          <span>${product.emoji} ${product.name} × ${quantity}</span>
          <span>${formatPrice(product.price * quantity)}</span>
        </div>
      `).join("")}
      <div class="summary-row total"><span>Total</span><span>${formatPrice(cartTotal())}</span></div>
      <div class="page-actions">
        <a class="button secondary" href="#/shopping-cart">Back to ShoppingCart</a>
        <button class="button" type="button" data-process-order>Process Order</button>
      </div>
    </div>`;
}

function addProduct(productId, quantity) {
  const product = getProduct(productId);
  if (!product) {
    showNotice("That product could not be found.");
    return;
  }
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    showNotice("Enter a whole-number quantity of at least 1.");
    return;
  }
  cart[product.id] = (cart[product.id] || 0) + quantity;
  saveCart();
  updateCartIndicators();
  showNotice(`${quantity} × ${product.name} added to your cart.`);
}

function updateQuantity(productId, value, input) {
  const quantity = Number(value);
  if (!Number.isSafeInteger(quantity) || quantity < 1 || !getProduct(productId)) {
    showNotice("Enter a whole-number quantity of at least 1.");
    renderShoppingCart();
    return;
  }
  cart[productId] = quantity;
  saveCart();
  updateCartIndicators();
  renderShoppingCart();
  if (input) input.blur();
}

function routeFromHash() {
  const route = window.location.hash.slice(1).split("?")[0].replace(/^\/+/, "");
  const knownRoutes = ["products", "product-details", "shopping-cart", "checkout"];
  const selected = knownRoutes.includes(route) ? route : "products";
  if (!window.location.hash) {
    window.location.hash = "/products";
  } else {
    setPage(selected);
  }
}

document.addEventListener("input", (event) => {
  const input = event.target;
  if (input.matches("[data-catalog-quantity]")) {
    catalogQuantities.set(Number(input.dataset.catalogQuantity), Number(input.value));
  }
});

document.addEventListener("change", (event) => {
  const input = event.target;
  if (input.matches("[data-cart-quantity]")) {
    updateQuantity(input.dataset.cartQuantity, input.value, input);
  }
});

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-product]");
  if (addButton) {
    const productId = Number(addButton.dataset.addProduct);
    const quantityInput = document.querySelector(`#quantity-${productId}`);
    const quantity = Number(quantityInput.value);
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      showNotice("Enter a whole-number quantity of at least 1.");
      quantityInput.focus();
      return;
    }
    catalogQuantities.set(productId, quantity);
    addProduct(productId, quantity);
    return;
  }

  const removeButton = event.target.closest("[data-remove-product]");
  if (removeButton) {
    const product = getProduct(removeButton.dataset.removeProduct);
    if (!product || !Object.hasOwn(cart, product.id)) return;
    delete cart[product.id];
    saveCart();
    updateCartIndicators();
    renderShoppingCart();
    showNotice(`${product.name} removed from your cart.`);
    return;
  }

  if (event.target.closest("[data-process-order]")) {
    if (cartEntries().length === 0) {
      renderCheckout();
      return;
    }
    cart = {};
    saveCart();
    orderConfirmation = true;
    updateCartIndicators();
    renderCheckout();
  }
});

window.addEventListener("hashchange", routeFromHash);
routeFromHash();
