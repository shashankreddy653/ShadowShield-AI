const website = document.getElementById("website");
const analyzeBtn = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const historyDiv = document.getElementById("history");

// Show current website
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    website.textContent = tabs[0].url;
});

// Analyze button
analyzeBtn.addEventListener("click", () => {

    loading.classList.remove("hidden");
    result.innerHTML = "";

    setTimeout(() => {

        loading.classList.add("hidden");

        const mockResponse = {
            safe: true,
            confidence: 95,
            reason: "Trusted domain"
        };

        displayResult(mockResponse);

    }, 1500);

});

// Show analysis result
function displayResult(data) {

    const statusColor = data.safe ? "#22c55e" : "#ef4444";
    const statusText = data.safe ? "SAFE" : "DANGEROUS";

    const domain = new URL(website.textContent).hostname;

    result.innerHTML = `
    <div class="result-card"
         style="border-left:6px solid ${statusColor};">

        <h2 style="color:${statusColor};">
            ${statusText}
        </h2>

        <p>
            <strong>Confidence:</strong>
            ${data.confidence}%
        </p>

        <p>
            <strong>Reason:</strong><br>
            ${data.reason}
        </p>

        <p>
            <strong>Website:</strong><br>
            ${domain}
        </p>

        <p class="time">
            Last Scan:
            ${new Date().toLocaleTimeString()}
        </p>

    </div>
`;

    saveHistory(data);

}

// Save history
function saveHistory(data) {

    const historyItem = {

        url: new URL(website.textContent).hostname,
        safe: data.safe,
        confidence: data.confidence,
        reason: data.reason,
        time: new Date().toLocaleTimeString()

    };

    chrome.storage.local.get(["history"], (res) => {

        let history = res.history || [];

        history.unshift(historyItem);

        history = history.slice(0, 20);

        chrome.storage.local.set({ history }, () => {

            loadHistory();

        });

    });

}

// Load history
function loadHistory() {

    chrome.storage.local.get(["history"], (res) => {

        const history = res.history || [];

        if (history.length === 0) {

            historyDiv.innerHTML = "<p>No scans yet.</p>";
            return;

        }

        historyDiv.innerHTML = "";

        history.slice(0, 5).forEach(item => {

            const color = item.safe ? "#22c55e" : "#ef4444";
            const icon = item.safe ? "🟢" : "🔴";

           historyDiv.innerHTML += `
    <div class="history-card"
         style="border-left:4px solid ${color};">

        <strong>${icon} ${item.url}</strong>

        <br>

        Confidence: ${item.confidence}%

    </div>
`;

        });

    });

}

// Load history when popup opens
loadHistory();