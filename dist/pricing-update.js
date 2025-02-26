var i={"Sole Proprietor":{monthly:"199",annually:"169"},"S Corporation":{monthly:"299",annually:"255"},"Sole Proprietor or S Corporation":{monthly:"299",annually:"255"}},r={monthly:"Billed monthly \u2022 Cancel anytime",annually:{"Sole Proprietor":"Billed $2,028 annually","S Corporation":"$3,060 Billed annually","Sole Proprietor or S Corporation":"$3,060 Billed annually"}};var a=class{constructor(){this.cards=document.querySelectorAll(".new-pricing-card"),this.toggles=document.querySelectorAll(".pricing-chart_toggle-container"),this.isMonthlyPricing=!1,this.init()}init(){this.updateAllCards(!1),this.setupToggleListeners(),console.log("Pricing manager initialized with",this.cards.length,"pricing cards")}setupToggleListeners(){this.toggles.forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),this.isMonthlyPricing=!this.isMonthlyPricing,this.syncAllToggles(),this.updateAllCards(this.isMonthlyPricing)})})}syncAllToggles(){this.toggles.forEach(t=>{t.classList.remove("is-active"),this.isMonthlyPricing&&t.classList.add("is-active")})}getCardType(t){let n=t.querySelector(".n-pricing-plan-type.new h3");if(!n)return console.warn("Card type element not found"),null;let l=n.textContent.trim();if(!i[l]){let o=Object.keys(i).find(c=>c.includes(l));return o||(console.warn(`Pricing not found for card type: ${l}`),null)}return l}updateCard(t,n){let l=this.getCardType(t);if(!l)return;let e={pricePerMonth:t.querySelector(".price-per-term .price-per-month"),billingCycleLabel:t.querySelector(".billing-cycle-label"),planTermDetails:t.querySelector(".plan-pricing-wrap .plan-term-details"),savePercent:t.querySelector(".save-x-percent"),monthlyDetails:t.querySelector('.bottom-price-details[plan-type="monthly"]'),annualDetails:t.querySelector('.bottom-price-details[plan-type="annual"]')};if(!e.pricePerMonth||!e.billingCycleLabel||!e.planTermDetails){console.warn("Required pricing elements not found for card:",l);return}n?this.applyMonthlyPricing(e,l):this.applyAnnualPricing(e,l)}applyMonthlyPricing(t,n){t.pricePerMonth.textContent=i[n].monthly,t.billingCycleLabel.textContent="Monthly Plan",t.planTermDetails.textContent=r.monthly,t.savePercent&&(t.savePercent.style.color="#aaa"),t.monthlyDetails&&(t.monthlyDetails.style.display="block"),t.annualDetails&&(t.annualDetails.style.display="none")}applyAnnualPricing(t,n){t.pricePerMonth.textContent=i[n].annually,t.billingCycleLabel.textContent="Annual Plan",t.planTermDetails.textContent=r.annually[n],t.savePercent&&(t.savePercent.style.color=""),t.monthlyDetails&&(t.monthlyDetails.style.display="none"),t.annualDetails&&(t.annualDetails.style.display="block")}updateAllCards(t){this.cards.forEach(n=>this.updateCard(n,t))}};document.addEventListener("DOMContentLoaded",()=>{let s=new a});
