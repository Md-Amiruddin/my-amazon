export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }
    ];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    
    let matchingItem = '';

    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    const selectQuantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantitySelected = Number(selectQuantityElement.value);

    if(matchingItem){
        matchingItem.quantity += quantitySelected;
    } else {
        cart.push({
            productId : productId,
            quantity : quantitySelected,
            deliveryOptionId : '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId){
    let newCart = cart.filter((cartItem) => {
        if(cartItem.productId === productId){
            return false;
        }else{
            return true;
        }
    });

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(deliveryOptionId, productId){
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            cartItem.deliveryOptionId = deliveryOptionId;
        }
    });

    saveToStorage();
}

export function getCartQuantity() {
    let quantity = 0;

    cart.forEach((cartItem) => {
        quantity += cartItem.quantity;
    });

    return quantity;
}
