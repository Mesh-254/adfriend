chrome.runtime.onInstalled.addListener(() => {
  console.log("AdFriend Extension Installed!");
});

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
            // Content script injected successfully
            // Listen for the message from the content script
            const handleContentMessage = (message) => {
              if (message.adsDetected !== undefined) {
                // Forward the result to the React component (via storage or message)
                console.log(message.adsDetected )
                chrome.runtime.sendMessage({ adsDetected: message.adsDetected });
              }
            };

            // Add a one-time listener for the response from content.js
            chrome.runtime.onMessage.addListener(function listener(response, sender, sendResponse) {
              handleContentMessage(response);
              chrome.runtime.onMessage.removeListener(listener);
            });
          }
        );
      } else {
        // Handle cases where no active tab is found
        chrome.runtime.sendMessage({ adsDetected: false });
      }
    });
    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});
