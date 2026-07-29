// ==========================================
// CONFIGURACIÓN Y ESTADO DE LA APLICACIÓN
// ==========================================
const PHONE_NUMBER = "2617111500"; // Número de WhatsApp (con código de país)
const DELIVERY_COST = 800;

// Base de datos de productos
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

    // Smash Burgers (Individuales)
    50: { id: 50, name: "Meta Beicon Simple", price: 6500 },
    51: { id: 51, name: "Meta Beicon Doble", price: 8500 },
    52: { id: 52, name: "Meta Beicon Triple", price: 10500 },

    53: { id: 53, name: "Meta BBQ Simple", price: 5500 },
    54: { id: 54, name: "Meta BBQ Doble", price: 7500 },
    55: { id: 55, name: "Meta BBQ Triple", price: 9000 },

    56: { id: 56, name: "Meta Smash Simple", price: 6500 },
    57: { id: 57, name: "Meta Smash Doble", price: 8500 },
    58: { id: 58, name: "Meta Smash Triple", price: 10000 },

    59: { id: 59, name: "Monster Smash Simple", price: 7500 },
    60: { id: 60, name: "Monster Smash Doble", price: 9500 },
    61: { id: 61, name: "Monster Smash Triple", price: 11000 },

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
    119: { id: 119, name: "Agregado: Doble Salchicha", price: 1000 },
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

// Map de ingredientes base según cada producto / promo
const BURGER_BASE_INGREDIENTS = {
    // META BEICON (Simple, Doble, Triple)
    50: ["Cheddar / Queso", "Barbacoa", "Beicon", "Cebolla Caramelizada", "Pan de Papa"],
    51: ["Cheddar / Queso", "Barbacoa", "Beicon", "Cebolla Caramelizada", "Pan de Papa"],
    52: ["Cheddar / Queso", "Barbacoa", "Beicon", "Cebolla Caramelizada", "Pan de Papa"],

    // META BBQ (Simple, Doble, Triple)
    53: ["Barbacoa", "Lechuga", "Tomate", "Pan de Papa"],
    54: ["Barbacoa", "Lechuga", "Tomate", "Pan de Papa"],
    55: ["Barbacoa", "Lechuga", "Tomate", "Pan de Papa"],

    // META SMASH (Simple, Doble, Triple)
    56: ["Barbacoa", "Lechuga", "Tomate", "Jamón", "Cheddar / Queso", "Huevo", "Pan de Papa"],
    57: ["Barbacoa", "Lechuga", "Tomate", "Jamón", "Cheddar / Queso", "Huevo", "Pan de Papa"],
    58: ["Barbacoa", "Lechuga", "Tomate", "Jamón", "Cheddar / Queso", "Huevo", "Pan de Papa"],

    // MONSTER SMASH (Simple, Doble, Triple)
    59: ["Cheddar / Queso", "Barbacoa", "Palta", "Lechuga", "Tomate", "Beicon", "Cebolla Caramelizada", "Pan de Papa"],
    60: ["Cheddar / Queso", "Barbacoa", "Palta", "Lechuga", "Tomate", "Beicon", "Cebolla Caramelizada", "Pan de Papa"],
    61: ["Cheddar / Queso", "Barbacoa", "Palta", "Lechuga", "Tomate", "Beicon", "Cebolla Caramelizada", "Pan de Papa"],

    // PROMOS SMASH (2 Unidades por Promo)
    4: ["Barbacoa", "Lechuga", "Tomate", "Jamón", "Cheddar / Queso", "Huevo", "Pan de Papa"], // Meta Smash Simple
    5: ["Cheddar / Queso", "Barbacoa", "Beicon", "Cebolla Caramelizada", "Pan de Papa"], // Meta Beicon Simple
    6: ["Cheddar / Queso", "Barbacoa", "Beicon", "Cebolla Caramelizada", "Pan de Papa"], // Meta Beicon Doble
    7: ["Cheddar / Queso", "Barbacoa", "Palta", "Lechuga", "Tomate", "Beicon", "Cebolla Caramelizada", "Pan de Papa"], // Monster Doble
    8: ["Cheddar / Queso", "Barbacoa", "Beicon", "Cebolla Caramelizada", "Pan de Papa"], // Meta Beicon Triple
    9: ["Cheddar / Queso", "Barbacoa", "Palta", "Lechuga", "Tomate", "Beicon", "Cebolla Caramelizada", "Pan de Papa"], // Monster Triple
    21: ["Barbacoa", "Lechuga", "Tomate", "Jamón", "Cheddar / Queso", "Huevo", "Pan de Papa"], // 2 Meta Smash + Papas + 2 Latas

    // Hamburguesas Tradicionales
    106: ["Jamón", "Cheddar / Queso", "Huevo", "Lechuga", "Tomate"],
    107: ["Cheddar / Queso", "Lechuga", "Tomate", "Jamón", "Huevo", "Beicon"]
};

