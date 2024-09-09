// Function to update pricing
function updatePricing(card) {
  // Get the card type
  const cardTypeElement = card.querySelector(".n-pricing-plan-type");
  if (!cardTypeElement) {
    console.log("Card type element not found");
    return;
  }
  const cardType = cardTypeElement.textContent.trim();

  // Get the price per month element
  const pricePerMonth = card.querySelector(".price-per-month");
  if (!pricePerMonth) {
    console.log("Price per month element not found");
    return;
  }

  // Get the billing cycle label element
  const billingCycleLabel = card.querySelector(".billing-cycle-label");
  if (!billingCycleLabel) {
    console.log("Billing cycle label element not found");
    return;
  }

  // Get the plan term details element
  const planTermDetails = card.querySelector(".plan-term-details");
  if (!planTermDetails) {
    console.log("Plan term details element not found");
    return;
  }

  // Update to monthly
  pricePerMonth.textContent = pricing[cardType].monthly;
  billingCycleLabel.textContent = "Monthly Plan";
  planTermDetails.textContent = billingDetails.monthly;
}

// Update pricing on page load
document.querySelectorAll(".new-pricing-card").forEach(updatePricing);

// Select all toggles
const toggles = document.querySelectorAll(".pricing-chart_toggle-container");

// Loop through each toggle
toggles.forEach((toggle, index) => {
  // Add event listener for click event
  toggle.addEventListener("click", function () {
    // Trigger click event on all other toggles
    toggles.forEach((otherToggle, otherIndex) => {
      if (otherIndex !== index) {
        otherToggle.click();
      }
    });

    // Get the parent card
    const card = this.closest(".new-pricing-card");
    if (!card) {
      console.log("Card not found");
      return;
    }

    // Get the card type
    const cardTypeElement = card.querySelector(".n-pricing-plan-type div");
    if (!cardTypeElement) {
      console.log("Card type element not found");
      return;
    }
    const cardType = cardTypeElement.textContent.trim();

    // Get the price per month element
    const pricePerMonth = card.querySelector(".price-per-month");
    if (!pricePerMonth) {
      console.log("Price per month element not found");
      return;
    }

    // Get the billing cycle label element
    const billingCycleLabel = card.querySelector(".billing-cycle-label");
    if (!billingCycleLabel) {
      console.log("Billing cycle label element not found");
      return;
    }

    // Get the plan term details element
    const planTermDetails = card.querySelector(".plan-term-details");
    if (!planTermDetails) {
      console.log("Plan term details element not found");
      return;
    }

    // Check the current price and update accordingly
    if (pricePerMonth.textContent.trim() === pricing[cardType].monthly) {
      // Update to annually
      pricePerMonth.textContent = pricing[cardType].annually;
      billingCycleLabel.textContent = "Annual Plan";
      planTermDetails.textContent = billingDetails.annually[cardType];
    } else {
      // Update to monthly
      pricePerMonth.textContent = pricing[cardType].monthly;
      billingCycleLabel.textContent = "Monthly Plan";
      planTermDetails.textContent = billingDetails.monthly;
    }
  });
});
