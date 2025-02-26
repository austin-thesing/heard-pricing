var l={"Sole Proprietor":{monthly:"199",annually:"169"},"S Corporation":{monthly:"299",annually:"255"},"Sole Proprietor or S Corporation":{monthly:"299",annually:"255"}},r={monthly:"Billed monthly \u2022 Cancel anytime",annually:{"Sole Proprietor":"Billed $2,028 annually","S Corporation":"$3,060 Billed annually","Sole Proprietor or S Corporation":"$3,060 Billed annually"}};var a=class{constructor(){this.cards=document.querySelectorAll(".new-pricing-card"),this.toggles=document.querySelectorAll(".pricing-chart_toggle-container"),this.isMonthlyPricing=!1,this.isUpdating=!1,this.init()}init(){this.updateAllCards(!1),this.setupToggleListeners(),console.log("Pricing manager initialized with",this.cards.length,"pricing cards and",this.toggles.length,"toggles")}setupToggleListeners(){this.toggles.forEach(t=>{t.addEventListener("click",e=>{this.isUpdating||(console.log("Toggle clicked, current state:",this.isMonthlyPricing),this.isUpdating=!0,this.isMonthlyPricing=!this.isMonthlyPricing,console.log("New state after toggle:",this.isMonthlyPricing),this.triggerOtherToggles(t),this.updateAllCards(this.isMonthlyPricing),setTimeout(()=>{this.isUpdating=!1},100))})})}triggerOtherToggles(t){this.toggles.forEach(e=>{e!==t&&e.click()})}syncAllToggles(){this.toggles.forEach(t=>{this.isMonthlyPricing?t.classList.add("is-active"):t.classList.remove("is-active")})}getCardType(t){let e=t.querySelector(".n-pricing-plan-type.new h3");if(!e)return console.warn("Card type element not found"),null;let i=e.textContent.trim();if(!l[i]){let o=Object.keys(l).find(c=>c.includes(i));return o||(console.warn(`Pricing not found for card type: ${i}`),null)}return i}updateCard(t,e){let i=this.getCardType(t);if(!i)return;let n={pricePerMonth:t.querySelector(".price-per-term .price-per-month"),billingCycleLabel:t.querySelector(".billing-cycle-label"),planTermDetails:t.querySelector(".plan-pricing-wrap .plan-term-details"),savePercent:t.querySelector(".save-x-percent"),monthlyDetails:t.querySelector('.bottom-price-details[plan-type="monthly"]'),annualDetails:t.querySelector('.bottom-price-details[plan-type="annual"]')};if(!n.pricePerMonth||!n.billingCycleLabel||!n.planTermDetails){console.warn("Required pricing elements not found for card:",i);return}e?this.applyMonthlyPricing(n,i):this.applyAnnualPricing(n,i)}applyMonthlyPricing(t,e){t.pricePerMonth.textContent=l[e].monthly,t.billingCycleLabel.textContent="Monthly Plan",t.planTermDetails.textContent=r.monthly,t.savePercent&&(t.savePercent.style.color="#aaa"),t.monthlyDetails&&(t.monthlyDetails.style.display="block"),t.annualDetails&&(t.annualDetails.style.display="none")}applyAnnualPricing(t,e){t.pricePerMonth.textContent=l[e].annually,t.billingCycleLabel.textContent="Annual Plan",t.planTermDetails.textContent=r.annually[e],t.savePercent&&(t.savePercent.style.color=""),t.monthlyDetails&&(t.monthlyDetails.style.display="none"),t.annualDetails&&(t.annualDetails.style.display="block")}updateAllCards(t){this.cards.forEach(e=>this.updateCard(e,t))}};document.addEventListener("DOMContentLoaded",()=>{let s=new a});
