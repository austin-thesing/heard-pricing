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

  // Update to annual pricing by default (when toggle is OFF)
  pricePerMonth.textContent = pricing[cardType].annually;
  billingCycleLabel.textContent = "Annual Plan";
  planTermDetails.textContent = billingDetails.annually[cardType];

  // Update compare-at price if it exists
  const compareAtPrice = card.querySelector(".compare-at-price");
  if (compareAtPrice && pricing[cardType].compare_annual) {
    compareAtPrice.textContent = pricing[cardType].compare_annual;
  }

  // Set initial state for bottom price details
  const monthlyDetails = card.querySelector('.bottom-price-details[plan-type="monthly"]');
  const annualDetails = card.querySelector('.bottom-price-details[plan-type="annual"]');
  if (monthlyDetails) monthlyDetails.style.display = "none";
  if (annualDetails) annualDetails.style.display = "block";

  // Update save-x-percent element visibility
  const savePercent = card.querySelector(".save-x-percent");
  if (savePercent) {
    savePercent.style.color = ""; // Default green color
  }

  // Update the toggle to show inactive state for annual
  const toggle = card.querySelector(".pricing-chart_toggle-container");
  if (toggle) {
    toggle.classList.remove("is-active");
  }
}

// Update pricing on page load
document.querySelectorAll(".new-pricing-card").forEach(updatePricing);

// Select all toggles
const toggles = document.querySelectorAll(".pricing-chart_toggle-container");

// Function to update all pricing cards
function updateAllPricingCards(isMonthly) {
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

    if (isMonthly) {
      pricePerMonth.textContent = pricing[cardType].monthly;
      billingCycleLabel.textContent = "Monthly Plan";
      planTermDetails.textContent = billingDetails.monthly;
      toggle.classList.add("is-active");

      // Update save percent element to gray
      const savePercent = card.querySelector(".save-x-percent");
      if (savePercent) {
        savePercent.style.color = "#aaa";
      }

      // Update compare-at price for monthly
      const compareAtPrice = card.querySelector(".compare-at-price");
      if (compareAtPrice && pricing[cardType].compare_monthly) {
        compareAtPrice.textContent = pricing[cardType].compare_monthly;
      }

      // Show monthly bottom price details and hide annual
      const monthlyDetails = card.querySelector('.bottom-price-details[plan-type="monthly"]');
      const annualDetails = card.querySelector('.bottom-price-details[plan-type="annual"]');
      if (monthlyDetails) monthlyDetails.style.display = "block";
      if (annualDetails) annualDetails.style.display = "none";
    } else {
      pricePerMonth.textContent = pricing[cardType].annually;
      billingCycleLabel.textContent = "Annual Plan";
      planTermDetails.textContent = billingDetails.annually[cardType];
      toggle.classList.remove("is-active");

      // Update save percent element to default green
      const savePercent = card.querySelector(".save-x-percent");
      if (savePercent) {
        savePercent.style.color = "";
      }

      // Update compare-at price for annual
      const compareAtPrice = card.querySelector(".compare-at-price");
      if (compareAtPrice && pricing[cardType].compare_annual) {
        compareAtPrice.textContent = pricing[cardType].compare_annual;
      }

      // Show annual bottom price details and hide monthly
      const monthlyDetails = card.querySelector('.bottom-price-details[plan-type="monthly"]');
      const annualDetails = card.querySelector('.bottom-price-details[plan-type="annual"]');
      if (monthlyDetails) monthlyDetails.style.display = "none";
      if (annualDetails) annualDetails.style.display = "block";
    }
  });

  // Update all toggle states
  toggles.forEach((toggle) => {
    if (isMonthly) {
      toggle.classList.add("is-active");
    } else {
      toggle.classList.remove("is-active");
    }
  });
}

// Add click event listener to all toggles
toggles.forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const isActive = this.classList.contains("is-active");
    const newState = !isActive;

    // Update all toggles with actual clicks
    toggles.forEach((otherToggle) => {
      if (otherToggle !== this) {
        // Trigger actual click event on other toggles
        otherToggle.click();
      }
    });

    // Update all pricing cards
    updateAllPricingCards(newState);
  });
});

// Update pricing on page load to show annual pricing by default (toggle OFF)
updateAllPricingCards(false);
