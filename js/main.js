// Array que almacena los productos
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elementos del DOM
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");
const totalSpan = document.getElementById("total");

// Clase Producto
class Product {
    constructor(name, price) {
        this.id = Date.now();
        this.name = name;
        this.price = parseFloat(price);
    }
}

// Guardar en localStorage
function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Calcular total
function calculateTotal() {
    return cart.reduce((acc, product) => acc + product.price, 0);
}

// Renderizar productos en el DOM
function renderProducts() {
    productList.innerHTML = "";

    cart.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - $${product.price}
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
        productList.appendChild(li);
    });

    totalSpan.textContent = calculateTotal();
}

// Eliminar producto
function deleteProduct(id) {
    cart = cart.filter(product => product.id !== id);
    saveToStorage();
    renderProducts();
}

// Evento submit del formulario
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    const newProduct = new Product(name, price);

    cart.push(newProduct);

    saveToStorage();
    renderProducts();

    form.reset();
});

// Render inicial
renderProducts();