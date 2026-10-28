const products = [
  {
    id: 1,
    name: "Vitamin C Face Cream",
    cat: "skincare",
    label: "SKIN CARE",
    price: 499,
    old: 699,
    rating: 4.7,
    reviews: 142,
    img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80",
    desc: "Brightening vitamin C face cream for everyday glow and hydration."
  },
  {
    id: 2,
    name: "Hydrating Face Serum",
    cat: "skincare",
    label: "SKIN CARE",
    price: 799,
    old: 999,
    rating: 4.9,
    reviews: 89,
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
    desc: "Lightweight hydrating serum designed to leave skin soft and refreshed."
  },
  {
    id: 3,
    name: "Luxury Oud Perfume",
    cat: "perfumes",
    label: "PERFUME",
    price: 1299,
    old: 1599,
    rating: 4.8,
    reviews: 215,
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
    desc: "A warm, elegant oud fragrance with a long-lasting signature."
  },
  {
    id: 4,
    name: "Bellavita Perfume",
    cat: "perfumes",
    label: "PERFUME",
    price: 999,
    old: 1199,
    rating: 4.5,
    reviews: 94,
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
    desc: "Modern aromatic fragrance made for confident everyday wear."
  },
  {
    id: 5,
    name: "Minimalist Face Wash",
    cat: "skincare",
    label: "SKIN CARE",
    price: 1299,
    old: 1499,
    rating: 4.6,
    reviews: 110,
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=700&q=80",
    desc: "Gentle daily cleanser that helps keep skin clean without over-drying."
  },
  {
    id: 6,
    name: "Men's Grooming Kit",
    cat: "men",
    label: "MEN",
    price: 899,
    old: 1199,
    rating: 4.6,
    reviews: 76,
    img: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=700&q=80",
    desc: "A practical grooming collection for a clean, polished routine."
  },
  {
    id: 7,
    name: "Rose Eau de Parfum",
    cat: "women",
    label: "WOMEN",
    price: 1499,
    old: 1899,
    rating: 4.8,
    reviews: 132,
    img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80",
    desc: "A soft floral fragrance with a modern rose-forward character."
  },
  {
    id: 8,
    name: "Daily Moisture Cream",
    cat: "women",
    label: "WOMEN",
    price: 649,
    old: 799,
    rating: 4.7,
    reviews: 58,
    img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=700&q=80",
    desc: "Comforting daily moisturizer for a smooth, fresh-looking finish."
  },
  {
    id: 9,
    name: "Amber Night Cologne",
    cat: "men",
    label: "MEN",
    price: 1199,
    old: 1499,
    rating: 4.6,
    reviews: 61,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
    desc: "Deep amber and woody notes designed for evenings."
  },
  {
    id: 10,
    name: "Glow Essentials Set",
    cat: "offers",
    label: "OFFER",
    price: 999,
    old: 1499,
    rating: 4.9,
    reviews: 203,
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80",
    desc: "A curated set of beauty essentials at a special offer price."
  }
];

let activeCategory = "all";
let searchTerm = "";
let cart = JSON.parse(localStorage.getItem("beautycart-cart") || "[]");
let wishes = JSON.parse(localStorage.getItem("beautycart-wishes") || "[]");
let heroIndex = 0;

const $ = selector => document.querySelector(selector);

function money(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function save() {
  localStorage.setItem("beautycart-cart", JSON.stringify(cart));
  localStorage.setItem("beautycart-wishes", JSON.stringify(wishes));
  updateCounts();
}

function updateCounts() {
  const cartCount = $("#cartCount");
  const wishCount = $("#wishCount");

  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.qty, 0);
  }

  if (wishCount) {
    wishCount.textContent = wishes.length;
    wishCount.style.display = wishes.length ? "block" : "none";
  }

  const accountWishCount = $("#accountWishCount");

  if (accountWishCount) {
    accountWishCount.textContent = wishes.length;
  }
}

