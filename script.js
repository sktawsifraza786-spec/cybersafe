function checkURL() {

    const input =
        document.getElementById("urlInput").value.trim();

    const result =
        document.getElementById("result");

    if (input === "") {
        result.innerHTML =
            "<p>Please enter a URL.</p>";
        return;
    }

    let score = 0;
    let reasons = [];

    // HTTPS check
    if (!input.startsWith("https://")) {

        score += 20;

        reasons.push(
            "URL does not use HTTPS."
        );
    }

    // IP address check
    const ipPattern =
        /^https?:\/\/(\d{1,3}\.){3}\d{1,3}/;

    if (ipPattern.test(input)) {

        score += 30;

        reasons.push(
            "URL uses an IP address instead of a domain name."
        );
    }

    // @ symbol
    if (input.includes("@")) {

        score += 20;

        reasons.push(
            "URL contains an @ symbol."
        );
    }

    // Very long URL
    if (input.length > 100) {

        score += 10;

        reasons.push(
            "URL is unusually long."
        );
    }

    // Suspicious keywords
    const suspiciousWords = [
        "login",
        "verify",
        "password",
        "account",
        "update",
        "free"
    ];

    let foundKeyword = false;

    for (const word of suspiciousWords) {

        if (input.toLowerCase().includes(word)) {

            foundKeyword = true;
            break;
        }
    }

    if (foundKeyword) {

        score += 10;

        reasons.push(
            "URL contains a potentially suspicious keyword."
        );
    }

    // Maximum score = 100
    score = Math.min(score, 100);

    let status;

    if (score < 30) {

        status = "🟢 Likely Safe";

    } else if (score < 60) {

        status = "🟡 Suspicious";

    } else {

        status = "🔴 High Risk";
    }

    let reasonHTML = "";

    if (reasons.length === 0) {

        reasonHTML =
            "<p>No obvious suspicious signs detected.</p>";

    } else {

        reasonHTML = "<ul>";

        reasons.forEach(reason => {

            reasonHTML +=
                `<li>${reason}</li>`;

        });

        reasonHTML += "</ul>";
    }

    result.innerHTML = `
        <div class="result-box">

            <h2>${status}</h2>

            <h3>Risk Score: ${score}/100</h3>

            ${reasonHTML}

        </div>
    `;
}