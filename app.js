// ==========================================
// CONFIGURACIÓN Y ESTADO DE LA APLICACIÓN
// ==========================================
const PHONE_NUMBER = "2617111500"; // ⚠️ Cambia este número por el WhatsApp de Meta Panchos (con código de país)
const DELIVERY_COST = 800;

// Base de datos de productos mapeada directamente con los IDs del HTML
const PRODUCTS = {
    // Promos Panchos
    1: { id: 1, name: "4 Panchos con Lluvia de Papas", price: 7500 },
    2: { id: 2, name: "4 Panchos con Lluvia y 2 Salsas", price: 9500 },
    3: { id: 3, name: "Súper Pancho Doble Poncho", price: 4500 },
    
    // Carta Panchos
    101: { id: 101, name: "Súper Pancho con Lluvia de Papas", price: 2000 },
    102: { id: 102, name: "Súper Pancho con 2 Salsas y Papas", price: 2500 },
    103: { id: 103, name: "Súper Pancho 50cm (2 Salsas y Papas)", price: 6000 },
    104: { id: 104, name: "Pancho 50cm Doble Salchicha y Poncho", price: 10000 },
    105: { id: 105, name: "Súper Pancho Por Metro", price: 11000 },

    // Smash Burgers (Promos)
    4: { id: 4, name: "2 Meta Smash Simple + Papas C/B", price: 16000 },
    5: { id: 5, name: "2 Meta Beicon Simple + Papas C/B", price: 16000 },
    6: { id: 6, name: "2 Meta Beicon Doble + Papas C/B", price: 20000 },
    7: { id: 7, name: "2 Monster Smash Doble + Papas C/B", price: 21000 },
    8: { id: 8, name: "2 Meta Beicon Triple + Papas C/B", price: 24000 },
    9: { id: 9, name: "2 Monster Smash Triple + Papas C/B", price: 25000 },

    // Burgers Carta
    106: { id: 106, name: "Súper Hamburguesa", price: 9500 },
    107: { id: 107, name: "Big Mamma", price: 15000 },

    // Lomos Carta y Promos
    108: { id: 108, name: "Lomo de 30 cm", price: 13000 },
    109: { id: 109, name: "Lomo de 50 cm", price: 23000 },
    110: { id: 110, name: "Lomo Por 1 Metro", price: 42000 },
    111: { id: 111, name: "Lomo Pizza Especial", price: 30000 },
    10: { id: 10, name: "Lomo de 30cm con Papas", price: 16000 },
    11: { id: 11, name: "Lomo de 50cm con Papas", price: 26000 },
    12: { id: 12, name: "Lomo Por Metro con Papas", price: 46000 },
    13: { id: 13, name: "Lomo 50cm + Papas + Gaseosa 2.25L", price: 29500 },

    // Pizzas
    112: { id: 112, name: "Pizza Muzzarella", price: 7000 },
    113: { id: 113, name: "Pizza Doble Muzzarella", price: 8000 },
    114: { id: 114, name: "Pizza Especial", price: 8000 },
    115: { id: 115, name: "Pizza Fugazza", price: 8000 },
    14: { id: 14, name: "2 Pizzas Muzzarellas", price: 12000 },
    15: { id: 15, name: "3 Pizzas Muzzarellas", price: 18000 },
    16: { id: 16, name: "2 Pizzas Especiales", price: 15000 },
    17: { id: 17, name: "3 Pizzas Especiales", price: 22000 },

    // Papas
    116: { id: 116, name: "Porción de Papas Grandes", price: 4000 },
    117: { id: 117, name: "Porción de Papas Grandes con Cheddar", price: 6000 },
    118: { id: 118, name: "Salchipapa", price: 6000 },

    // Agregados
    119: { id: 119, name: "Agregado: Doble Salchicha", price: 10000 },
    120: { id: 120, name: "Agregado: Poncho", price: 1000 },
    121: { id: 121, name: "Agregado: Cheddar Extra", price: 3000 },

    // Especiales
    18: { id: 18, name: "1 Pancho c/ Papas + Lata Coca", price: 3500 },
    19: { id: 19, name: "1 Pancho 2 Salsas/Papas + Lata Coca", price: 4000 },
    20: { id: 20, name: "2 Panchos con 2 Salsas + 2 Latas", price: 8000 },
    21: { id: 21, name: "2 Meta Smash Simple + Papas + 2 Latas", price: 20000 },
    22: { id: 22, name: "3 Pizzas Muzzarella + 1 Pepsi", price: 21000 },
    23: { id: 23, name: "Lomopizza Especial con Papas", price: 34000 },
    24: { id: 24, name: "1 Lomopizza con Papas + Coca", price: 38500 }
};

