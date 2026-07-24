const PHONE_NUMBER = "2617111500";
const DELIVERY_PRICE = 800;

// Base de Datos Completa (Promos + Carta Individual)
const products = {
    // --- PROMOS ---
    1: { nombre: "Promo: 4 Panchos con Lluvia de Papas", precio: 7500 },
    2: { nombre: "Promo: 4 Panchos con Lluvia y 2 Salsas", precio: 9500 },
    3: { nombre: "Promo: Súper Pancho Doble Poncho", precio: 4500 },
    4: { nombre: "Promo: 2 Meta Smash Simple + Papas C/B", precio: 16000 },
    5: { nombre: "Promo: 2 Meta Beicon Simple + Papas C/B", precio: 16000 },
    6: { nombre: "Promo: 2 Meta Beicon Doble + Papas C/B", precio: 20000 },
    7: { nombre: "Promo: 2 Monster Smash Doble + Papas C/B", precio: 21000 },
    8: { nombre: "Promo: 2 Meta Beicon Triple + Papas C/B", precio: 24000 },
    9: { nombre: "Promo: 2 Monster Smash Triple + Papas C/B", precio: 25000 },
    10: { nombre: "Promo: Lomo de 30cm con Papas", precio: 16000 },
    11: { nombre: "Promo: Lomo de 50cm con Papas", precio: 26000 },
    12: { nombre: "Promo: Lomo Por Metro con Papas", precio: 46000 },
    13: { nombre: "Promo: Lomo 50cm + Papas + Gaseosa 2.25L", precio: 29500 },
    14: { nombre: "Promo: 2 Pizzas Muzzarellas", precio: 12000 },
    15: { nombre: "Promo: 3 Pizzas Muzzarellas", precio: 18000 },
    16: { nombre: "Promo: 2 Pizzas Especiales", precio: 15000 },
    17: { nombre: "Promo: 3 Pizzas Especiales", precio: 22000 },
    18: { nombre: "Promo: 1 Pancho c/ Papas + Lata Coca", precio: 3500 },
    19: { nombre: "Promo: 1 Pancho 2 Salsas/Papas + Lata Coca", precio: 4000 },
    20: { nombre: "Promo: 2 Panchos con 2 Salsas + 2 Latas", precio: 8000 },
    21: { nombre: "Promo: 2 Meta Smash Simple + Papas + 2 Latas", precio: 20000 },
    22: { nombre: "Promo: 3 Pizzas Muzzarella + 1 Pepsi", precio: 21000 },
    23: { nombre: "Promo: Lomopizza Especial con Papas", precio: 34000 },
    24: { nombre: "Promo: 1 Lomopizza con Papas + Coca", precio: 38500 },

    // --- CARTA INDIVIDUAL ---
    // Panchos
    101: { nombre: "Súper Pancho con Lluvia de Papas", precio: 2000 },
    102: { nombre: "Súper Pancho con 2 Salsas y Papas", precio: 2500 },
    103: { nombre: "Súper Pancho 50cm (2 Salsas y Papas)", precio: 6000 },
    104: { nombre: "Pancho 50cm Doble Salchicha y Poncho", precio: 10000 },
    105: { nombre: "Súper Pancho Por Metro", precio: 11000 },

    // Hamburguesas Tradicionales
    106: { nombre: "Súper Hamburguesa", precio: 9500 },
    107: { nombre: "Hamburguesa Big Mamma", precio: 15000 },

    // Lomos
    108: { nombre: "Lomo de 30 cm", precio: 13000 },
    109: { nombre: "Lomo de 50 cm", precio: 23000 },
    110: { nombre: "Lomo Por 1 Metro", precio: 42000 },
    111: { nombre: "Lomo Pizza Especial", precio: 30000 },

    // Pizzas
    112: { nombre: "Pizza Muzzarella", precio: 7000 },
    113: { nombre: "Pizza Doble Muzzarella", precio: 8000 },
    114: { nombre: "Pizza Especial", precio: 8000 },
    115: { nombre: "Pizza Fugazza", precio: 8000 },

    // Papas
    116: { nombre: "Porción de Papas Grandes", precio: 4000 },
    117: { nombre: "Porción de Papas Grandes con Cheddar", precio: 6000 },
    118: { nombre: "Salchipapa", precio: 6000 },

    // Agregados
    119: { nombre: "Agregado: Doble Salchicha", precio: 1000 },
    120: { nombre: "Agregado: Poncho", precio: 1000 },
    121: { nombre: "Agregado: Cheddar Extra", precio: 3000 }
};

let cart = {};

document.addEventListener("DOMContentLoaded", function() {
    updateCart();
});

// Filtro por categorías
function filterCategory(category, btnElement) {
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(function(btn) { btn.classList.remove("active"); });
    if (btnElement) btnElement.classList.add("active");

    const sections = document.querySelectorAll(".menu-section");
    sections.forEach(function(section) {
        const sectionCat = section.getAttribute("data-category-section");
        if (category === "todos" || sectionCat === category) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });
}

// Agregar producto al carrito
function addToCart(id) {
    const productId = Number(id);

    if (!products[productId]) return;

    if (cart[productId]) {
        cart[productId].qty += 1;
    } else {
        cart[productId] = { 
            nombre: products[productId].nombre, 
            precio: products[productId].precio, 
            qty: 1 
        };
    }

    updateCart();
}

