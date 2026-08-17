function checkURL() {

    const url = document.getElementById("urlInput").value.trim();

    if (url === "") {
        document.getElementById("result").innerHTML =
            "Please enter a URL.";
        return;
    }

    let score = 0;
    let reasons = [];

    // Check HTTPS
    if (!url.startsWith("https://")) {
        score += 20;
        reasons.push("URL does not use HTTPS.");
    }

    // Check IP address
    const ipPattern =
        /https?:\/\/(\d{1,3}\.){3}\d{1,3}/;

    if (ipPattern.test(url)) {
        score += 30;
        reasons.push("URL uses an IP address.");
    }

    // Check @ symbol
    if (url.includes("@")) {
        score += 20;
        reasons.push("URL contains @ symbol.");
    }

    // Check suspicious characters
    if (url.includes("-")) {
        score += 10;
        reasons.push("URL contains a hyphen.");
    }

    // Check excessive length
    if (url.length > 75) {
        score += 20;
        reasons.push("URL is unusually long.");
    }

    let status;

    if (score >= 50) {
        status = "⚠️ Suspicious URL";
    } else {
        status = "✅ Likely Safe";
    }

    let output = `
        <h2>${status}</h2>
        <p>Risk Score: ${score}/100</p>
    `;

    if (reasons.length > 0) {
        output += "<p><b>Reasons:</b></p><ul>";

        reasons.forEach(function(reason) {
            output += `<li>${reason}</li>`;
        });

        output += "</ul>";
    }

    document.getElementById("result").innerHTML = output;
}