import { cart , removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";

renderOrderSummary();

function renderOrderSummary() {
    
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        let checkoutProduct = '';
        let dateString = '';
    
        products.forEach((productItem) => {
            if(cartItem.productId === productItem.id){
                checkoutProduct = productItem;
            }
        });

        deliveryOptions.forEach((option) => {
            if(option.id === cartItem.deliveryOptionId){
                const today = dayjs();
                const deliveryDate = today.add(option.deliveryDays, 'days');
                dateString = deliveryDate.format('dddd, MMMM D');
            }
        });
    
        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${checkoutProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${checkoutProduct.image}">
    
                <div class="cart-item-details">
                    <div class="product-name">
                    ${checkoutProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(checkoutProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${checkoutProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>
    
                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(cartItem, checkoutProduct)}
                </div>
                </div>
            </div>
        `;
    
    });

    function deliveryOptionsHTML(cartItem, checkoutProduct) {
        let html = '';
        const today = dayjs();

        deliveryOptions.forEach((option) => {
            const deliveryDate = today.add(option.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;
            const isChecked = cartItem.deliveryOptionId === option.id ? 'checked' : '';
            html += 
            `
                <div class="delivery-option js-delivery-option"
                data-product-id='${checkoutProduct.id}'
                data-delivery-option-id='${option.id}'>
                    <input type="radio"
                        ${isChecked}
                        class="delivery-option-input"
                        name="delivery-option-${checkoutProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
        });

        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

}

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const removeProductId = link.dataset.productId;
        removeFromCart(removeProductId);
        document.querySelector(`.js-cart-item-container-${removeProductId}`).remove();
    })
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
        const deliveryOptionId = element.dataset.deliveryOptionId;
        const productId = element.dataset.productId;
        updateDeliveryOption(deliveryOptionId, productId);
    });
});