// Cambiar cantidad en la comanda
function changeQty(id, delta) {
    const productId = Number(id);

    if (cart[productId]) {
        cart[productId].qty += delta;
        if (cart[productId].qty <= 0) {
            delete cart[productId];
        }
    }
    updateCart();
}

// Actualizar vista y totales de la comanda
function updateCart() {
    let count = 0;
    let subtotal = 0;
    const comandaList = document.getElementById("comandaItemsList");
    const keys = Object.keys(cart);

    if (comandaList) {
        let htmlContent = "";

        if (keys.length === 0) {
            htmlContent = "<p class='empty-cart-msg'>La comanda está vacía.</p>";
        } else {
            keys.forEach(function(keyId) {
                const item = cart[keyId];
                const itemTotal = item.precio * item.qty;
                count += item.qty;
                subtotal += itemTotal;

                htmlContent += '<div class="cart-item">' +
                    '<div>' +
                        '<strong class="cart-item-name">' + item.nombre + '</strong>' +
                        '<span class="cart-item-price">$' + item.precio.toLocaleString('es-AR') + ' c/u</span>' +
                    '</div>' +
                    '<div class="qty-controls">' +
                        '<button type="button" class="qty-btn" onclick="changeQty(' + keyId + ', -1)">-</button>' +
                        '<span class="qty-number">' + item.qty + '</span>' +
                        '<button type="button" class="qty-btn" onclick="changeQty(' + keyId + ', 1)">+</button>' +
                        '<span class="item-total-price">$' + itemTotal.toLocaleString('es-AR') + '</span>' +
                    '</div>' +
                '</div>';
            });
        }
        comandaList.innerHTML = htmlContent;
    }

    const deliveryRadio = document.querySelector('input[name="deliveryType"]:checked');
    const isDelivery = deliveryRadio ? deliveryRadio.value === "delivery" : false;
    const deliveryCost = (isDelivery && keys.length > 0) ? DELIVERY_PRICE : 0;
    const total = subtotal + deliveryCost;

    const barCount = document.getElementById("barCount");
    const barTotal = document.getElementById("barTotal");
    const subtotalText = document.getElementById("subtotalText");
    const totalText = document.getElementById("totalText");

    if (barCount) barCount.innerText = count;
    if (barTotal) barTotal.innerText = "$" + subtotal.toLocaleString('es-AR');
    if (subtotalText) subtotalText.innerText = "$" + subtotal.toLocaleString('es-AR');
    if (totalText) totalText.innerText = "$" + total.toLocaleString('es-AR');
}

// Alternar campos de Delivery/Retiro
function updateDeliveryUI() {
    const deliveryRadio = document.querySelector('input[name="deliveryType"]:checked');
    const isDelivery = deliveryRadio ? deliveryRadio.value === "delivery" : false;

    const addressSection = document.getElementById("addressSection");
    const deliveryRow = document.getElementById("deliveryRow");

    if (addressSection) addressSection.style.display = isDelivery ? "block" : "none";
    if (deliveryRow) deliveryRow.style.display = isDelivery ? "block" : "none";

    updateCart();
}

// Abrir / Cerrar Modal
function toggleModal(show) {
    const modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = show ? "block" : "none";
    }
}

// Enviar comanda formateada a WhatsApp
function sendWhatsAppOrder() {
    const keys = Object.keys(cart);
    if (keys.length === 0) {
        alert("Agrega algún producto a la comanda primero.");
        return;
    }

    const nameInput = document.getElementById("clientName");
    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) {
        alert("Ingresa tu nombre.");
        return;
    }

    const deliveryRadio = document.querySelector('input[name="deliveryType"]:checked');
    const isDelivery = deliveryRadio ? deliveryRadio.value === "delivery" : false;

    const addressInput = document.getElementById("addressInput");
    const address = addressInput ? addressInput.value.trim() : "";

    if (isDelivery && !address) {
        alert("Ingresa la dirección para el envío.");
        return;
    }

    let subtotal = 0;
    let msg = "*--- NUEVO PEDIDO META PANCHOS ---*\n\n";
    msg += "👤 *Cliente:* " + name + "\n";
    msg += "📌 *Modalidad:* " + (isDelivery ? "🛵 Delivery" : "🛍️ Retiro por local") + "\n";
    if (isDelivery) {
        msg += "📍 *Dirección:* " + address + "\n";
    }
    msg += "\n*DETALLE DEL PEDIDO:*\n";

    keys.forEach(function(keyId) {
        const item = cart[keyId];
        const itemTotal = item.precio * item.qty;
        subtotal += itemTotal;
        msg += "• " + item.qty + "x " + item.nombre + " = $" + itemTotal.toLocaleString('es-AR') + "\n";
    });

    const total = subtotal + (isDelivery ? DELIVERY_PRICE : 0);

    msg += "\nSubtotal: *$" + subtotal.toLocaleString('es-AR') + "*\n";
    if (isDelivery) {
        msg += "Envío: *$" + DELIVERY_PRICE.toLocaleString('es-AR') + "*\n";
    }
    msg += "*TOTAL: $" + total.toLocaleString('es-AR') + "*\n";

    const encoded = encodeURIComponent(msg);
    window.open("https://wa.me/" + PHONE_NUMBER + "?text=" + encoded, '_blank');
}