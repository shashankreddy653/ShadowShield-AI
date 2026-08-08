console.log("🛡 ShadowShield AI Background Started");

const API = "http://localhost:8000";


// =====================================================
// ALLOWED NAVIGATIONS
// =====================================================

const allowedUrls = new Set();


// =====================================================
// INTERCEPT WEBSITE NAVIGATION
// =====================================================

chrome.webNavigation.onBeforeNavigate.addListener(
    async (details) => {

        // Only main page navigation
        if (details.frameId !== 0) {
            return;
        }

        const url = details.url;

        // Ignore extension pages
        if (
            url.startsWith("chrome-extension://") ||
            url.startsWith("chrome://") ||
            url.startsWith("about:")
        ) {
            return;
        }

        // Only HTTP/HTTPS
        if (
            !url.startsWith("http://") &&
            !url.startsWith("https://")
        ) {
            return;
        }


        // =================================================
        // ALREADY VERIFIED
        // =================================================

        if (allowedUrls.has(url)) {

            console.log(
                "✅ Verified URL allowed:",
                url
            );

            allowedUrls.delete(url);

            return;
        }


        console.log(
            "🛡 Intercepting:",
            url
        );


        // =================================================
        // SEND USER TO SHADOWSHIELD VERIFICATION PAGE
        // =================================================

        const warningUrl =
            chrome.runtime.getURL(
                "warning.html"
            ) +
            "?url=" +
            encodeURIComponent(url);


        try {

            await chrome.tabs.update(
                details.tabId,
                {
                    url: warningUrl
                }
            );

        } catch (error) {

            console.error(
                "❌ Could not open verification page:",
                error
            );

        }

    }
);


// =====================================================
// MESSAGE HANDLER
// =====================================================

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {


        // =================================================
        // ANALYZE WEBSITE
        // =================================================

        if (
            message.type ===
            "VERIFY_WEBSITE"
        ) {

            console.log(
                "🔍 Verifying:",
                message.url
            );


            fetch(
                `${API}/api/v1/analyze`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        url: message.url
                    })
                }
            )

            .then(async response => {

                if (!response.ok) {

                    throw new Error(
                        `Backend returned ${response.status}`
                    );

                }

                return response.json();

            })

            .then(result => {

                console.log(
                    "🔍 Verification Result:",
                    result
                );


                sendResponse({
                    success: true,
                    data: result.data || result
                });

            })

            .catch(error => {

                console.error(
                    "❌ Verification Error:",
                    error
                );


                sendResponse({
                    success: false,
                    error: error.message
                });

            });


            return true;
        }


        // =================================================
        // ALLOW WEBSITE
        // =================================================

        if (
            message.type ===
            "ALLOW_WEBSITE"
        ) {

            const url =
                message.url;


            console.log(
                "✅ User allowed:",
                url
            );


            allowedUrls.add(url);


            if (sender.tab) {

                chrome.tabs.update(
                    sender.tab.id,
                    {
                        url: url
                    }
                );

            }


            sendResponse({
                success: true
            });


            return true;
        }


        // =================================================
        // DATA LEAK / PASTE DETECTION
        // =================================================

        if (
            message.type ===
            "CHECK_PASTE"
        ) {

            console.log(
                "🔐 Checking pasted text..."
            );


            fetch(
                `${API}/api/v1/leak-detect`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        text: message.text
                    })
                }
            )

            .then(async response => {

                if (!response.ok) {

                    throw new Error(
                        `Backend returned ${response.status}`
                    );

                }

                return response.json();

            })

            .then(result => {

                console.log(
                    "🔐 Leak Result:",
                    result
                );


                sendResponse(result);

            })

            .catch(error => {

                console.error(
                    "❌ Leak Detection Error:",
                    error
                );


                sendResponse({
                    success: false,
                    error: error.message
                });

            });


            return true;
        }

    }
);