function filtered() {
  return products.filter(p =>
    (activeCategory === "all" || p.cat === activeCategory) &&
    (activeCategory !== "offers" || p.old > p.price) &&
    (!searchTerm ||
      `${p.name} ${p.label}`.toLowerCase().includes(searchTerm))
  );
}

function render() {
  const grid = $("#productGrid");
  const empty = $("#emptyState");

  if (!grid) return;

  grid.innerHTML = "";

  const list = filtered();

  if (empty) {
    empty.style.display = list.length ? "none" : "block";
  }

  list.forEach(p => {
    const liked = wishes.includes(p.id);

    const el = document.createElement("article");
    el.className = "product-card";

    el.innerHTML = `
      <div class="product-image" data-id="${p.id}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">

        <span class="offer">
          ${p.old > p.price ? "OFFER" : ""}
        </span>

        <button
          class="heart ${liked ? "liked" : ""}"
          data-wish="${p.id}"
          aria-label="Wishlist">
          ${liked ? "♥" : "♡"}
        </button>
      </div>

      <div class="product-info">
        <p class="product-cat">${p.label}</p>

        <h3 class="product-name" data-open="${p.id}">
          ${p.name}
        </h3>

        <div class="rating">
          <b>★</b> ${p.rating} (${p.reviews})
        </div>

        <div class="price">
          ${money(p.price)}
          ${
            p.old
              ? `<span class="old">${money(p.old)}</span>`
              : ""
          }
        </div>

        <button class="add-btn" data-add="${p.id}">
          Add to Cart
        </button>
      </div>
    `;

    grid.appendChild(el);
  });

  updateCounts();
}

function setCategory(category) {
  activeCategory = category;

  document
    .querySelectorAll(".nav-link")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === category
      );
    });

  render();

  $("#products")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

document
  .querySelectorAll(".nav-link, .category-card")
  .forEach(button => {
    button.addEventListener("click", () => {
      setCategory(button.dataset.category);
    });
  });

$("#searchInput")?.addEventListener("input", e => {
  searchTerm = e.target.value.trim().toLowerCase();
  render();
});

$("#viewAll")?.addEventListener("click", () => {
  setCategory("all");
});

document.addEventListener("click", e => {

  const add = e.target.closest("[data-add]");

  if (add) {
    addToCart(Number(add.dataset.add));
    return;
  }

  const wish = e.target.closest("[data-wish]");

  if (wish) {
    toggleWish(Number(wish.dataset.wish));
    return;
  }

  const open = e.target.closest("[data-open], .product-image");

  if (open && !e.target.closest(".heart")) {
    openProduct(
      Number(open.dataset.open || open.dataset.id)
    );
  }
});

function addToCart(id) {

  const item = cart.find(x => x.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id,
      qty: 1
    });
  }

  save();

  showToast("Added to cart");
}

function toggleWish(id) {

  wishes = wishes.includes(id)
    ? wishes.filter(x => x !== id)
    : [...wishes, id];

  save();
  render();

  showToast(
    wishes.includes(id)
      ? "Added to wishlist"
      : "Removed from wishlist"
  );
}

function renderCart() {

  const box = $("#cartItems");

  if (!box) return;

  box.innerHTML = "";

  if (!cart.length) {

    box.innerHTML = `
      <div style="
        padding:40px 0;
        text-align:center;
        color:#7b8490
      ">
        Your cart is empty 🛍️
      </div>
    `;

    $("#cartTotal").textContent = "₹0";

    return;
  }

  let total = 0;

  cart.forEach(item => {

    const product = products.find(
      x => x.id === item.id
    );

    if (!product) return;

    total += product.price * item.qty;

    const row = document.createElement("div");

    row.className = "cart-line";

    row.innerHTML = `
      <img src="${product.img}" alt="${product.name}">

      <div class="cart-line-info">

        <b>${product.name}</b>

        <div>${money(product.price)}</div>

        <div class="qty">

          <button data-dec="${product.id}">
            −
          </button>

          <span>${item.qty}</span>

          <button data-inc="${product.id}">
            +
          </button>

          <button
            data-remove="${product.id}"
            style="
              margin-left:auto;
              border:0;
              background:none;
              color:#e62d52;
              cursor:pointer
            ">
            Remove
          </button>

        </div>

      </div>
    `;

    box.appendChild(row);
  });

  $("#cartTotal").textContent = money(total);
}

