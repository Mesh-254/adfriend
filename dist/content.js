(() => {
    // Show an alert when clicking any link
    document.addEventListener("click", function (event) {
        let target = event.target.closest("a");
        if (target && target.href) {
            alert("You are about to visit " + target.href + " Now");
        }
    });

    const positiveHTML = "<h2>AdFriend neutralizer! 🚀</h2>";

    // Function to replace ad content on a given element if it doesn't match the positive message.
    const replaceAdsOnElement = (ad) => {
        if (ad.innerHTML !== positiveHTML) {
            ad.innerHTML = positiveHTML;
            ad.style.backgroundColor = "#f4f4f4";
            ad.style.padding = "20px";
            ad.style.textAlign = "center";
            ad.style.color = "#333";
        }
    };

    // Global selector for common ad-related elements
    const adSelector =
        ".iframe, .ad_unit, div.ad_unit, #ad_unit, .ad-banner, #ad-banner ,#ads, .ads, div.ad, #div.ad, section.ad, aside.ad, " +
        "[id^='ad-'],[class*='google_ad'], [class*='googlead'] [class^='googleads'], [id^='googleads-'], " +
        "[id^='advertisement'], [id^='ads'], [class^='advertisement'], [class^='ads'], " +
        "a[href*='ad.doubleclick.net'], a[href*='googleads'], iframe[src*='ad'], " +
        "[id^='google_ads-'], [class^='google_ads-'], iframe[src*='ad.doubleclick.net'], iframe[src*='googleads']";

    // Replace ads on the provided list of elements.
    const replaceAds = (adsList) => {
        adsList.forEach(ad => replaceAdsOnElement(ad));
    };

    // On window load, do an initial replacement.
    window.addEventListener('load', () => {
        const ads = document.querySelectorAll(adSelector);
        console.log("Detected ads:", ads);

        // call replace ads to replace the ads with other info
        replaceAds(ads);
    });

    // global MutationObserver with debouncing to ensure the positive content persists.
    let debounceTimeout = null;
    const globalObserver = new MutationObserver(() => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            // Query the entire document for ad elements and reapply replacement if necessary.
            const adElements = document.querySelectorAll(adSelector);
            adElements.forEach(el => replaceAdsOnElement(el));
        }, 500);
    });

    globalObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();
