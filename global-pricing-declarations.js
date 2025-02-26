// Pricing information
const pricing = {
  "Sole Proprietor": {
    monthly: "169",
    annually: "169",
  },
  "S Corporation": {
    monthly: "199",
    // compare_monthly: "$299/mo",
    annually: "169",
    // compare_annual: "$255/mo",
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
    "S Corporation": "Limited time offer.",
    "Sole Proprietor or S Corporation": "Limited time offer.",
  },
};

// Export the pricing and billing details for importing in other files
export { pricing, billingDetails };