$("#cartItems")?.addEventListener("click", e => {

  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const remove = e.target.closest("[data-remove]");

  if (inc) {

    const item = cart.find(
      x => x.id === Number(inc.dataset.inc)
    );

    if (item) item.qty++;
  }

  if (dec) {

    const item = cart.find(
      x => x.id === Number(dec.dataset.dec)
    );

    if (item) {

      item.qty--;

      if (item.qty < 1) {
        cart = cart.filter(
          x => x.id !== item.id
        );
      }
    }
  }

  if (remove) {

    cart = cart.filter(
      x => x.id !== Number(remove.dataset.remove)
    );
  }

  save();
  renderCart();
});

function openCart() {

  $("#overlay")?.classList.add("show");
  $("#cartDrawer")?.classList.add("open");

  renderCart();
}

function closeCart() {

  $("#overlay")?.classList.remove("show");
  $("#cartDrawer")?.classList.remove("open");
  $("#productModal")?.classList.remove("open");
}

$("#cartBtn")?.addEventListener("click", openCart);
$("#closeCart")?.addEventListener("click", closeCart);
$("#overlay")?.addEventListener("click", closeCart);


/* =====================================================
   CHECKOUT → ADDRESS → PAYMENT
===================================================== */

function loadRazorpay() {

  return new Promise((resolve, reject) => {

    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = resolve;

    script.onerror = () => {
      reject(
        new Error("Razorpay SDK failed")
      );
    };

    document.head.appendChild(script);
  });
}

function getCartTotal() {

  return cart.reduce((total, item) => {

    const product = products.find(
      x => x.id === item.id
    );

    return total +
      (product
        ? product.price * item.qty
        : 0);

  }, 0);
}

function closeCheckoutFlow() {

  const modal =
    document.getElementById(
      "beautyCheckoutFlow"
    );

  if (modal) {
    modal.remove();
  }
}

function openCheckoutFlow() {

  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }

  closeCart();

  const total = getCartTotal();

  const modal =
    document.createElement("div");

  modal.id = "beautyCheckoutFlow";

  modal.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      z-index:99999;
      background:rgba(0,0,0,.65);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
      overflow:auto;
    ">

      <div style="
        width:min(560px,100%);
        max-height:92vh;
        overflow:auto;
        background:#fff;
        color:#222;
        border-radius:18px;
        padding:28px;
        box-shadow:0 25px 70px rgba(0,0,0,.35);
        font-family:Arial,Helvetica,sans-serif;
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:22px
        ">

          <h2 style="
            margin:0;
            font-size:28px
          ">
            Delivery Details
          </h2>

          <button
            id="closeCheckoutFlow"
            type="button"
            style="
              border:0;
              background:#f2f3f5;
              width:40px;
              height:40px;
              border-radius:50%;
              font-size:24px;
              cursor:pointer
            ">
            ×
          </button>

        </div>

        <div style="
          background:#f7f8fa;
          border-radius:12px;
          padding:14px 16px;
          margin-bottom:20px
        ">

          <strong>Order Total</strong>

          <span style="
            float:right;
            font-size:20px;
            font-weight:700
          ">
            ${money(total)}
          </span>

        </div>

        <label>Full Name</label>

        <input
          id="checkoutName"
          type="text"
          placeholder="Enter your full name"
          style="
            width:100%;
            height:48px;
            border:1px solid #d7d7d7;
            border-radius:9px;
            padding:0 14px;
            margin:7px 0 15px;
            font-size:15px
          "
        >

        <label>Mobile Number</label>

        <input
          id="checkoutPhone"
          type="tel"
          maxlength="10"
          placeholder="10-digit mobile number"
          style="
            width:100%;
            height:48px;
            border:1px solid #d7d7d7;
            border-radius:9px;
            padding:0 14px;
            margin:7px 0 15px;
            font-size:15px
          "
        >

        <label>Delivery Address</label>

        <textarea
          id="checkoutAddress"
          rows="3"
          placeholder="House no., street, area, city..."
          style="
            width:100%;
            border:1px solid #d7d7d7;
            border-radius:9px;
            padding:12px 14px;
            margin:7px 0 15px;
            font-size:15px
          "
        ></textarea>

        <label>PIN Code</label>

        <input
          id="checkoutPincode"
          type="text"
          maxlength="6"
          placeholder="6-digit PIN code"
          style="
            width:100%;
            height:48px;
            border:1px solid #d7d7d7;
            border-radius:9px;
            padding:0 14px;
            margin:7px 0 22px;
            font-size:15px
          "
        >

        <button
          id="continuePayment"
          type="button"
          style="
            width:100%;
            height:52px;
            border:0;
            border-radius:10px;
            background:#2874f0;
            color:#fff;
            font-size:17px;
            font-weight:700;
            cursor:pointer
          ">
          Continue to Payment
        </button>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  $("#closeCheckoutFlow").onclick =
    closeCheckoutFlow;

  $("#continuePayment").onclick =
    showPaymentMethods;
}

