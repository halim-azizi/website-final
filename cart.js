document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

function getCart() {
    const cart = localStorage.getItem('mulliri_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('mulliri_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id, name, price, image) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    saveCart(cart);
    alert(`${name} added to cart!`);
}

function buyNow(id, name, price, image) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === id);

    if (!existingItem) {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    saveCart(cart);
    window.location.href = 'cart.html';
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'grid' : 'none';
    }
}

async function recordTransaction(cart, total) {
    const newTransaction = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'Completed'
    };

    // Save to Supabase if client is available
    if (window.supabaseClient) {
        try {
            const { error } = await window.supabaseClient
                .from('transactions')
                .insert([newTransaction]);

            if (error) {
                console.warn('Supabase insert error:', error.message);
            }
        } catch (err) {
            console.warn('Could not save to Supabase:', err);
        }
    }

    // Also keep a local copy as fallback
    const transactions = JSON.parse(localStorage.getItem('mulliri_transactions') || '[]');
    transactions.unshift(newTransaction);
    localStorage.setItem('mulliri_transactions', JSON.stringify(transactions));

    localStorage.removeItem('mulliri_cart');
    updateCartCount();
}
