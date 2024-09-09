// Function to update pricing
function updatePricing(card) {
  // Get the card type
  const cardTypeElement = card.querySelector(".n-pricing-plan-type.new h3");
  if (!cardTypeElement) {
    console.log("Card type element not found");
    return;
  }
  let cardType = cardTypeElement.textContent.trim();

  // Check if the cardType exists in the pricing object, if not, try to match
  if (!pricing[cardType]) {
    const pricingKeys = Object.keys(pricing);
    cardType = pricingKeys.find((key) => key.includes(cardType));
    if (!cardType) {
      console.log(`Pricing not found for card type: ${cardType}`);
      return;
    }
  }

  // Get the price per month element
  const pricePerMonth = card.querySelector(".price-per-term .price-per-month");
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
  const planTermDetails = card.querySelector(".plan-pricing-wrap .plan-term-details");
  if (!planTermDetails) {
    console.log("Plan term details element not found");
    return;
  }

  // Update to monthly
  pricePerMonth.textContent = pricing[cardType].monthly;
  billingCycleLabel.textContent = "Monthly Plan";
  planTermDetails.textContent = billingDetails.monthly;

  // Update the toggle
  const toggle = card.querySelector(".plan-toggle");
  if (toggle) {
    toggle.classList.remove("is-active");
  }
}

// Update pricing on page load
document.querySelectorAll(".new-pricing-card").forEach(updatePricing);

// Select all toggles
const toggles = document.querySelectorAll(".pricing-chart_toggle-container");

// Function to update all pricing cards
function updateAllPricingCards(isAnnual) {
  document.querySelectorAll(".new-pricing-card").forEach((card) => {
    const cardTypeElement = card.querySelector(".n-pricing-plan-type.new h3");
    if (!cardTypeElement) {
      console.log("Card type element not found");
      return;
    }
    let cardType = cardTypeElement.textContent.trim();

    // Check if the cardType exists in the pricing object, if not, try to match
    if (!pricing[cardType]) {
      const pricingKeys = Object.keys(pricing);
      cardType = pricingKeys.find((key) => key.includes(cardType));
      if (!cardType) {
        console.log(`Pricing not found for card type: ${cardType}`);
        return;
      }
    }

    const pricePerMonth = card.querySelector(".price-per-term .price-per-month");
    const billingCycleLabel = card.querySelector(".billing-cycle-label");
    const planTermDetails = card.querySelector(".plan-pricing-wrap .plan-term-details");
    const toggle = card.querySelector(".pricing-chart_toggle-container");

    if (isAnnual) {
      pricePerMonth.textContent = pricing[cardType].annually;
      billingCycleLabel.textContent = "Annual Plan";
      planTermDetails.textContent = billingDetails.annually[cardType];
      toggle.classList.add("is-active");
    } else {
      pricePerMonth.textContent = pricing[cardType].monthly;
      billingCycleLabel.textContent = "Monthly Plan";
      planTermDetails.textContent = billingDetails.monthly;
      toggle.classList.remove("is-active");
    }
  });
}

// Add click event listener to all toggles
toggles.forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const isActive = this.classList.contains("is-active");
    const newState = !isActive;

    // Update all toggles
    toggles.forEach((otherToggle) => {
      if (otherToggle !== this) {
        // Simulate a click on other toggles
        otherToggle.click();
      }
    });

    // Update all pricing cards
    updateAllPricingCards(newState);
  });
});

// Update pricing on page load
updateAllPricingCards(false);
