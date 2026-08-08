console.log("🛡 ShadowShield AI Content Script Loaded");


// =====================================================
// 1. PASTE INTERCEPTION / DATA LEAK PROTECTION
// =====================================================

document.addEventListener(
    "paste",
    async (event) => {

        const text =
            event.clipboardData?.getData("text/plain") || "";

        if (!text.trim()) {
            return;
        }

        console.log("📋 Paste detected");


        // =================================================
        // SAVE TARGET BEFORE SHOWING POPUP
        // =================================================

        const target = document.activeElement;

        const selectionStart =
            target &&
            typeof target.selectionStart === "number"
                ? target.selectionStart
                : null;

        const selectionEnd =
            target &&
            typeof target.selectionEnd === "number"
                ? target.selectionEnd
                : null;


        // =================================================
        // STOP ORIGINAL PASTE
        // =================================================

        event.preventDefault();

        console.log("🛑 Original paste stopped");


        try {

            console.log(
                "🔐 Sending text to leak detector..."
            );


            const response =
                await chrome.runtime.sendMessage({
                    type: "CHECK_PASTE",
                    text: text
                });


            console.log(
                "🔐 Leak Result:",
                response
            );


            // =================================================
            // BACKEND FAILED
            // =================================================

            if (
                !response ||
                response.success !== true
            ) {

                console.warn(
                    "⚠️ Leak detector unavailable."
                );


                // If backend fails, allow paste
                insertText(
                    text,
                    target,
                    selectionStart,
                    selectionEnd
                );

                return;
            }


            // =================================================
            // GET FINDINGS
            // =================================================

            const findings =
                Array.isArray(response.findings)
                    ? response.findings
                    : [];


            // =================================================
            // NO SENSITIVE DATA
            // =================================================

            if (findings.length === 0) {

                console.log(
                    "🟢 No sensitive data detected."
                );


                insertText(
                    text,
                    target,
                    selectionStart,
                    selectionEnd
                );

                return;
            }


            // =================================================
            // SENSITIVE DATA FOUND
            // =================================================

            console.log(
                "🚨 Sensitive data detected:",
                findings
            );


            showPasteWarning(
                text,
                response.redacted_text || text,
                findings,
                target,
                selectionStart,
                selectionEnd
            );

        }
        catch (error) {

            console.error(
                "❌ Paste protection error:",
                error
            );


            // Fail open if backend is unavailable
            insertText(
                text,
                target,
                selectionStart,
                selectionEnd
            );

        }

    },
    true
);


// =====================================================
// 2. PASTE WARNING
// =====================================================

