import React, { useEffect, useState } from 'react';

const FetchAds = () => {
    const [status, setStatus] = useState('Checking for Ads...');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Handle messages from the content script
        const handleAdsCheck = (message) => {
            console.log("Popup received:", message);
            if (message.adsDetected !== undefined) {
                setStatus(message.adsDetected ? 'Ads detected! Replacing with trivia.' : 'No ads detected on this page.');
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
