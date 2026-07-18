/**
 * Kaki:Dan — Spike checkout stub
 *
 * This file intentionally does NOT process any real payment. It only
 * demonstrates how the product/price passed from index.html's CTA
 * buttons (via query string) could populate the checkout summary.
 *
 * Wiring up real payments:
 *   - Do the actual charge creation server-side (Netlify Function,
 *     or whatever backend you add) using a Spike secret key that is
 *     never exposed to the browser.
 *   - This file should only handle the publishable/client-side parts:
 *     mounting Spike's hosted element and forwarding the resulting
 *     token/session to your backend.
 */

(function () {
  const params = new URLSearchParams(window.location.search);

  const catalog = {
    "gift-box-single": { label: "Gift Box — single", priceAud: 48 },
    "gift-box-double": { label: "Gift Box — two boxes", priceAud: 87 },
  };

  const productId = params.get("product") || "gift-box-single";
  const product = catalog[productId] || catalog["gift-box-single"];

  const lineItem = document.getElementById("line-item");
  const lineTotal = document.getElementById("line-total");
  if (lineItem) lineItem.textContent = product.label;
  if (lineTotal) lineTotal.textContent = `$${product.priceAud.toFixed(2)} AUD`;

  // TODO: initialise Spike here, e.g.
  // const spike = Spike("pk_live_or_test_publishable_key");
  // spike.mount("#spike-payment-element", { ... });
})();
