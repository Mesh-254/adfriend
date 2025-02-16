(() => {
    // Fetch trivia questions from Open Trivia DB
    let cachedTrivia = [];

const fetchTriviaQuestions = async () => {
    if (cachedTrivia.length > 0) {
        return cachedTrivia; // Return cached results
    }

    try {
        const response = await fetch("https://opentdb.com/api.php?amount=50&category=9&type=boolean");
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
        cachedTrivia = data.results || []; // Cache results
        return cachedTrivia;
    } catch (error) {
        console.error("Error fetching trivia:", error);
        return [];
    }
};


    // Function to handle user answer selection
    const handleAnswerClick = (event, correctAnswer, triviaDiv) => {
        const userAnswer = event.target.textContent;
        if (userAnswer === correctAnswer) {
            triviaDiv.style.backgroundColor = "#28a745"; // Green for correct
            triviaDiv.innerHTML += "<p style='color: white; font-weight: bold;'>Correct!</p>";
        } else {
            triviaDiv.style.backgroundColor = "#dc3545"; // Red for incorrect
            triviaDiv.innerHTML += "<p style='color: white; font-weight: bold;'>Wrong!</p>";
        }
    };

    // Function to replace ad content on a given element with trivia
    const replaceAdsOnElement = (ad, questionObj) => {
        const triviaDiv = document.createElement("div");
        triviaDiv.classList.add("custom-trivia");
        triviaDiv.innerHTML = `
            <strong>Trivia:</strong> ${questionObj.question} <br>
            <button class="answer-btn">True</button>
            <button class="answer-btn">False</button>
        `;
        triviaDiv.style.backgroundColor = "#f4f4f4";
        triviaDiv.style.padding = "20px";
        triviaDiv.style.textAlign = "center";
        triviaDiv.style.color = "#333";
        triviaDiv.style.border = "2px solid #007BFF";
        triviaDiv.style.borderRadius = "8px";
        triviaDiv.style.fontFamily = "Arial, sans-serif";
        triviaDiv.style.cursor = "pointer";

        ad.innerHTML = "";
        ad.appendChild(triviaDiv);

        // Add event listeners to answer buttons
        const buttons = triviaDiv.querySelectorAll(".answer-btn");
        buttons.forEach(button => {
            button.addEventListener("click", (event) => handleAnswerClick(event, questionObj.correct_answer, triviaDiv));
        });
    };

    // Ad selector for common ad-related elements
    const adSelector =
        "[class^='ns-'], #google_ads, [div^='ns-'], [class^='ns-'] .ad_unit, div.ad_unit, #ad_unit, .ad-banner, #ad-banner ,#ads, .ads, div.ad, #div.ad, section.ad, aside.ad, " +
        "[id^='ad-'],[class*='google_ad'], [class*='googlead'], [class^='googleads'], [id^='googleads-'], " +
        "[id^='advertisement'], [id^='ads'], [class^='advertisement'], [class^='ads'], " +
        "a[href*='ad.doubleclick.net'], a[href*='googleads'], iframe[src*='ad'], " +
        "[id^='google_ads-'], iframe[id^='google_ads-'], [class^='google_ads-'], iframe[src*='ad.doubleclick.net'], iframe[src*='googleads']";

    // Replace ads with trivia
    const replaceAds = async () => {
        const ads = document.querySelectorAll(adSelector);
        console.log("Detected ads:", ads);
        const triviaQuestions = await fetchTriviaQuestions();
        
        if (ads.length > 0 && triviaQuestions.length > 0) {
            ads.forEach((ad, index) => {
                if (index < triviaQuestions.length) {
                    replaceAdsOnElement(ad, triviaQuestions[index]);
                }
            });
        }

        // Notify background script about ad detection
        chrome.runtime.sendMessage({ adsDetected: ads.length > 0 });
    };

    // On window DOMcontent load, replace ads with trivia
    document.addEventListener("DOMContentLoaded", replaceAds);


    // visibilitychange to re-check when switching tabs
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            replaceAds();
        }
    });


    // MutationObserver to detect new ads appearing dynamically
    let debounceTimeout = null;
    const observer = new MutationObserver(() => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(replaceAds, 5000);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();
