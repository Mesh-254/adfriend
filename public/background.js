chrome.runtime.onInstalled.addListener(() => {
    console.log("AdFriend Extension Installed!");
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Background received message:", request);
  
    if (request.action === 'checkForAds') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log("Active tab:", activeTab);
        if (activeTab) {
          chrome.scripting.executeScript(
            {
              target: { tabId: activeTab.id },
              files: ['content.js']
            },
            () => {
              console.log("Content script injected into tab:", activeTab.id);
              // Listen for the message from the content script
              const handleContentMessage = (message) => {
                console.log("Background got content message:", message);
                if (message.adsDetected !== undefined) {
                  // Forward the result to the popup
                  console.log("Forwarding adsDetected:", message.adsDetected);
                  chrome.runtime.sendMessage({ adsDetected: message.adsDetected });
                }
              };
  
              // One-time listener for the response from content.js
              chrome.runtime.onMessage.addListener(function listener(response, sender, sendResponse) {
                console.log("Background one-time listener received:", response);
                handleContentMessage(response);
                chrome.runtime.onMessage.removeListener(listener);
              });
            }
          );
        } else {
          console.log("No active tab found, sending false");
          chrome.runtime.sendMessage({ adsDetected: false });
        }
      });
      return true; // Asynchronous response
    }
  });