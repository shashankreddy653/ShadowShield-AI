const API_URL = "http://127.0.0.1:8000";

const website = document.getElementById("website");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const errorDiv = document.getElementById("error");
const historyDiv = document.getElementById("history");

const protectBtn = document.getElementById("protectBtn");
const leakResult = document.getElementById("leakResult");

let currentUrl = "";


// =====================================================
// GET CURRENT TAB URL
// =====================================================

async function getCurrentUrl() {

    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tabs || !tabs.length || !tabs[0].url) {
        throw new Error("Could not detect current tab.");
    }

    currentUrl = tabs[0].url;

    if (website) {
        website.textContent = currentUrl;
    }

    return currentUrl;
}


// =====================================================
// AUTOMATIC WEBSITE ANALYSIS
// =====================================================

async function analyzeWebsite(url) {

    if (!loading || !result) {
        return;
    }

    loading.classList.remove("hidden");

    if (errorDiv) {
        errorDiv.classList.add("hidden");
        errorDiv.textContent = "";
    }

    result.innerHTML = "";

    try {

        const response = await fetch(
            `${API_URL}/api/v1/analyze`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: url
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Backend returned ${response.status}`
            );
        }

        const data = await response.json();

        console.log("🌐 Website Analysis:", data);

        displayResult(data);

        await loadHistory();

    } catch (error) {

        console.error(
            "❌ Website analysis error:",
            error
        );

        if (errorDiv) {

            errorDiv.textContent =
                "⚠️ Backend connection failed.";

            errorDiv.classList.remove("hidden");

        } else {

            result.innerHTML = `
                <p style="color:#ef4444;">
                    ⚠️ Backend connection failed.
                </p>
            `;
        }

    } finally {

        loading.classList.add("hidden");

    }
}


// =====================================================
// DISPLAY WEBSITE RESULT
// =====================================================

function displayResult(response) {

    const data = response?.data;

    if (!data) {

        result.innerHTML =
            "<p>No analysis data received.</p>";

        return;
    }

    const score = Number(data.score ?? 0);
    const risk = String(data.risk || "Unknown");

    let statusClass = "safe";
    let icon = "🟢";

    if (
        risk.toLowerCase() === "high" ||
        risk.toLowerCase() === "critical"
    ) {

        statusClass = "danger";
        icon = "🔴";

    } else if (
        risk.toLowerCase() === "medium"
    ) {

        statusClass = "warning";
        icon = "🟡";

    }

    const reasons =
        Array.isArray(data.reasons)
            ? data.reasons
            : [];

    result.innerHTML = `

        <div class="result-card ${statusClass}">

            <h2>
                ${icon}
                ${escapeHTML(risk.toUpperCase())}
                RISK
            </h2>

            <div class="score">
                ${score}/100
            </div>

            <p>
                <strong>Risk Score</strong>
            </p>

            <div class="score-bar">

                <div
                    class="score-fill"
                    style="
                        width:${Math.max(
                            0,
                            Math.min(100, score)
                        )}%;
                    "
                ></div>

            </div>

            <h3>Security Findings</h3>

            <ul>

                ${
                    reasons.length

                    ? reasons
                        .map(
                            reason =>
                                `<li>${escapeHTML(
                                    String(reason)
                                )}</li>`
                        )
                        .join("")

                    : `
                        <li>
                            No suspicious
                            indicators detected.
                        </li>
                    `
                }

            </ul>

            <h3>🤖 AI Explanation</h3>

            <p>
                ${escapeHTML(
                    String(
                        data.ai_explanation ||
                        "No AI explanation available."
                    )
                )}
            </p>

        </div>
    `;
}


// =====================================================
// MANUAL PERSONAL DATA PROTECTION
// =====================================================

if (protectBtn) {

    protectBtn.addEventListener(
        "click",
        async () => {

            leakResult.innerHTML =
                "<p>🔍 Reading the selected prompt...</p>";

            try {

                const tabs =
                    await chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    });

                if (!tabs || !tabs.length) {
                    throw new Error(
                        "No active tab."
                    );
                }

                const response =
                    await chrome.tabs.sendMessage(
                        tabs[0].id,
                        {
                            type: "GET_PROMPT_TEXT"
                        }
                    );

                if (
                    !response ||
                    !response.text
                ) {

                    leakResult.innerHTML =
                        "<p>⚠️ No prompt text found.</p>";

                    return;
                }

                const apiResponse =
                    await fetch(
                        `${API_URL}/api/v1/leak-detect`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                text: response.text
                            })
                        }
                    );

                if (!apiResponse.ok) {

                    throw new Error(
                        `Backend returned ${apiResponse.status}`
                    );

                }

                const data =
                    await apiResponse.json();

                displayLeakResult(data);

            } catch (error) {

                console.error(
                    "❌ Protect My Data error:",
                    error
                );

                leakResult.innerHTML = `
                    <p style="color:#ef4444;">
                        ⚠️ Could not scan prompt.
                    </p>
                `;
            }
        }
    );
}


// =====================================================
// DISPLAY DATA-LEAK RESULT
// =====================================================

function displayLeakResult(data) {

    if (!data || !data.success) {

        leakResult.innerHTML =
            "<p>⚠️ Leak detection failed.</p>";

        return;
    }

    const findings =
        Array.isArray(data.findings)
            ? data.findings
            : [];

    const count = findings.length;

    const findingList =
        findings
            .map(item => {

                if (typeof item === "string") {
                    return `<li>${escapeHTML(item)}</li>`;
                }

                return `
                    <li>
                        ${escapeHTML(
                            String(
                                item.type ||
                                item.category ||
                                "Sensitive data"
                            )
                        )}
                        ${
                            item.count
                                ? ` (${item.count})`
                                : ""
                        }
                    </li>
                `;

            })
            .join("");

    leakResult.innerHTML = `

        <div class="leak-card">

            <h3>
                ${
                    count > 0
                        ? "🚨 Sensitive Data Found"
                        : "✅ No Sensitive Data Found"
                }
            </h3>

            <p>
                ${count}
                sensitive data categories detected.
            </p>

            ${
                count > 0
                    ? `
                        <h4>Detected</h4>

                        <ul>
                            ${findingList}
                        </ul>
                    `
                    : ""
            }

            <h4>Redacted Prompt</h4>

            <div class="redacted">
                ${escapeHTML(
                    String(
                        data.redacted_text || ""
                    )
                )}
            </div>

            <h4>AI Safe Rewrite</h4>

            <div class="rewritten">
                ${escapeHTML(
                    String(
                        data.rewritten_text || ""
                    )
                )}
            </div>

        </div>
    `;
}


// =====================================================
// LOAD HISTORY
// =====================================================

async function loadHistory() {

    if (!historyDiv) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/v1/history`
            );

        if (!response.ok) {

            throw new Error(
                `History returned ${response.status}`
            );

        }

        const history =
            await response.json();

        if (
            !Array.isArray(history) ||
            history.length === 0
        ) {

            historyDiv.innerHTML =
                "<p>No scans yet.</p>";

            return;
        }

        historyDiv.innerHTML =
            history
                .slice(0, 5)
                .map(item => `

                    <div class="history-card">

                        <strong>
                            ${escapeHTML(
                                String(
                                    item.url || ""
                                )
                            )}
                        </strong>

                        <br>

                        Score:
                        ${escapeHTML(
                            String(
                                item.risk_score ??
                                item.score ??
                                "N/A"
                            )
                        )}

                        <br>

                        Risk:
                        ${escapeHTML(
                            String(
                                item.risk_level ??
                                item.risk ??
                                "Unknown"
                            )
                        )}

                    </div>

                `)
                .join("");

    } catch (error) {

        console.error(
            "History error:",
            error
        );

        historyDiv.innerHTML =
            "<p>History unavailable.</p>";
    }
}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// =====================================================
// START
// =====================================================

async function init() {

    try {

        const url =
            await getCurrentUrl();

        await analyzeWebsite(url);

        await loadHistory();

    } catch (error) {

        console.error(
            "❌ Extension initialization error:",
            error
        );

        if (website) {
            website.textContent =
                "Unable to detect website.";
        }
    }
}


init();