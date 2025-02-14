import React, { useEffect, useState } from 'react';

const FetchAds = () => {
    const [status, setStatus] = useState('Checking for Ads...');

    useEffect(() => {
        // Function to handle the response from the background script
        const handleAdsCheck = (message) => {
            if (message.adsDetected !== undefined) {
                setStatus(message.adsDetected ? 'Ads were detected on this page.' : 'Could not detect ads on this page.');
            }
        };

        chrome.runtime.onMessage.addListener(handleAdsCheck);

        // Cleanup listener on component unmount
        return () => {
            chrome.runtime.onMessage.removeListener(handleAdsCheck);
        };
    }, []);

    return (
        <div>
            <h1>AdFriend is replacing ads with positivity.</h1>
            <h2 id="status">{status}</h2>
        </div>
    );
};

export default FetchAds;
