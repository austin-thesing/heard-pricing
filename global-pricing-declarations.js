// Pricing information
const pricing = {
  "Sole Proprietor": {
    monthly: "169",
    annually: "169",
  },
  "S Corporation": {
    monthly: "299",
    // compare_monthly: "$299/mo",
    annually: "255",
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
    "S Corporation": "$3,060 Billed annually",
    "Sole Proprietor or S Corporation": "$3,060 Billed annually",
  },
};

// Export the pricing and billing details for importing in other files
export { pricing, billingDetails };
