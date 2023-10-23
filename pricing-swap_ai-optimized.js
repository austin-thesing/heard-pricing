// Pricing information
const pricing = {
  "Sole Proprietor": {
    monthly: "199",
    annually: "169",
  },
  "S Corporation": {
    monthly: "299",
    annually: "255",
  },
  "Sole Proprietor or S Corporation": {
    monthly: "299",
    annually: "255",
  },
};

// Billing details
const billingDetails = {
  monthly: "Billed monthly • Cancel anytime",
  annually: {
    "Sole Proprietor": "Billed $2,028 annually",
    "S Corporation": "Billed $3,060 annually",
    "Sole Proprietor or S Corporation": "Billed $3,060 annually",
  },
};

// Function to update pricing
function updatePricing(card, cycle = "annually") {
  const selectors = {
    cardType: ".n-pricing-plan-type div",
    pricePerMonth: ".price-per-month",
    billingCycleLabel: ".billing-cycle-label",
    planTermDetails: ".plan-term-details",
  };

  const elements = Object.keys(selectors).reduce((acc, key) => {
    const el = card.querySelector(selectors[key]);
    if (!el) {
      console.log(`${key} element not found`);
      return acc;
    }
    return { ...acc, [key]: el };
  }, {});

  if (Object.keys(elements).length !== Object.keys(selectors).length) return;

  const cardType = elements.cardType.textContent.trim();
  elements.pricePerMonth.textContent = pricing[cardType][cycle];
  elements.billingCycleLabel.textContent = `${
    cycle.charAt(0).toUpperCase() + cycle.slice(1)
  } Plan`;
  elements.planTermDetails.textContent =
    billingDetails[cycle][cardType] || billingDetails[cycle];
}

// Update pricing on page load
document
  .querySelectorAll(".new-pricing-card")
  .forEach((card) => updatePricing(card, "annually"));

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

    // Get the price per month element
    const pricePerMonth = card.querySelector(".price-per-month");
    if (!pricePerMonth) {
      console.log("Price per month element not found");
      return;
    }

    // Get the card type
    const cardTypeElement = card.querySelector(".n-pricing-plan-type div");
    if (!cardTypeElement) {
      console.log("Card type element not found");
      return;
    }
    const cardType = cardTypeElement.textContent.trim();

    // Check the current price and update accordingly
    const cycle =
      pricePerMonth.textContent.trim() === pricing[cardType].monthly
        ? "annually"
        : "monthly";
    updatePricing(card, cycle);
  });
});