function showPasteWarning(
    originalText,
    redactedText,
    findings,
    target,
    selectionStart,
    selectionEnd
) {

    // Remove old warning
    const old =
        document.getElementById(
            "shadowshield-paste-warning"
        );

    if (old) {
        old.remove();
    }


    // =================================================
    // CREATE OVERLAY
    // =================================================

    const overlay =
        document.createElement("div");

    overlay.id =
        "shadowshield-paste-warning";


    overlay.style.cssText = `
        position: fixed !important;
        inset: 0 !important;

        z-index: 2147483647 !important;

        background: rgba(0,0,0,0.65) !important;

        backdrop-filter: blur(6px);

        display: flex !important;

        justify-content: center !important;

        align-items: center !important;

        font-family:
            Arial,
            Helvetica,
            sans-serif !important;
    `;


    // =================================================
    // CREATE BOX
    // =================================================

    const box =
        document.createElement("div");


    box.style.cssText = `
        width: 470px !important;

        max-width: 90% !important;

        background: white !important;

        color: #111827 !important;

        padding: 26px !important;

        border-radius: 18px !important;

        box-shadow:
            0 20px 70px
            rgba(0,0,0,0.45) !important;

        text-align: left !important;
    `;


    // =================================================
    // FINDINGS LIST
    // =================================================

    const findingList =
        findings
            .map(item => {

                if (
                    typeof item === "string"
                ) {

                    return `
                        <li>
                            ${escapeHTML(item)}
                        </li>
                    `;
                }


                const type =
                    item.type ||
                    item.category ||
                    "Sensitive data";


                const count =
                    item.count
                        ? ` (${item.count})`
                        : "";


                return `
                    <li>
                        ${escapeHTML(
                            String(type)
                        )}
                        ${count}
                    </li>
                `;

            })
            .join("");


    // =================================================
    // POPUP HTML
    // =================================================

    box.innerHTML = `

        <div style="
            text-align:center;
            font-size:42px;
        ">
            🔐
        </div>


        <h2 style="
            text-align:center;
            color:#dc2626;
            margin:8px 0;
        ">
            Sensitive Data Detected
        </h2>


        <p style="
            text-align:center;
            color:#4b5563;
            line-height:1.5;
        ">
            ShadowShield AI stopped this paste
            before it reached the website.
        </p>


        <div style="
            background:#fef2f2;
            padding:14px;
            border-radius:10px;
            margin-top:15px;
        ">

            <strong>
                We found:
            </strong>

            <ul style="
                margin-bottom:0;
                line-height:1.7;
            ">

                ${findingList}

            </ul>

        </div>


        <p style="
            margin-top:18px;
            font-weight:bold;
        ">
            What would you like to do?
        </p>


        <!-- REDACTED PREVIEW -->

        <div style="
            background:#f3f4f6;
            padding:13px;
            border-radius:9px;

            font-size:13px;
            line-height:1.5;

            word-break:break-word;
        ">

            ${escapeHTML(redactedText)}

        </div>


        <!-- MASK & PASTE -->

        <button
            id="shadowshield-mask"
            style="
                width:100%;

                padding:13px;

                margin-top:14px;

                border:0;

                border-radius:9px;

                background:#16a34a;

                color:white;

                font-weight:bold;

                cursor:pointer;
            "
        >
            🔐 Mask & Paste
        </button>


        <!-- PASTE ANYWAY -->

        <button
            id="shadowshield-anyway"
            style="
                width:100%;

                padding:13px;

                margin-top:9px;

                border:0;

                border-radius:9px;

                background:#f59e0b;

                color:white;

                font-weight:bold;

                cursor:pointer;
            "
        >
            ⚠️ Paste Anyway
        </button>


        <!-- CANCEL -->

        <button
            id="shadowshield-cancel"
            style="
                width:100%;

                padding:13px;

                margin-top:9px;

                border:0;

                border-radius:9px;

                background:#6b7280;

                color:white;

                font-weight:bold;

                cursor:pointer;
            "
        >
            ✖ Cancel
        </button>

    `;


    overlay.appendChild(box);

    document.documentElement.appendChild(
        overlay
    );


    // =================================================
    // MASK & PASTE
    // =================================================

    document
        .getElementById(
            "shadowshield-mask"
        )
        .onclick = () => {

            overlay.remove();

            insertText(
                redactedText,
                target,
                selectionStart,
                selectionEnd
            );

        };


    // =================================================
    // PASTE ANYWAY
    // =================================================

    document
        .getElementById(
            "shadowshield-anyway"
        )
        .onclick = () => {

            overlay.remove();

            insertText(
                originalText,
                target,
                selectionStart,
                selectionEnd
            );

        };


    // =================================================
    // CANCEL
    // =================================================

    document
        .getElementById(
            "shadowshield-cancel"
        )
        .onclick = () => {

            console.log(
                "✖ Paste cancelled"
            );

            overlay.remove();

        };

}


// =====================================================
// 3. INSERT TEXT
// =====================================================

function insertText(
    text,
    target,
    selectionStart,
    selectionEnd
) {

    if (!target) {
        return;
    }


    // =================================================
    // INPUT / TEXTAREA
    // =================================================

    if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
    ) {

        target.focus();


        const start =
            selectionStart ??
            target.value.length;


        const end =
            selectionEnd ??
            target.value.length;


        target.setRangeText(
            text,
            start,
            end,
            "end"
        );


        target.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles: true
                }
            )
        );


        return;
    }


    // =================================================
    // CONTENTEDITABLE
    // =================================================

    if (
        target.isContentEditable
    ) {

        target.focus();


        document.execCommand(
            "insertText",
            false,
            text
        );


        target.dispatchEvent(
            new InputEvent(
                "input",
                {
                    bubbles: true,

                    inputType:
                        "insertText",

                    data: text
                }
            )
        );

    }

}


// =====================================================
// 4. KEEP OLD "PROTECT MY DATA" FEATURE
// =====================================================

chrome.runtime.onMessage.addListener(
    (
        message,
        sender,
        sendResponse
    ) => {

        if (
            message.type !==
            "GET_PROMPT_TEXT"
        ) {

            return;
        }


        const element =
            document.activeElement;


        let text = "";


        // =================================================
        // INPUT / TEXTAREA
        // =================================================

        if (
            element &&
            (
                element.tagName ===
                    "TEXTAREA" ||

                element.tagName ===
                    "INPUT"
            )
        ) {

            text =
                element.value || "";

        }


        // =================================================
        // CONTENTEDITABLE
        // =================================================

        else if (
            element &&
            element.isContentEditable
        ) {

            text =
                element.innerText ||
                element.textContent ||
                "";

        }


        sendResponse({
            text: text
        });


        return true;

    }
);


// =====================================================
// 5. ESCAPE HTML
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


console.log(
    "🔐 ShadowShield paste protection ready"
);