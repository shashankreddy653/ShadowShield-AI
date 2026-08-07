// ShadowShield AI Content Script

console.log("🛡 ShadowShield AI Content Script Loaded");

// Get current page URL
const currentUrl = window.location.href;

// Send URL to the background service worker
chrome.runtime.sendMessage(
    {
        type: "PAGE_LOADED",
        url: currentUrl
    },
    (response) => {
        console.log("Background Response:", response);
    }
);
