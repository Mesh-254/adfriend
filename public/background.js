chrome.runtime.onInstalled.addListener(() => {
    console.log("AdFriend Extension Installed!");
});

// background.js
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {


    if (request.action === 'checkForAds') {
        // Get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab) {
                // Inject the content script into the active tab
                chrome.scripting.executeScript(
                    {
                        target: { tabId: activeTab.id },
                        files: ['content.js']
                    },
                    () => {
                        // Listen for the message from the content script
                        const handleContentMessage = (message) => {
                            // Send the result back to the popup
                            sendResponse({ adsDetected: message.adsDetected });
                            // Remove this listener after handling
                            chrome.runtime.onMessage.removeListener(handleContentMessage);

                        };
                        chrome.runtime.onMessage.addListener(handleContentMessage);

                    }
                );
            }
        });
        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});