let cart = [];
let pendingSauceProductId = null;
let maxAllowedSauces = 2;

// Formateador de moneda en pesos argentinos
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(amount);
};

// ==========================================
// 1. FILTRADO DE CATEGORÍAS
// ==========================================
function filterCategory(category, buttonElement) {
    // Actualizar clase activa en los botones
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) buttonElement.classList.add('active');

    // Mostrar/ocultar secciones
    const sections = document.querySelectorAll('.menu-section');
    sections.forEach(section => {
        const sectionCategory = section.getAttribute('data-category-section');
        if (category === 'todos' || sectionCategory === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// ==========================================
// 2. GESTIÓN DEL CARRITO / COMANDA
// ==========================================
function addToCart(productId, sauces = []) {
    const product = PRODUCTS[productId];
    if (!product) return;

    // Buscar si ya existe la combinación exactamente igual (mismo producto y mismas salsas)
    const sauceKey = [...sauces].sort().join(',');
    const existingIndex = cart.findIndex(item => {
        const itemSauceKey = [...(item.sauces || [])].sort().join(',');
        return item.id === productId && itemSauceKey === sauceKey;
    });

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            sauces: sauces
        });
    }

    updateUI();
}

function updateQuantity(index, delta) {
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    updateUI();
}

function removeFromCart(index) {
    if (cart[index]) {
        cart.splice(index, 1);
    }
    updateUI();
}

// Actualiza las barras de subtotal, comanda y vistas dentro del modal
function updateUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Barra fija inferior
    const barCount = document.getElementById('barCount');
    const barTotal = document.getElementById('barTotal');
    if (barCount) barCount.innerText = totalItems;
    if (barTotal) barTotal.innerText = formatCurrency(subtotal);

    // Modal de comanda
    renderComandaItems();

    const isDelivery = document.querySelector('input[name="deliveryType"]:checked')?.value === 'delivery';
    const deliveryCost = isDelivery ? DELIVERY_COST : 0;
    const grandTotal = subtotal + deliveryCost;

    const subtotalText = document.getElementById('subtotalText');
    const totalText = document.getElementById('totalText');
    if (subtotalText) subtotalText.innerText = formatCurrency(subtotal);
    if (totalText) totalText.innerText = formatCurrency(grandTotal);
}

