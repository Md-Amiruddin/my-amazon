export let cart = [];

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
            quantity : quantitySelected
        });
    }
}
