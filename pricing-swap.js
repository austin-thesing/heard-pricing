// Function to update pricing
function updatePricing(card) {
  const cardType = card.querySelector(".n-pricing-plan-type")?.textContent.trim();
  const pricePerMonth = card.querySelector(".price-per-month");
  const billingCycleLabel = card.querySelector(".billing-cycle-label");
  const planTermDetails = card.querySelector(".plan-term-details");

  if (cardType && pricePerMonth) {
    pricePerMonth.textContent = pricing[cardType]?.monthly || "N/A";
  }
  if (billingCycleLabel) billingCycleLabel.textContent = "Monthly Plan";
  if (planTermDetails) planTermDetails.textContent = billingDetails.monthly;
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
    const cardType = card.querySelector(".n-pricing-plan-type div")?.textContent.trim();
    const pricePerMonth = card.querySelector(".price-per-month");
    const billingCycleLabel = card.querySelector(".billing-cycle-label");
    const planTermDetails = card.querySelector(".plan-term-details");

    if (cardType && pricePerMonth) {
      const isMonthly = pricePerMonth.textContent.trim() === pricing[cardType]?.monthly;
      pricePerMonth.textContent = isMonthly ? pricing[cardType]?.annually : pricing[cardType]?.monthly;
      if (billingCycleLabel) billingCycleLabel.textContent = isMonthly ? "Annual Plan" : "Monthly Plan";
      if (planTermDetails) planTermDetails.textContent = isMonthly ? billingDetails.annually[cardType] : billingDetails.monthly;
    }
  });
});
