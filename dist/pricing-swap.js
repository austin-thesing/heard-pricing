function m(n){let e=n.querySelector(".n-pricing-plan-type.new h3");if(!e){console.log("Card type element not found");return}let l=e.textContent.trim();if(!pricing[l]&&(l=Object.keys(pricing).find(c=>c.includes(l)),!l)){console.log(`Pricing not found for card type: ${l}`);return}let t=n.querySelector(".price-per-term .price-per-month");if(!t){console.log("Price per month element not found");return}let a=n.querySelector(".billing-cycle-label");if(!a){console.log("Billing cycle label element not found");return}let s=n.querySelector(".plan-pricing-wrap .plan-term-details");if(!s){console.log("Plan term details element not found");return}t.textContent=pricing[l].annually,a.textContent="Annual Plan",s.textContent=billingDetails.annually[l];let p=n.querySelector('.bottom-price-details[plan-type="monthly"]'),y=n.querySelector('.bottom-price-details[plan-type="annual"]');p&&(p.style.display="none"),y&&(y.style.display="block");let o=n.querySelector(".save-x-percent");o&&(o.style.color="");let i=n.querySelector(".pricing-chart_toggle-container");i&&i.classList.remove("is-active")}document.querySelectorAll(".new-pricing-card").forEach(m);var u=document.querySelectorAll(".pricing-chart_toggle-container");function g(n){document.querySelectorAll(".new-pricing-card").forEach(e=>{let l=e.querySelector(".n-pricing-plan-type.new h3");if(!l){console.log("Card type element not found");return}let t=l.textContent.trim();if(!pricing[t]&&(t=Object.keys(pricing).find(i=>i.includes(t)),!t)){console.log(`Pricing not found for card type: ${t}`);return}let a=e.querySelector(".price-per-term .price-per-month"),s=e.querySelector(".billing-cycle-label"),p=e.querySelector(".plan-pricing-wrap .plan-term-details"),y=e.querySelector(".pricing-chart_toggle-container");if(n){a.textContent=pricing[t].monthly,s.textContent="Monthly Plan",p.textContent=billingDetails.monthly,y.classList.add("is-active");let o=e.querySelector(".save-x-percent");o&&(o.style.color="#aaa");let i=e.querySelector(".compare-at-price");i&&pricing[t].compare_monthly&&(i.textContent=pricing[t].compare_monthly);let r=e.querySelector('.bottom-price-details[plan-type="monthly"]'),c=e.querySelector('.bottom-price-details[plan-type="annual"]');r&&(r.style.display="block"),c&&(c.style.display="none")}else{a.textContent=pricing[t].annually,s.textContent="Annual Plan",p.textContent=billingDetails.annually[t],y.classList.remove("is-active");let o=e.querySelector(".save-x-percent");o&&(o.style.color="");let i=e.querySelector(".compare-at-price");i&&pricing[t].compare_annual&&(i.textContent=pricing[t].compare_annual);let r=e.querySelector('.bottom-price-details[plan-type="monthly"]'),c=e.querySelector('.bottom-price-details[plan-type="annual"]');r&&(r.style.display="none"),c&&(c.style.display="block")}}),u.forEach(e=>{n?e.classList.add("is-active"):e.classList.remove("is-active")})}u.forEach(n=>{n.addEventListener("click",function(){let l=!this.classList.contains("is-active");u.forEach(t=>{t!==this&&t.click()}),g(l)})});g(!1);
//# sourceMappingURL=pricing-swap.js.map
