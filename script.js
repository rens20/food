
    document.addEventListener("DOMContentLoaded", function() {
        let cart = [];

        // Add to cart button click event handler
        const addToCartButtons = document.querySelectorAll('.default-btn');
        addToCartButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var itemName = button.closest('.featured-item').querySelector('h3').textContent.trim();
                var itemPriceString = button.closest('.featured-item').querySelector('.price').textContent.trim();
                var itemPrice = parseFloat(itemPriceString.replace(/[^0-9.]/g, '')); // Extract numbers from string
                
                addToCart(itemName, itemPrice);
                updateCartModal();
            });
        });

        // Delete item button click event handler
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-item')) {
                var index = parseInt(event.target.getAttribute('data-index'));
                removeFromCart(index);
                updateCartModal();
            }
        });

        // Function to add an item to the cart
        function addToCart(name, price) {
            cart.push({ name: name, price: price });
        }

        // Function to remove an item from the cart
        function removeFromCart(index) {
            cart.splice(index, 1);
        }

        // Function to update the cart modal
        function updateCartModal() {
            const  modal = document.getElementById('staticBackdrop');
        const  cartTable = modal.querySelector('.show-cart');
            const totalCartElement = modal.querySelector('.total-cart');

            cartTable.innerHTML = ''; // Clear existing content

            let totalPrice = 0;
            cart.forEach(function(item, index) {
                totalPrice += item.price;
                var itemRow = '<tr><td>' + item.name + '</td><td>PHP ' + item.price.toFixed(2) + '</td>';
                itemRow += '<td><button class="btn btn-danger delete-item" data-index="' + index + '">Delete</button></td></tr>';
                cartTable.insertAdjacentHTML('beforeend', itemRow);
            });

            totalCartElement.textContent = totalPrice.toFixed(2);

            modal.classList.add('show'); // Show the modal
        }
    });
