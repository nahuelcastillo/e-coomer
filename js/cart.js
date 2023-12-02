let userCart = JSON.parse(localStorage.getItem("userCart")) || {
  user: 25801,
  articles: [],
};

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(CART_INFO_URL + "25801.json").then((res) => {
    const isArticleInCart = userCart.articles.find(
      (article) => article.id === res.data.articles[0].id
    );
    if (!isArticleInCart) {
      addArticleToCart(res.data.articles[0]);
    }
    calculateTotal();
    showArticlesInCart();
  });

  // Escuchamos los cambios en los input de tipo de envío y calculamos el total cada vez que cambia el envío seleccionado
  const radioBtns = document.querySelectorAll("input[name='shipping-type']");
  radioBtns.forEach((radio) => {
    radio.addEventListener("change", () => {
      calculateTotal();
    });
  });

  // Escuchamos los cambios en los input de tipo de pago y calculamos el total cada vez que cambia el tipo de pago seleccionado
  const paymentBtns = document.querySelectorAll("input[name='payment-method']");
  paymentBtns.forEach((radio) => {
    radio.addEventListener("change", handleChangePaymentMethod);
  });

  // Cuando carga la página, calculamos el total y mostramos los artículos del carrito
  calculateTotal();
  showArticlesInCart();
});

// Función para mostrar los artículos en el carrito
function showArticlesInCart() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  userCart.articles.forEach((article) => {
    const tr = document.createElement("tr");
    tr.classList.add("align-middle");
    tr.innerHTML = `
      <td>
        <img src="${article.image}" width="128" alt="${article.name}" />
      </td>
      <td>${article.name}</td>
      <td>${article.currency} ${article.unitCost}</td>
      <td><input type="number" onchange="updateArticleCount(this, ${
        article.id
      })" class="form-control" min="1" max="10" value="${article.count}" /></td>
      <td>USD ${
        article.currency === "UYU"
          ? (article.unitCost / 40) * article.count
          : article.unitCost * article.count
      }</td>
      <td><button class="btn btn-danger" onclick="removeArticleFromCart(${
        article.id
      })">Eliminar</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

// Función para agregar un producto al carrito
function addArticleToCart(article) {
  userCart.articles.push(article);
  localStorage.setItem("userCart", JSON.stringify(userCart));
}

// Función para eliminar un producto del carrito
function removeArticleFromCart(articleId) {
  userCart.articles = userCart.articles.filter(
    (article) => article.id !== articleId
  );
  localStorage.setItem("userCart", JSON.stringify(userCart));
  calculateTotal();
  showArticlesInCart();
}

// Función para actualizar el número de artículos
function updateArticleCount(element, articleId) {
  const count = parseInt(element.value);
  userCart.articles = userCart.articles.map((article) => {
    if (article.id === articleId) {
      article.count = count > 10 ? 10 : count < 1 ? 1 : count;
    }
    return article;
  });
  localStorage.setItem("userCart", JSON.stringify(userCart));
  calculateTotal();
  showArticlesInCart();
}

// Función para calcular el total
function calculateTotal() {
  // Seleccionamos los elementos del DOM
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");

  // Creamos las variables
  let subtotal = 0;
  let shipping = 0;
  let total = 0;

  // Calculamos el subtotal
  userCart.articles.forEach((article) => {
    if (article.currency === "UYU") {
      subtotal += (article.unitCost / 40) * article.count;
    } else {
      subtotal += article.unitCost * article.count;
    }
  });

  // Calculamos el envío
  const selectedRadio = document.querySelector(
    'input[name="shipping-type"]:checked'
  ).value;

  switch (selectedRadio) {
    case "premium":
      shipping = subtotal * 0.15;
      break;
    case "express":
      shipping = subtotal * 0.07;
      break;
    case "standard":
      shipping = subtotal * 0.05;
      break;
  }

  total = subtotal + shipping;

  // Actualizamos los elementos para mostrar los totales
  subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
  shippingElement.innerHTML = `$${shipping.toFixed(2)}`;
  totalElement.innerHTML = `$${total.toFixed(2)}`;
}

function handleChangePaymentMethod(event) {
  const paymentMethod = event.target.value;
  const paymentInfo = document.querySelector("#payment-info");
  const selectedPaymentEl = document.querySelector("#selected-payment");

  switch (paymentMethod) {
    case "credit-card":
      paymentInfo.innerHTML = `
      <div class="col-8">
        <div class="form-check">
          <label for="card-number" class="form-label"
            >Número de tarjeta</label
          >
          <input
            class="form-control"
            type="number"
            id="card-number"
            placeholder="#### #### #### ####"
            required
          />
          <div class="invalid-feedback">
            Debes ingresar un número de tarjeta válido
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="form-check">
          <label for="card-cvc" class="form-label">CVC</label>
          <input
            class="form-control"
            type="number"
            id="card-cvc"
            required
          />
          <div class="invalid-feedback">
            Debes ingresar un CVC
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-check">
          <label for="card-expiration-date" class="form-label"
            >Fecha de expiración</label
          >
          <input
            class="form-control"
            type="month"
            id="card-expiration-date"
            required
          />
          <div class="invalid-feedback">
            Debes ingresar una fecha de expiración
          </div>
        </div>
      </div>
      `;
      selectedPaymentEl.textContent = "Tarjeta de credito";
      break;

    case "bank-transfer":
      paymentInfo.innerHTML = `
      <div class="col-12">
        <div class="form-check">
          <label for="bank-account-number" class="form-label">Numero de cuenta</label>
          <input
            class="form-control"
            type="number"
            id="bank-account-number"
            placeholder="#### #### #### ####"
            required
          />
          <div class="invalid-feedback">
            Debes ingresar un numero de cuenta bancario
          </div>
        </div>
      </div>
      `
      selectedPaymentEl.textContent = "Transferencia Bancaria";
      break;

      default:
        paymentInfo.innerHTML = "";
        console.log("Default")
        break
  }
}
