function g(l){let e=l.querySelector(".n-pricing-plan-type.new h3");if(!e){console.log("Card type element not found");return}let n=e.textContent.trim();if(!pricing[n]&&(n=Object.keys(pricing).find(i=>i.includes(n)),!n)){console.log(`Pricing not found for card type: ${n}`);return}let t=l.querySelector(".price-per-term .price-per-month");if(!t){console.log("Price per month element not found");return}let c=l.querySelector(".billing-cycle-label");if(!c){console.log("Billing cycle label element not found");return}let r=l.querySelector(".plan-pricing-wrap .plan-term-details");if(!r){console.log("Plan term details element not found");return}t.textContent=pricing[n].monthly,c.textContent="Monthly Plan",r.textContent=billingDetails.monthly;let s=l.querySelector(".plan-toggle");s&&s.classList.remove("is-active")}document.querySelectorAll(".new-pricing-card").forEach(g);var y=document.querySelectorAll(".pricing-chart_toggle-container");function u(l){document.querySelectorAll(".new-pricing-card").forEach(e=>{let n=e.querySelector(".n-pricing-plan-type.new h3");if(!n){console.log("Card type element not found");return}let t=n.textContent.trim();if(!pricing[t]&&(t=Object.keys(pricing).find(o=>o.includes(t)),!t)){console.log(`Pricing not found for card type: ${t}`);return}let c=e.querySelector(".price-per-term .price-per-month"),r=e.querySelector(".billing-cycle-label"),s=e.querySelector(".plan-pricing-wrap .plan-term-details"),p=e.querySelector(".pricing-chart_toggle-container");if(isMonthly){c.textContent=pricing[t].monthly,r.textContent="Monthly Plan",s.textContent=billingDetails.monthly,p.classList.add("is-active");let i=e.querySelector(".save-x-percent");i&&(i.style.color="#aaa");let o=e.querySelector('.bottom-price-details[plan-type="monthly"]'),a=e.querySelector('.bottom-price-details[plan-type="annual"]');o&&(o.style.display="block"),a&&(a.style.display="none")}else{c.textContent=pricing[t].annually,r.textContent="Annual Plan",s.textContent=billingDetails.annually[t],p.classList.remove("is-active");let i=e.querySelector(".save-x-percent");i&&(i.style.color="");let o=e.querySelector('.bottom-price-details[plan-type="monthly"]'),a=e.querySelector('.bottom-price-details[plan-type="annual"]');o&&(o.style.display="none"),a&&(a.style.display="block")}}),y.forEach(e=>{isMonthly?e.classList.add("is-active"):(pricePerMonth.textContent=pricing[cardType].monthly,billingCycleLabel.textContent="Monthly Plan",planTermDetails.textContent=billingDetails.monthly,e.classList.remove("is-active"))})}y.forEach(l=>{l.addEventListener("click",function(){let n=!this.classList.contains("is-active");y.forEach(t=>{t!==this&&t.click()}),u(n)})});u(!1);
//# sourceMappingURL=pricing-swap.js.map
