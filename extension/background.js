// ShadowShield AI Background Service Worker

console.log("🛡 ShadowShield AI Background Started");

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log("✅ ShadowShield AI Installed Successfully");
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    console.log("📩 Message Received:", message);

    if (message.type === "PING") {
        sendResponse({
            status: "Background is running"
        });
    }

    return true;
});
