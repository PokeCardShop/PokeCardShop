
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const categorySelect = document.getElementById('categorySelect');
    const images = document.querySelectorAll('.gallery .product');
    const cart = document.querySelector('.cart');
    const cartPopup = document.querySelector('.cart-popup');
    const cartContent = document.querySelector('.cart-popup-content');

    let cartItems = [];

    function updateCartDisplay() {
        cart.textContent = `Panier (${cartItems.length})`;
        if (cartItems.length === 0) {
            cartContent.innerHTML = '<p>Aucun produit pour le moment.</p>';
        } else {
            cartContent.innerHTML = '<ul>' + cartItems.map((item, index) => 
                `<li>${item} <span class="remove-btn" data-index="${index}">X</span></li>`
            ).join('') + '</ul>';
        }

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const i = e.target.getAttribute('data-index');
                cartItems.splice(i, 1);
                updateCartDisplay();
            });
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            cartItems.push(name);
            updateCartDisplay();
        });
    });

    searchBar.addEventListener('input', () => filterGallery());
    categorySelect.addEventListener('change', () => filterGallery());

    function filterGallery() {
        const query = searchBar.value.toLowerCase();
        const category = categorySelect.value.toLowerCase();

        images.forEach(product => {
            const alt = product.getAttribute('data-name').toLowerCase();
            const visible = (!query || alt.includes(query)) && (!category || alt.includes(category));
            product.style.display = visible ? 'block' : 'none';
        });
    }

    cart.addEventListener('click', () => {
        cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    });

    updateCartDisplay();
});