let cart = [];

// Variables para el Wizard de Salsas
let wizardState = {
    productId: null,
    maxSauces: 2,
    totalItemsCount: 1,
    currentItemStep: 1,
    accumulatedSauces: []
};

// Variables para el Wizard de Ingredientes de Hamburguesas
let burgerWizardState = {
    productId: null,
    totalItemsCount: 1,
    currentItemStep: 1,
    accumulatedIngredients: []
};

// Formateador de moneda (ARS)
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
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) buttonElement.classList.add('active');

    const sections = document.querySelectorAll('.menu-section');
    sections.forEach(section => {
        const sectionCategory = section.getAttribute('data-category-section');
        section.style.display = (category === 'todos' || sectionCategory === category) ? 'block' : 'none';
    });
}

// ==========================================
// 2. GESTIÓN DEL CARRITO / COMANDA
// ==========================================
function addToCart(productId, detailsArray = []) {
    const product = PRODUCTS[productId];
    if (!product) return;

    let detailsFormattedString = "";
    if (Array.isArray(detailsArray) && detailsArray.length > 0) {
        if (Array.isArray(detailsArray[0])) {
            detailsFormattedString = detailsArray.map((item, idx) => {
                const text = item.length > 0 ? item.join(', ') : 'Sin ingredientes adicionales';
                return `[Unidad ${idx + 1}: ${text}]`;
            }).join(' | ');
        } else {
            detailsFormattedString = detailsArray.join(', ');
        }
    }

    const existingIndex = cart.findIndex(item => {
        return item.id === productId && item.saucesText === detailsFormattedString;
    });

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            saucesText: detailsFormattedString
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

function updateUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const barCount = document.getElementById('barCount');
    const barTotal = document.getElementById('barTotal');
    if (barCount) barCount.innerText = totalItems;
    if (barTotal) barTotal.innerText = formatCurrency(subtotal);

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
        const detailsText = item.saucesText 
            ? `<div style="font-size: 0.85em; color: #e67e22; margin-top:2px;">🥣 Detalle: ${item.saucesText}</div>` 
            : '';

        html += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
                <div style="flex: 1;">
                    <strong style="display: block;">${item.name}</strong>
                    ${detailsText}
                    <span style="color: #666; font-size:0.9em;">${formatCurrency(item.price)} c/u</span>
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
// 3. WIZARD PASO A PASO DE SALSAS
// ==========================================
function openSauceWizard(productId, maxSauces = 2, totalItemsCount = 1) {
    wizardState = {
        productId: Number(productId),
        maxSauces: Number(maxSauces),
        totalItemsCount: Number(totalItemsCount),
        currentItemStep: 1,
        accumulatedSauces: []
    };

    const maxSaucesSpan = document.getElementById('maxSaucesCount');
    if (maxSaucesSpan) maxSaucesSpan.innerText = wizardState.maxSauces;

    updateWizardStepUI();

    const modal = document.getElementById('sauceModal');
    if (modal) modal.style.display = 'flex';
}

function updateWizardStepUI() {
    const stepIndicator = document.getElementById('stepIndicator');
    const confirmBtn = document.getElementById('confirmSauceBtn');

    if (stepIndicator) {
        if (wizardState.totalItemsCount > 1) {
            stepIndicator.innerText = `Pancho ${wizardState.currentItemStep} de ${wizardState.totalItemsCount}`;
            stepIndicator.style.display = 'block';
        } else {
            stepIndicator.style.display = 'none';
        }
    }

    if (confirmBtn) {
        if (wizardState.currentItemStep < wizardState.totalItemsCount) {
            confirmBtn.innerText = 'Siguiente Pancho ➔';
        } else {
            confirmBtn.innerText = '✔ Agregar al Carrito';
        }
    }

    const checkboxes = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });
}

