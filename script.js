function checkURL() {

    const input = document.getElementById("urlInput");
    const result = document.getElementById("result");

    let url = input.value.trim();

    if (url === "") {
        alert("Please enter a URL.");
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }

    let score = 0;
    let checks = [];

    let parsedURL;

    try {
        parsedURL = new URL(url);
    } catch (error) {
        showResult(
            "Invalid URL",
            100,
            "The entered text does not appear to be a valid URL.",
            ["❌ URL format is invalid"]
        );
        return;
    }

    // HTTPS check
    if (parsedURL.protocol === "https:") {
        checks.push("✅ HTTPS is enabled");
    } else {
        score += 25;
        checks.push("⚠️ HTTPS is not being used");
    }

    // IP address check
    const ipPattern =
        /^(?:\d{1,3}\.){3}\d{1,3}$/;

    if (ipPattern.test(parsedURL.hostname)) {
        score += 25;
        checks.push("⚠️ URL uses an IP address instead of a domain");
    } else {
        checks.push("✅ Normal domain format detected");
    }

    // Suspicious keywords
    const suspiciousWords = [
        "login",
        "verify",
        "verification",
        "password",
        "account",
        "secure",
        "update",
        "bank",
        "free",
        "winner"
    ];

    let foundWords = [];

    suspiciousWords.forEach(function(word) {
        if (url.toLowerCase().includes(word)) {
            foundWords.push(word);
        }
    });

    if (foundWords.length > 0) {
        score += Math.min(foundWords.length * 8, 30);
        checks.push(
            "⚠️ Suspicious keywords detected: " +
            foundWords.join(", ")
        );
    } else {
        checks.push("✅ No common suspicious keywords detected");
    }

    // URL length
    if (url.length > 150) {
        score += 10;
        checks.push("⚠️ URL is unusually long");
    } else {
        checks.push("✅ URL length looks normal");
    }

    // @ symbol
    if (url.includes("@")) {
        score += 15;
        checks.push("⚠️ URL contains '@' symbol");
    } else {
        checks.push("✅ No '@' symbol detected");
    }

    // Too many subdomains
    const hostParts = parsedURL.hostname.split(".");

    if (hostParts.length > 4) {
        score += 10;
        checks.push("⚠️ Many subdomains detected");
    } else {
        checks.push("✅ Domain structure looks normal");
    }

    score = Math.min(score, 100);

    let title;
    let message;

    if (score <= 20) {
        title = "🟢 Low Risk";
        message =
            "No major suspicious signs were detected. Still verify the website before entering sensitive information.";
    } else if (score <= 50) {
        title = "🟡 Medium Risk";
        message =
            "Some suspicious indicators were detected. Be careful before interacting with this website.";
    } else {
        title = "🔴 High Risk";
        message =
            "Several suspicious indicators were detected. Avoid entering passwords or sensitive information.";
    }

    showResult(title, score, message, checks);
}


function showResult(title, score, message, checks) {

    const result = document.getElementById("result");
    const resultTitle = document.getElementById("resultTitle");
    const riskScore = document.getElementById("riskScore");
    const resultMessage = document.getElementById("resultMessage");
    const checksBox = document.getElementById("checks");

    result.classList.remove("hidden");

    resultTitle.textContent = title;
    riskScore.textContent = score;
    resultMessage.textContent = message;

    checksBox.innerHTML = "";

    checks.forEach(function(check) {

        const div = document.createElement("div");

        div.className = "check-item";
        div.textContent = check;

        checksBox.appendChild(div);
    });

    result.scrollIntoView({
        behavior: "smooth"
    });
}