function renderComandaItems() {
    const listContainer = document.getElementById('comandaItemsList');
    if (!listContainer) return;

    if (cart.length === 0) {
        listContainer.innerHTML = '<p class="empty-cart-msg" style="text-align:center; color:#888; padding:20px 0;">Tu comanda está vacía 🌭</p>';
        return;
    }

    let html = '<div class="cart-items-wrapper">';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const saucesText = item.sauces && item.sauces.length > 0 
            ? `<div style="font-size: 0.85em; color: #e67e22;">🥣 Salsas: ${item.sauces.join(', ')}</div>` 
            : '';

        html += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
                <div style="flex: 1;">
                    <strong style="display: block;">${item.name}</strong>
                    ${saucesText}
                    <span style="color: #666;">${formatCurrency(item.price)} c/u</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button type="button" style="padding: 2px 8px; cursor: pointer;" onclick="updateQuantity(${index}, -1)">-</button>
                    <span><strong>${item.quantity}</strong></span>
                    <button type="button" style="padding: 2px 8px; cursor: pointer;" onclick="updateQuantity(${index}, 1)">+</button>
                    <button type="button" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 1.1em; margin-left: 5px;" onclick="removeFromCart(${index})">🗑️</button>
                </div>
            </div>
        `;
    });
    html += '</div>';

    listContainer.innerHTML = html;
}

// ==========================================
// 3. SELECCIÓN DE SALSAS (MODAL SALSAS)
// ==========================================
function openSauceModal(productId, maxSauces = 2) {
    pendingSauceProductId = productId;
    maxAllowedSauces = maxSauces;

    const maxSaucesSpan = document.getElementById('maxSaucesCount');
    if (maxSaucesSpan) maxSaucesSpan.innerText = maxAllowedSauces;

    // Desmarcar y habilitar todos los checkboxes
    const checkboxes = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });

    const modal = document.getElementById('sauceModal');
    if (modal) modal.style.display = 'flex';
}

function closeSauceModal() {
    pendingSauceProductId = null;
    const modal = document.getElementById('sauceModal');
    if (modal) modal.style.display = 'none';
}

function checkSauceLimit() {
    const checkboxes = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]');
    const checkedCount = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]:checked').length;

    // Si llegó al límite, deshabilitar los no seleccionados
    checkboxes.forEach(cb => {
        if (!cb.checked) {
            cb.disabled = checkedCount >= maxAllowedSauces;
        }
    });
}

function confirmSauceSelection() {
    const selectedBoxes = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]:checked');
    const selectedSauces = Array.from(selectedBoxes).map(cb => cb.value);

    if (pendingSauceProductId) {
        addToCart(pendingSauceProductId, selectedSauces);
    }

    closeSauceModal();
}

// ==========================================
// 4. MODAL COMANDA Y LÓGICA DELIVERY/RETIRO
// ==========================================
function toggleModal(show) {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = show ? 'flex' : 'none';
        if (show) updateDeliveryUI();
    }
}

function updateDeliveryUI() {
    const isDelivery = document.querySelector('input[name="deliveryType"]:checked')?.value === 'delivery';
    const addressSection = document.getElementById('addressSection');
    const deliveryRow = document.getElementById('deliveryRow');

    if (addressSection) {
        addressSection.style.display = isDelivery ? 'block' : 'none';
    }
    if (deliveryRow) {
        deliveryRow.style.display = isDelivery ? 'flex' : 'none';
    }

    updateUI();
}

// ==========================================
// 5. ENVIAR PEDIDO POR WHATSAPP
// ==========================================
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Tu comanda está vacía. ¡Agrega algún producto antes de enviar!");
        return;
    }

    const clientName = document.getElementById('clientName')?.value.trim();
    if (!clientName) {
        alert("Por favor, ingresa tu nombre para saber a quién va dirigido el pedido.");
        document.getElementById('clientName')?.focus();
        return;
    }

    const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value;
    const isDelivery = deliveryType === 'delivery';
    const addressInput = document.getElementById('addressInput')?.value.trim();

    if (isDelivery && !addressInput) {
        alert("Por favor, ingresa tu dirección para realizar el envío.");
        document.getElementById('addressInput')?.focus();
        return;
    }

    // Armado del mensaje
    let message = `🔥 *NUEVO PEDIDO - META PANCHOS* 🔥\n`;
    message += `👤 *Cliente:* ${clientName}\n`;
    message += `📍 *Modalidad:* ${isDelivery ? '🛵 Delivery' : '🛍️ Retiro en local'}\n`;
    
    if (isDelivery) {
        message += `🏠 *Dirección:* ${addressInput}\n`;
    }
    
    message += `-----------------------------------\n`;
    message += `📋 *DETALLE DEL PEDIDO:*\n\n`;

    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        message += `• ${item.quantity}x ${item.name}\n`;
        if (item.sauces && item.sauces.length > 0) {
            message += `   └ 🥣 Salsas: ${item.sauces.join(', ')}\n`;
        }
        message += `   └ Subtotal: ${formatCurrency(itemTotal)}\n\n`;
    });

    const deliveryCost = isDelivery ? DELIVERY_COST : 0;
    const total = subtotal + deliveryCost;

    message += `-----------------------------------\n`;
    message += `💵 *Subtotal:* ${formatCurrency(subtotal)}\n`;
    if (isDelivery) {
        message += `🛵 *Envío:* ${formatCurrency(DELIVERY_COST)}\n`;
    }
    message += `⭐ *TOTAL:* ${formatCurrency(total)}\n\n`;
    message += `¡Muchas gracias! Quedo a la espera de la confirmación.`;

    // Abrir la API de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Inicialización de la vista
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});