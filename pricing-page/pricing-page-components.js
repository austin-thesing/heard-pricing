/**
 * Pricing Page Components
 *
 * This file contains the JavaScript functionality for the pricing page components:
 * - Swiper initialization for carousel
 * - Accordion functionality
 * - Pricing switcher
 * - Tooltip functionality
 */

// Initialize Swiper when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".swiper1", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "auto",
    initialSlide: 0,
    slidesPerGroup: 1,
    spaceBetween: 16,
    centeredSlides: false,
    mousewheel: {
      forceToAxis: true,
    },
    speed: 300,
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
  });
});

// Simple JQuery Accordion
// This function will be executed when jQuery is available
function initAccordion() {
  if (typeof jQuery !== "undefined") {
    (function ($) {
      "use strict";
      $(".acc-head").on("click", function () {
        $(this).next().slideToggle(250).css("display", "block");
      });
    })(jQuery);
  } else {
    console.warn("jQuery not found for accordion initialization");
  }
}

// Pricing Switcher functionality
function initPricingSwitcher() {
  if (typeof jQuery !== "undefined") {
    // Click event handler for pricing switcher links
    $(".pricing-switcher-link").click(function (t) {
      t.preventDefault();
      $(".pricing-switcher-link").removeClass("pricing-switcher-link-active");
      $(".w-tab-link:contains(" + t.target.innerText + ")").click();
      $(t.target).addClass("pricing-switcher-link-active");
    });
  } else {
    console.warn("jQuery not found for pricing switcher initialization");
  }
}

