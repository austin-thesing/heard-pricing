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

    this.init();
  }

  init() {
    // Initialize all cards with annual pricing by default
    this.updateAllCards(false);

    // Add event listeners to toggles
    this.setupToggleListeners();

    console.log("Pricing manager initialized with", this.cards.length, "pricing cards");
  }

  setupToggleListeners() {
    this.toggles.forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        // Prevent default behavior to avoid any interference
        event.preventDefault();

        // Toggle the pricing state
        this.isMonthlyPricing = !this.isMonthlyPricing;

        // Update all toggles to match the current state
        this.syncAllToggles();

        // Update all pricing cards
        this.updateAllCards(this.isMonthlyPricing);
      });
    });
  }

  syncAllToggles() {
    this.toggles.forEach((toggle) => {
      // Remove any existing classes first to ensure clean state
      toggle.classList.remove("is-active");

      // Then add the class if needed based on current state
      if (this.isMonthlyPricing) {
        toggle.classList.add("is-active");
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
      // Removed toggle from elements as we handle it separately
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

    // Removed toggle state update as it's handled by syncAllToggles
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

    // Removed toggle state update as it's handled by syncAllToggles
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
