(() => {

    // Show an alert when clicking any link
    document.addEventListener("click", function (event) {
        let target = event.target.closest("a");
        if (target && target.href) {
            alert("You are about to visit " + target.href + " Now");
        }

    });

    window.addEventListener('load', () => {
        // Select elements related to ads by their CSS classes, ids, or attributes
        let ads = document.querySelectorAll(
            ".iframe, .ad_unit, .ad-banner, .ads, div.ad, section.ad, aside.ad, " +
            "[id^='ad-'], [class^='googleads'], [id^='googleads-'], " +
            "[id^='advertisement'], [id^='ads'], [class^='advertisement'], [class^='ads'], " +
            "a[href*='ad.doubleclick.net'], a[href*='googleads'], iframe[src*='ad'], " +
            "[id^='google_ads-'], [class^='google_ads-'], iframe[src*='ad.doubleclick.net'], iframe[src*='googleads']"
        );

        console.log("Found element related to ads or with advertisement/ads text:", ads);

    });










    // // Function to replace ads with positive messages
    // function replaceAds() {
    //     document.querySelectorAll(".ad-banner, .ads, [id*='ad'], [class*='ad']").forEach(ad => {
    //         ad.innerHTML = "<h2>Stay Positive! 🚀</h2>";
    //         ad.style.backgroundColor = "#f4f4f4";
    //         ad.style.padding = "20px";
    //         ad.style.textAlign = "center";
    //         ad.style.color = "#333";
    //     });
    // }

    // // Run on page load
    // replaceAds();

    // // Watch for new elements being added to the page
    // const observer = new MutationObserver(replaceAds);
    // observer.observe(document.body, { childList: true, subtree: true });


})()