// Responsive Tooltip functionality
function initTooltips() {
  // Helper function to capitalize first letter
  function capitalizeFirst(t) {
    return t[0].toUpperCase() + t.slice(1);
  }

  // Helper function to create padding property name
  function getPaddingProperty(e) {
    return "padding" + capitalizeFirst(e);
  }

  // Class names for tooltip elements
  const iconWrapperClass = "tooltip1_element-wrapper";
  const tooltipWrapperClass = "tooltip1_tooltip-wrapper";
  const pointerClass = "tooltip1_pointer";

  // Direction mappings
  const oppositeDirections = {
    bottom: "top",
    left: "right",
    right: "left",
    top: "bottom",
  };

  // Margin and inset configurations for different directions
  const positionConfigs = {
    bottom: { margin: [1, "auto", 0, "auto"], inset: [0, 0, "auto", 0] },
    left: { margin: [0, 1, 0, 0], inset: ["auto", 0, "auto", "auto"] },
    right: { margin: [0, 0, 0, 1], inset: ["auto", "auto", "auto", 0] },
    top: { margin: [0, "auto", 1, "auto"], inset: ["auto", 0, 0, 0] },
  };

  // Axis configurations
  const horizontalAxis = {
    start: "left",
    end: "right",
    len: "width",
    translate: "translateX",
  };

  const verticalAxis = {
    start: "top",
    end: "bottom",
    len: "height",
    translate: "translateY",
  };

  // Direction to axis mapping
  const directionToAxis = {
    top: horizontalAxis,
    bottom: horizontalAxis,
    left: verticalAxis,
    right: verticalAxis,
  };

  // Setup tooltip functionality for an element
  function setupTooltip(iconElement) {
    const setupKey = "relumeTooltipSetup";

    if (!iconElement.dataset[setupKey]) {
      iconElement.dataset[setupKey] = 1;

      const tooltipWrapper = iconElement.parentElement.querySelector("." + tooltipWrapperClass);
      const pointer = iconElement.parentElement.querySelector("." + pointerClass);

      // Determine direction from class names
      const direction = pointer.className.includes("is-left")
        ? "left"
        : pointer.className.includes("is-right")
          ? "right"
          : pointer.className.includes("is-bottom")
            ? "bottom"
            : "top";

      const oppositeDirection = oppositeDirections[direction];

      // Get padding from computed style
      const computedStyle = window.getComputedStyle(tooltipWrapper);
      const padding =
        parseInt(computedStyle.paddingTop, 10) ||
        parseInt(computedStyle.paddingBottom, 10) ||
        parseInt(computedStyle.paddingLeft, 10) ||
        parseInt(computedStyle.paddingRight, 10) ||
        0;

      // Get margin index and value
      const pointerStyle = window.getComputedStyle(pointer);
      const marginIndex = positionConfigs[direction].margin.indexOf(1);
      const marginValue = [
        pointerStyle.marginTop,
        pointerStyle.marginRight,
        pointerStyle.marginBottom,
        pointerStyle.marginLeft,
      ][marginIndex];

      let isHovering = false;

      // Add mouseenter event listener
      iconElement.parentElement.addEventListener("mouseenter", () => {
        isHovering = true;

        function updatePosition() {
          if (isHovering) {
            window.requestAnimationFrame(updatePosition);

            const iconRect = iconElement.getBoundingClientRect();
            const tooltipRect = tooltipWrapper.getBoundingClientRect();
            const docElement = document.documentElement;
            const axis = directionToAxis[direction];

            // Calculate center position
            const centerStart =
              (iconRect[axis.start] + iconRect[axis.end] - tooltipRect[axis.len]) / 2;
            const centerEnd =
              (iconRect[axis.start] + iconRect[axis.end] + tooltipRect[axis.len]) / 2;

            // Adjust position if needed
            let offset = 0;
            if (centerStart < 0) {
              offset = -centerStart;
            } else if (centerEnd > docElement["client" + capitalizeFirst(axis.len)]) {
              offset = docElement["client" + capitalizeFirst(axis.len)] - centerEnd;
            }

            // Check if tooltip fits in current direction
            const fitsInDirection = {
              bottom: iconRect.bottom + tooltipRect.height < docElement.clientHeight,
              left: 0 < iconRect.left - tooltipRect.width,
              right: iconRect.right + tooltipRect.width < docElement.clientWidth,
              top: 0 < iconRect.top - tooltipRect.height,
            };

            // Choose best direction
            const bestDirection =
              fitsInDirection[direction] || !fitsInDirection[oppositeDirection]
                ? direction
                : oppositeDirection;

            // Apply styles
            const bestAxis = directionToAxis[bestDirection];
            const oppositeDir = oppositeDirections[bestDirection];

            tooltipWrapper.style[oppositeDir] = "100%";
            tooltipWrapper.style[bestDirection] = "auto";
            tooltipWrapper.style[getPaddingProperty(oppositeDir)] = padding + "px";
            tooltipWrapper.style[getPaddingProperty(bestDirection)] = "0";
            tooltipWrapper.style.transform = bestAxis.translate + "(" + offset + "px)";

            pointer.style.transform = bestAxis.translate + "(" + -offset + "px) rotate(45deg)";
            pointer.style.margin = positionConfigs[bestDirection].margin
              .map((val) => (val === 1 ? marginValue : val))
              .join(" ");
            pointer.style.inset = positionConfigs[bestDirection].inset.join(" ");
          }
        }

        updatePosition();
      });

      // Add mouseleave event listener
      iconElement.parentElement.addEventListener("mouseleave", () => {
        isHovering = false;
      });
    }
  }

  // Initialize all tooltips
  function initializeAllTooltips() {
    document.querySelectorAll("." + iconWrapperClass).forEach(setupTooltip);
  }

  // Initialize tooltips when DOM is loaded and immediately
  window.addEventListener("DOMContentLoaded", initializeAllTooltips);
  initializeAllTooltips();
}

// Initialize all components when the script is loaded
document.addEventListener("DOMContentLoaded", function () {
  initAccordion();
  initPricingSwitcher();
  initTooltips();
});

// Export functions for potential use in other modules
export { initAccordion, initPricingSwitcher, initTooltips };