function getCheckoutCustomer() {

  const name =
    $("#checkoutName").value.trim();

  const phone =
    $("#checkoutPhone").value.trim();

  const address =
    $("#checkoutAddress").value.trim();

  const pincode =
    $("#checkoutPincode").value.trim();

  if (!name) {
    alert("Please enter your full name.");
    return null;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return null;
  }

  if (!address) {
    alert("Please enter your delivery address.");
    return null;
  }

  if (!/^[0-9]{6}$/.test(pincode)) {
    alert("Please enter a valid 6-digit PIN code.");
    return null;
  }

  const customer = {
    name,
    phone,
    address,
    pincode
  };

  localStorage.setItem(
    "beautycart-address",
    JSON.stringify(customer)
  );

  return customer;
}

function showPaymentMethods() {

  const customer =
    getCheckoutCustomer();

  if (!customer) return;

  const total = getCartTotal();

  const modal =
    document.getElementById(
      "beautyCheckoutFlow"
    );

  modal.firstElementChild.innerHTML = `
    <div style="
      padding:28px;
      background:#fff;
      border-radius:18px
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:22px
      ">

        <h2 style="margin:0">
          Select Payment Method
        </h2>

        <button
          id="closePaymentFlow"
          type="button"
          style="
            border:0;
            background:#f2f3f5;
            width:40px;
            height:40px;
            border-radius:50%;
            font-size:24px;
            cursor:pointer
          ">
          ×
        </button>

      </div>

      <div style="
        background:#f7f8fa;
        border-radius:12px;
        padding:15px;
        margin-bottom:20px
      ">

        <div style="
          font-size:13px;
          color:#777
        ">
          Deliver to
        </div>

        <strong>${customer.name}</strong>

        <div>${customer.phone}</div>

        <div>
          ${customer.address},
          ${customer.pincode}
        </div>

        <div style="
          margin-top:10px;
          padding-top:10px;
          border-top:1px solid #ddd;
          font-size:20px;
          font-weight:700
        ">
          Total: ${money(total)}
        </div>

      </div>

      <label id="onlinePaymentCard" style="
        display:block;
        padding:17px;
        border:2px solid #2874f0;
        background:#f7fbff;
        border-radius:12px;
        margin-bottom:12px;
        cursor:pointer
      ">

        <input
          type="radio"
          name="beautyPayment"
          value="online"
          checked
        >

        <strong>
          Online Payment
        </strong>

        <div style="
          margin:7px 0 0 25px;
          color:#666;
          font-size:13px
        ">
          UPI • Google Pay • PhonePe • Paytm
          • Card • Net Banking
        </div>

      </label>

      <label id="codPaymentCard" style="
        display:block;
        padding:17px;
        border:1px solid #ddd;
        background:#fff;
        border-radius:12px;
        margin-bottom:20px;
        cursor:pointer
      ">

        <input
          type="radio"
          name="beautyPayment"
          value="cod"
        >

        <strong>
          Cash on Delivery
        </strong>

        <div style="
          margin:7px 0 0 25px;
          color:#666;
          font-size:13px
        ">
          Pay when your order is delivered.
        </div>

      </label>

      <button
        id="confirmPayment"
        type="button"
        style="
          width:100%;
          height:52px;
          border:0;
          border-radius:10px;
          background:#2874f0;
          color:#fff;
          font-size:17px;
          font-weight:700;
          cursor:pointer
        ">
        Continue
      </button>

    </div>
  `;

  $("#closePaymentFlow").onclick =
    closeCheckoutFlow;

  $("#confirmPayment").onclick =
    processBeautyPayment;

  const onlineCard =
    $("#onlinePaymentCard");

  const codCard =
    $("#codPaymentCard");

  document
    .querySelectorAll(
      'input[name="beautyPayment"]'
    )
    .forEach(radio => {

      radio.addEventListener(
        "change",
        () => {

          if (
            radio.value === "online" &&
            radio.checked
          ) {

            onlineCard.style.border =
              "2px solid #2874f0";

            onlineCard.style.background =
              "#f7fbff";

            codCard.style.border =
              "1px solid #ddd";

            codCard.style.background =
              "#fff";
          }

          if (
            radio.value === "cod" &&
            radio.checked
          ) {

            codCard.style.border =
              "2px solid #2874f0";

            codCard.style.background =
              "#f7fbff";

            onlineCard.style.border =
              "1px solid #ddd";

            onlineCard.style.background =
              "#fff";
          }

        }
      );

    });
}


