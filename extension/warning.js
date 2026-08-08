console.log(
    "🛡 ShadowShield Verification Page"
);


// =====================================================
// GET URL
// =====================================================

const params =
    new URLSearchParams(
        window.location.search
    );


const targetUrl =
    params.get("url");


const urlElement =
    document.getElementById("url");

const loading =
    document.getElementById("loading");

const result =
    document.getElementById("result");

const status =
    document.getElementById("status");

const score =
    document.getElementById("score");

const reasons =
    document.getElementById("reasons");

const leave =
    document.getElementById("leave");

const continueBtn =
    document.getElementById("continue");


urlElement.textContent =
    targetUrl || "Unknown URL";


// =====================================================
// VERIFY WEBSITE
// =====================================================

async function verifyWebsite() {

    if (!targetUrl) {

        showError(
            "No website URL provided."
        );

        return;
    }


    console.log(
        "🔍 Checking:",
        targetUrl
    );


    try {

        const response =
            await chrome.runtime.sendMessage({
                type: "VERIFY_WEBSITE",
                url: targetUrl
            });


        console.log(
            "🔍 Backend response:",
            response
        );


        if (
            !response ||
            !response.success
        ) {

            showError(
                "Unable to verify this website."
            );

            return;
        }


        showResult(
            response.data
        );

    }
    catch (error) {

        console.error(
            error
        );


        showError(
            "Verification failed."
        );

    }

}


// =====================================================
// SHOW RESULT
// =====================================================

function showResult(data) {

    loading.classList.add(
        "hidden"
    );

    result.classList.remove(
        "hidden"
    );


    const risk =
        String(
            data.risk || "Unknown"
        );


    const riskLower =
        risk.toLowerCase();


    const riskScore =
        Number(
            data.score || 0
        );


    score.textContent =
        `Risk Score: ${riskScore}/100`;


    // =================================================
    // LOW
    // =================================================

    if (
        riskLower === "low"
    ) {

        status.textContent =
            "🟢 LOW RISK — Website appears safe";

        status.style.color =
            "#16a34a";


        reasons.innerHTML = `
            <strong>
                ShadowShield AI found
                no major suspicious indicators.
            </strong>
        `;


        // Automatically enter

        setTimeout(
            () => {

                allowWebsite();

            },
            1000
        );


        return;
    }


    // =================================================
    // MEDIUM
    // =================================================

    if (
        riskLower === "medium"
    ) {

        status.textContent =
            "🟡 MEDIUM RISK — Be Careful";

        status.style.color =
            "#ca8a04";

    }


    // =================================================
    // HIGH
    // =================================================

    else if (
        riskLower === "high" ||
        riskLower === "critical"
    ) {

        status.textContent =
            "🔴 HIGH RISK — Suspicious Website";

        status.style.color =
            "#dc2626";

    }


    else {

        status.textContent =
            "⚠️ UNKNOWN RISK";

        status.style.color =
            "#ca8a04";

    }


    // =================================================
    // REASONS
    // =================================================

    const list =
        Array.isArray(data.reasons)
            ? data.reasons
            : [];


    if (list.length) {

        reasons.innerHTML = `

            <strong>
                Why ShadowShield flagged it:
            </strong>

            <ul>

                ${list
                    .slice(0, 8)
                    .map(
                        reason =>
                            `<li>${escapeHTML(
                                String(reason)
                            )}</li>`
                    )
                    .join("")
                }

            </ul>
        `;

    }
    else {

        reasons.innerHTML =
            "No detailed reasons available.";

    }

}


// =====================================================
// ERROR
// =====================================================

function showError(message) {

    loading.textContent =
        "❌ " + message;

    loading.style.color =
        "#dc2626";

}


// =====================================================
// ALLOW WEBSITE
// =====================================================

function allowWebsite() {

    chrome.runtime.sendMessage({

        type:
            "ALLOW_WEBSITE",

        url:
            targetUrl

    });

}


// =====================================================
// LEAVE
// =====================================================

leave.addEventListener(
    "click",
    () => {

        window.history.back();

    }
);


// =====================================================
// CONTINUE
// =====================================================

continueBtn.addEventListener(
    "click",
    () => {

        allowWebsite();

    }
);


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


// =====================================================
// START
// =====================================================

verifyWebsite();