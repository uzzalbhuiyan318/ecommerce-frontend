let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");


let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

//cart adding starts here

let itemCount = 0; // Variable to store the count of items in the cart

function addToCart(name, price, code, image) {
  // Create a new cart item
  const cartItem = document.createElement("li");
  cartItem.dataset.code = code;
  cartItem.innerHTML = `
                  
              <div style="text-align: center;">
                  <img src="${image}" alt="${name}" style="max-width: 50px; height: auto; display: inline-block; vertical-align: middle;">
                  <p style="font-weight: bold; display: inline-block; vertical-align: middle; margin-left: 10px;">${name}</p>
                  <p style="color: green; font-size: 18px; display: inline-block; vertical-align: middle; margin-left: 10px;">${price}/=</p>
                  <p style="font-style: italic; display: inline-block; vertical-align: middle; margin-left: 10px;">Code: ${code}</p>
                  
              </div> <br>
                  <button class="remove-button" style="position: relative; top: -15px;" onclick="removeFromCart('${code}', ${price})">Remove</button>
              `;

  // Append the cart item to the cart
  document.getElementById("cart-items").appendChild(cartItem);

  // Update the total price
  updateTotal(price);

  // Update the count of items in the cart
  updateItemCount(1);
}

function updateTotal(price) {
  const currentTotal = parseFloat(
    document.getElementById("cart-total").innerText
  );
  const newTotal = currentTotal + price;
  document.getElementById("cart-total").innerText = newTotal.toFixed(2);
}

function removeFromCart(code, price) {
  const cartItem = document.querySelector(`[data-code="${code}"]`);

  if (cartItem) {
    cartItem.remove();
    updateTotal(-price);
    updateItemCount(-1);
  }
}

function updateItemCount(change) {
  itemCount += change;
  document.getElementById("cart-count").innerText = itemCount;
  document.getElementById("cart-count-icon").innerText = itemCount;
}

function checkout() {
  const productCodes = Array.from(
    document.querySelectorAll("#cart-items [data-code]")
  )
    .map((item) => item.dataset.code)
    .join(", ");

  document.getElementById("checkoutCodes").value = productCodes;
}

// Call this function when the checkout button is clicked
function redirectToCheckout() {
  const productCodes = Array.from(
    document.querySelectorAll("#cart-items [data-code]")
  )
    .map((item) => item.dataset.code)
    .join(", ");

  // Redirect to the checkout page with the product codes as a parameter
  window.location.href = `checkout.html?productCodes=${encodeURIComponent(
    productCodes
  )}`;
}
