/**
 * Improved Pricing Toggle Script
 *
 * This script handles the pricing toggle functionality for switching between monthly and annual pricing.
 * Improvements include:
 * - Better code organization with ES6+ features
 * - Improved error handling and logging
 * - Reduced code duplication
 * - Better performance with fewer DOM queries
 * - More maintainable structure with clear separation of concerns
 * - Direct imports instead of relying on global variables
 */

// Import pricing configuration directly
import { pricing, billingDetails } from "./global-pricing-declarations.js";

class PricingManager {
  constructor() {
    this.cards = document.querySelectorAll(".new-pricing-card");
    this.toggles = document.querySelectorAll(".pricing-chart_toggle-container");
    this.isMonthlyPricing = false;
    this.isUpdating = false; // Flag to prevent infinite loops

    this.init();
  }

  init() {
    // Initialize all cards with annual pricing by default
    this.updateAllCards(false);

    // Add event listeners to toggles
    this.setupToggleListeners();

    console.log(
      "Pricing manager initialized with",
      this.cards.length,
      "pricing cards and",
      this.toggles.length,
      "toggles"
    );
  }

  setupToggleListeners() {
    this.toggles.forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        // Prevent handling if we're in the middle of an update
        if (this.isUpdating) {
          return;
        }

        console.log("Toggle clicked, current state:", this.isMonthlyPricing);

        // Set the updating flag to prevent infinite loops
        this.isUpdating = true;

        // Toggle the pricing state
        this.isMonthlyPricing = !this.isMonthlyPricing;

        console.log("New state after toggle:", this.isMonthlyPricing);

        // Trigger clicks on other toggles to ensure Webflow interactions work
        this.triggerOtherToggles(toggle);

        // Update all pricing cards
        this.updateAllCards(this.isMonthlyPricing);

        // Reset the updating flag after a short delay
        setTimeout(() => {
          this.isUpdating = false;
        }, 100);
      });
    });
  }

  triggerOtherToggles(sourceToggle) {
    // Trigger actual clicks on other toggles to ensure Webflow interactions work
    this.toggles.forEach((toggle) => {
      // Skip the source toggle that was clicked
      if (toggle === sourceToggle) return;

      // Trigger a click on the other toggle
      toggle.click();
    });
  }

  syncAllToggles() {
    // This method is now only used for initialization
    // We don't manually update toggle classes anymore as we rely on Webflow's interactions
    this.toggles.forEach((toggle) => {
      if (this.isMonthlyPricing) {
        toggle.classList.add("is-active");
      } else {
        toggle.classList.remove("is-active");
      }
    });
  }

  getCardType(card) {
    const cardTypeElement = card.querySelector(".n-pricing-plan-type.new h3");
    if (!cardTypeElement) {
      console.warn("Card type element not found");
      return null;
    }

    let cardType = cardTypeElement.textContent.trim();

    // Check if the cardType exists in the pricing object, if not, try to match
    if (!pricing[cardType]) {
      const pricingKeys = Object.keys(pricing);
      const matchedType = pricingKeys.find((key) => key.includes(cardType));

      if (!matchedType) {
        console.warn(`Pricing not found for card type: ${cardType}`);
        return null;
      }

      return matchedType;
    }

    return cardType;
  }

  updateCard(card, isMonthly) {
    const cardType = this.getCardType(card);
    if (!cardType) return;

    // Get all required elements once
    const elements = {
      pricePerMonth: card.querySelector(".price-per-term .price-per-month"),
      billingCycleLabel: card.querySelector(".billing-cycle-label"),
      planTermDetails: card.querySelector(".plan-pricing-wrap .plan-term-details"),
      savePercent: card.querySelector(".save-x-percent"),
      monthlyDetails: card.querySelector('.bottom-price-details[plan-type="monthly"]'),
      annualDetails: card.querySelector('.bottom-price-details[plan-type="annual"]'),
    };

    // Check if required elements exist
    if (!elements.pricePerMonth || !elements.billingCycleLabel || !elements.planTermDetails) {
      console.warn("Required pricing elements not found for card:", cardType);
      return;
    }

    if (isMonthly) {
      this.applyMonthlyPricing(elements, cardType);
    } else {
      this.applyAnnualPricing(elements, cardType);
    }
  }

  applyMonthlyPricing(elements, cardType) {
    elements.pricePerMonth.textContent = pricing[cardType].monthly;
    elements.billingCycleLabel.textContent = "Monthly Plan";
    elements.planTermDetails.textContent = billingDetails.monthly;

    // Update save percent element to gray
    if (elements.savePercent) {
      elements.savePercent.style.color = "#aaa";
    }

    // Show monthly bottom price details and hide annual
    if (elements.monthlyDetails) elements.monthlyDetails.style.display = "block";
    if (elements.annualDetails) elements.annualDetails.style.display = "none";
  }

  applyAnnualPricing(elements, cardType) {
    elements.pricePerMonth.textContent = pricing[cardType].annually;
    elements.billingCycleLabel.textContent = "Annual Plan";
    elements.planTermDetails.textContent = billingDetails.annually[cardType];

    // Update save percent element to default green
    if (elements.savePercent) {
      elements.savePercent.style.color = "";
    }

    // Show annual bottom price details and hide monthly
    if (elements.monthlyDetails) elements.monthlyDetails.style.display = "none";
    if (elements.annualDetails) elements.annualDetails.style.display = "block";
  }

  updateAllCards(isMonthly) {
    this.cards.forEach((card) => this.updateCard(card, isMonthly));
  }
}

// Initialize the pricing manager when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the pricing manager
  const pricingManager = new PricingManager();
});
