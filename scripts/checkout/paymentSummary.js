import { cart , getCartQuantity} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

const taxPercentage = 0.1;

export function renderPaymentSummary() {

    let paymentSummaryHTML = '';

    let totalCostCents = 0;
    let totalDeliveryCostCents = 0;
    let totalBeforeTaxCents = 0;
    let taxCents = 0;
    let grandTotalCents = 0;

    cart.forEach((cartItem) => {
        totalCostCents += (cartItem.quantity * getProduct(cartItem.productId).priceCents);
        totalDeliveryCostCents += getDeliveryOption(cartItem.deliveryOptionId).priceCents;
    });

    totalBeforeTaxCents = totalCostCents + totalDeliveryCostCents;
    taxCents = taxPercentage * totalBeforeTaxCents;
    grandTotalCents = totalBeforeTaxCents + taxCents;

    paymentSummaryHTML += 
    `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${getCartQuantity()}):</div>
        <div class="payment-summary-money">
        $${formatCurrency(totalCostCents)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        $${formatCurrency(totalDeliveryCostCents)}
        </div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (${taxPercentage*100}%):</div>
        <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
        </div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        $${formatCurrency(grandTotalCents)}
        </div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}