function closeSauceModal() {
    const modal = document.getElementById('sauceModal');
    if (modal) modal.style.display = 'none';
}

function checkSauceLimit() {
    const checkboxes = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]:checked');

    checkboxes.forEach(cb => {
        if (!cb.checked) {
            cb.disabled = checkedBoxes.length >= wizardState.maxSauces;
        }
    });
}

function confirmSauceStep() {
    const selectedBoxes = document.querySelectorAll('#saucesOptionsList input[type="checkbox"]:checked');
    const currentStepSauces = Array.from(selectedBoxes).map(cb => cb.value);

    wizardState.accumulatedSauces.push(currentStepSauces);

    if (wizardState.currentItemStep < wizardState.totalItemsCount) {
        wizardState.currentItemStep += 1;
        updateWizardStepUI();
    } else {
        addToCart(wizardState.productId, wizardState.accumulatedSauces);
        closeSauceModal();
    }
}

// ==========================================
// 4. WIZARD DE INGREDIENTES PARA BURGERS (DINÁMICO)
// ==========================================

// Mapeo auxiliar para conocer la composición exacta de hamburguesas en las promos de 2 unidades
const BURGER_PROMO_COMPOSITION = {
    4: [56, 56], // 2 Meta Smash Simple
    5: [50, 50], // 2 Meta Beicon Simple
    6: [51, 51], // 2 Meta Beicon Doble
    7: [60, 60], // 2 Monster Smash Doble
    8: [52, 52], // 2 Meta Beicon Triple
    9: [61, 61], // 2 Monster Smash Triple
    21: [56, 56] // 2 Meta Smash Simple + Papas + 2 Latas
};

function openBurgerWizard(productId, totalItemsCount = 1) {
    const modal = document.getElementById('burgerIngredientsModal');
    if (!modal) {
        console.error("Error: No se encontró el modal con id 'burgerIngredientsModal' en el HTML.");
        alert("Ocurrió un error al abrir el menú de la hamburguesa. Revisá que el modal esté en el HTML.");
        return;
    }

    burgerWizardState = {
        productId: Number(productId),
        totalItemsCount: Number(totalItemsCount),
        currentItemStep: 1,
        accumulatedIngredients: []
    };

    updateBurgerWizardStepUI();

    // Mostrar el modal
    modal.style.display = 'flex';
}