/* =====================================================
   ORDER HISTORY
===================================================== */

function saveBeautyOrder(order) {

  const orders =
    JSON.parse(
      localStorage.getItem(
        "beautycart-orders"
      ) || "[]"
    );

  const completeOrder = {
    ...order,
    date: new Date().toLocaleString("en-IN")
  };

  orders.unshift(completeOrder);

  localStorage.setItem(
    "beautycart-orders",
    JSON.stringify(orders)
  );

  localStorage.setItem(
    "beautycart-last-order",
    JSON.stringify(completeOrder)
  );
}

function openOrderHistory() {

  let orders =
    JSON.parse(
      localStorage.getItem(
        "beautycart-orders"
      ) || "[]"
    );

  if (!orders.length) {

    const last =
      JSON.parse(
        localStorage.getItem(
          "beautycart-last-order"
        ) || "null"
      );

    if (last) {
      orders = [last];
    }
  }

  let modal =
    document.getElementById(
      "beautyOrderHistoryModal"
    );

  if (!modal) {

    modal =
      document.createElement("div");

    modal.id =
      "beautyOrderHistoryModal";

    document.body.appendChild(modal);
  }

  const orderRows = orders.length
    ? orders.map(order => {

        const itemNames =
          (order.products || [])
            .map(item => {

              const product =
                products.find(
                  x => x.id === item.id
                );

              return `${
                product
                  ? product.name
                  : "Product"
              } × ${item.qty}`;

            })
            .join(" • ");

        const status =
          order.paymentStatus ||
          "Pending";

        const isPaid =
          status.toLowerCase() === "paid";

        const statusColor =
          isPaid
            ? "#16803a"
            : "#b26a00";

        return `
          <div style="
            border:1px solid #e5e7eb;
            border-radius:14px;
            padding:16px;
            margin-bottom:12px;
            background:#fff
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:flex-start;
              gap:12px
            ">

              <div>

                <div style="
                  font-size:13px;
                  color:#777
                ">
                  Order ID
                </div>

                <strong>
                  ${order.orderId || "BeautyCart Order"}
                </strong>

              </div>

              <span style="
                padding:5px 9px;
                border-radius:999px;
                background:#f5f6f8;
                color:${statusColor};
                font-size:12px;
                font-weight:700
              ">
                ${status}
              </span>

            </div>

            <div style="
              margin-top:12px;
              font-size:13px;
              color:#555;
              line-height:1.55
            ">
              ${itemNames || "BeautyCart items"}
            </div>

            <div style="
              display:flex;
              justify-content:space-between;
              margin-top:12px;
              padding-top:10px;
              border-top:1px solid #eee
            ">

              <span style="
                font-size:13px;
                color:#777
              ">
                ${order.date || ""}
              </span>

              <strong>
                ${money(order.total || 0)}
              </strong>

            </div>

            <div style="
              margin-top:7px;
              font-size:12px;
              color:#777
            ">
              ${order.paymentMethod || "Payment"}
            </div>

          </div>
        `;

      }).join("")

    : `
      <div style="
        padding:40px 15px;
        text-align:center;
        color:#777
      ">

        <div style="
          font-size:42px;
          margin-bottom:10px
        ">
          📦
        </div>

        <strong>
          No orders yet
        </strong>

        <div style="
          margin-top:6px;
          font-size:13px
        ">
          Your placed orders will appear here.
        </div>

      </div>
    `;

  modal.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      z-index:100000;
      background:rgba(0,0,0,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px
    ">

      <div style="
        width:min(620px,100%);
        max-height:88vh;
        overflow:auto;
        background:#fff;
        border-radius:16px;
        box-shadow:0 25px 70px rgba(0,0,0,.3);
        padding:22px;
        font-family:Arial,Helvetica,sans-serif
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:18px
        ">

          <div>

            <h2 style="
              margin:0;
              font-size:24px;
              color:#222
            ">
              My Orders
            </h2>

            <div style="
              font-size:13px;
              color:#777;
              margin-top:4px
            ">
              ${orders.length}
              order${orders.length === 1 ? "" : "s"}
            </div>

          </div>

          <button
            id="closeOrderHistory"
            type="button"
            style="
              border:0;
              background:#f2f3f5;
              width:38px;
              height:38px;
              border-radius:50%;
              font-size:23px;
              cursor:pointer
            ">
            ×
          </button>

        </div>

        ${orderRows}

      </div>
    </div>
  `;

  modal.style.display = "block";

  $("#closeOrderHistory").onclick = () => {
    modal.remove();
  };
}


/* =====================================================
   PROCESS PAYMENT
===================================================== */

async function processBeautyPayment() {

  const selected =
    document.querySelector(
      'input[name="beautyPayment"]:checked'
    );

  if (!selected) {

    showToast(
      "Please select a payment method"
    );

    return;
  }

  const customer =
    JSON.parse(
      localStorage.getItem(
        "beautycart-address"
      ) || "null"
    );

  const total =
    getCartTotal();

  if (!customer || total <= 0) {

    showToast(
      "Order details are incomplete"
    );

    return;
  }


  /* ==========================
     CASH ON DELIVERY
  ========================== */

  if (selected.value === "cod") {

    const order = {

      orderId:
        "BC" + Date.now(),

      customer,

      products: [...cart],

      total,

      paymentMethod:
        "Cash on Delivery",

      paymentStatus:
        "Pending"
    };

    // IMPORTANT:
    // Save order BEFORE clearing cart.
    saveBeautyOrder(order);

    localStorage.removeItem(
      "beautycart-cart"
    );

    localStorage.removeItem("cart");

    cart = [];

    save();

    closeCheckoutFlow();

    showToast(
      "Order placed successfully!"
    );

    setTimeout(() => {

      window.location.href =
        "success.html";

    }, 1000);

    return;
  }


  /* ==========================
     ONLINE PAYMENT
  ========================== */

  try {

    await loadRazorpay();

    const options = {

      // ONLY Razorpay Key ID here.
      // Secret Key must NOT be placed in frontend.
      key: "rzp_live_Tpe0jXkRrSsZUg",

      amount:
        Math.round(total * 100),

      currency: "INR",

      name: "BeautyCart",

      description:
        "BeautyCart Order Payment",

      prefill: {

        name:
          customer.name,

        contact:
          customer.phone
      },

      notes: {

        address:
          customer.address,

        pincode:
          customer.pincode
      },

      handler:
        function(response) {

          const order = {

            orderId:
              "BC" + Date.now(),

            customer,

            products: [...cart],

            total,

            paymentMethod:
              "Online Payment",

            paymentStatus:
              "Paid",

            paymentId:
              response.razorpay_payment_id
          };

          // Save order before clearing cart.
          saveBeautyOrder(order);

          localStorage.removeItem(
            "beautycart-cart"
          );

          localStorage.removeItem(
            "cart"
          );

          cart = [];

          save();

          closeCheckoutFlow();

          alert(
            "Payment Successful\nPayment ID: " +
            response.razorpay_payment_id
          );

          window.location.href =
            "success.html";
        },

      theme: {
        color: "#2874f0"
      },

      modal: {

        ondismiss:
          function() {

            showToast(
              "Payment cancelled"
            );

          }

      }

    };

    const razorpay =
      new Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.error(error);

    showToast(
      "Unable to load Razorpay"
    );
  }
}


/* =====================================================
   CHECKOUT BUTTON
===================================================== */

$("#checkoutBtn").onclick =
  openCheckoutFlow;


/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProduct(id) {

  const product =
    products.find(
      x => x.id === id
    );

  if (!product) return;

  $("#modalImg").src =
    product.img;

  $("#modalImg").alt =
    product.name;

  $("#modalCat").textContent =
    product.label;

  $("#modalName").textContent =
    product.name;

  $("#modalDesc").textContent =
    product.desc;

  $("#modalPrice").textContent =
    money(product.price);

  $("#modalAdd").onclick =
    () => {

      addToCart(id);

      closeCart();
    };

  $("#productModal")
    .classList.add("open");

  $("#overlay")
    .classList.add("show");
}

$("#modalClose").onclick =
  closeCart;


/* =====================================================
   HERO SLIDER
===================================================== */

const heroes = [

  [
    "Glow Naturally",
    "Everyday",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1100&q=85"
  ],

  [
    "Luxury",
    "Starts Here",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1100&q=85"
  ],

  [
    "Your Skin",
    "Your Glow",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1100&q=85"
  ]

];

function hero() {

  const h =
    heroes[heroIndex];

  $(".hero h1").innerHTML =
    h[0] +
    "<br><em>" +
    h[1] +
    "</em>";

  $("#heroImage").style.backgroundImage =
    `url("${h[2]}")`;

  $("#heroDots").innerHTML =
    heroes
      .map(
        (_, i) =>
          `<i class="${i === heroIndex ? "active" : ""}"></i>`
      )
      .join("");
}

$("#prevHero").onclick =
  () => {

    heroIndex =
      (heroIndex +
        heroes.length -
        1) %
      heroes.length;

    hero();
  };

$("#nextHero").onclick =
  () => {

    heroIndex =
      (heroIndex + 1) %
      heroes.length;

    hero();
  };

setInterval(() => {

  heroIndex =
    (heroIndex + 1) %
    heroes.length;

  hero();

}, 6000);


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

  const toast =
    $("#toast");

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(
    window.toastTimer
  );

  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2200);
}


/* =====================================================
   INITIALIZE
===================================================== */

render();
hero();
updateCounts();