function updateBurgerWizardStepUI() {
    const stepIndicator = document.getElementById('burgerStepIndicator');
    const confirmBtn = document.getElementById('confirmBurgerBtn');
    const optionsList = document.getElementById('burgerIngredientsOptionsList');
    const modalTitle = document.querySelector('#burgerIngredientsModal .modal-header h3');

    // 1. Determinar de qué hamburguesa específica debemos cargar ingredientes en este paso
    let currentBurgerId = burgerWizardState.productId;
    
    if (burgerWizardState.totalItemsCount > 1 && BURGER_PROMO_COMPOSITION[burgerWizardState.productId]) {
        const promoList = BURGER_PROMO_COMPOSITION[burgerWizardState.productId];
        currentBurgerId = promoList[burgerWizardState.currentItemStep - 1] || burgerWizardState.productId;
    }

    const currentProductObj = PRODUCTS[currentBurgerId] || PRODUCTS[burgerWizardState.productId];

    // 2. Actualizar Título
    if (modalTitle && currentProductObj) {
        modalTitle.innerText = `Personalizá tu ${currentProductObj.name} 🍔`;
    }

    // 3. Actualizar Indicador de Pasos
    if (stepIndicator) {
        if (burgerWizardState.totalItemsCount > 1) {
            stepIndicator.innerText = `Hamburguesa ${burgerWizardState.currentItemStep} de ${burgerWizardState.totalItemsCount}`;
            stepIndicator.style.display = 'block';
        } else {
            stepIndicator.style.display = 'none';
        }
    }

    // 4. Actualizar Botón
    if (confirmBtn) {
        if (burgerWizardState.currentItemStep < burgerWizardState.totalItemsCount) {
            confirmBtn.innerText = 'Siguiente Hamburguesa ➔';
        } else {
            confirmBtn.innerText = '✔ Agregar al Carrito';
        }
    }

    // 5. Renderizar dinámicamente los Checkboxes
    if (optionsList) {
        optionsList.innerHTML = ''; // Limpiamos opciones previas
        
        const baseIngredients = BURGER_BASE_INGREDIENTS[currentBurgerId] || [];

        if (baseIngredients.length === 0) {
            optionsList.innerHTML = '<p style="color: #666; font-size: 0.9em;">Esta opción no posee ingredientes personalizables.</p>';
            return;
        }

        baseIngredients.forEach(ingredient => {
            const label = document.createElement('label');
            label.className = 'sauce-option';
            label.innerHTML = `
                <input type="checkbox" value="${ingredient}" checked> ${ingredient}
            `;
            optionsList.appendChild(label);
        });
    }
}

function closeBurgerModal() {
    const modal = document.getElementById('burgerIngredientsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function confirmBurgerStep() {
    const optionsList = document.getElementById('burgerIngredientsOptionsList');
    let currentStepIngredients = [];

    if (optionsList) {
        const selectedBoxes = optionsList.querySelectorAll('input[type="checkbox"]:checked');
        currentStepIngredients = Array.from(selectedBoxes).map(cb => cb.value);
    }

    burgerWizardState.accumulatedIngredients.push(currentStepIngredients);

    if (burgerWizardState.currentItemStep < burgerWizardState.totalItemsCount) {
        burgerWizardState.currentItemStep += 1;
        updateBurgerWizardStepUI();
    } else {
        addToCart(burgerWizardState.productId, burgerWizardState.accumulatedIngredients);
        closeBurgerModal();
    }
}

// ==========================================
// 5. MODAL COMANDA Y DELIVERY
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

    if (addressSection) addressSection.style.display = isDelivery ? 'block' : 'none';
    if (deliveryRow) deliveryRow.style.display = isDelivery ? 'flex' : 'none';

    updateUI();
}

// ==========================================
// 6. ENVIAR PEDIDO POR WHATSAPP
// ==========================================
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Tu comanda está vacía. ¡Agregá algún producto antes de enviar!");
        return;
    }

    const clientNameInput = document.getElementById('clientName');
    const clientName = clientNameInput?.value.trim();
    if (!clientName) {
        alert("Por favor, ingresá tu nombre para saber a quién va dirigido el pedido.");
        clientNameInput?.focus();
        return;
    }

    const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value;
    const isDelivery = deliveryType === 'delivery';
    const addressInput = document.getElementById('addressInput');
    const addressValue = addressInput?.value.trim();

    if (isDelivery && !addressValue) {
        alert("Por favor, ingresá tu dirección para realizar el envío.");
        addressInput?.focus();
        return;
    }

    let message = `🔥 *NUEVO PEDIDO - META PANCHOS* 🔥\n`;
    message += `👤 *Cliente:* ${clientName}\n`;
    message += `📍 *Modalidad:* ${isDelivery ? '🛵 Delivery' : '🛍️ Retiro en local'}\n`;
    
    if (isDelivery) {
        message += `🏠 *Dirección:* ${addressValue}\n`;
    }
    
    message += `-----------------------------------\n`;
    message += `📋 *DETALLE DEL PEDIDO:*\n\n`;

    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        message += `• ${item.quantity}x ${item.name}\n`;
        if (item.saucesText) {
            message += `   └ 🥣 Ingredientes/Salsas: ${item.saucesText}\n`;
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

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Inicialización de la app
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});